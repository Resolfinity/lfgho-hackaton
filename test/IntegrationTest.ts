import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { hexlify, id, keccak256 } from "ethers";
import fs from "fs";
import path from "path";
import { proofInput } from "./proof/proof-inputs";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const L2FlashMinterAddress = ethers.Wallet.createRandom().address;
const INITIAL_BUCKET_CAP = 100000000000000000n; // 1 GHO
const UPDATED_BUCKET_CAP = 2000000000000000000000000n;
const FACILITATOR_MANAGER_ROLE =
  "0x5e20732f79076148980e17b6ce9f22756f85058fe2765420ed48a504bef5a8bc"; // keccak256(id("FACILITATOR_MANAGER_ROLE"));
const BUCKET_MANAGER_ROLE =
  "0xc7f115822aabac0cd6b9d21b08c0c63819451a58157aecad689d1b5674fad408"; //keccak256(id("BUCKET_MANAGER_ROLE"));
const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const proofFile = path.resolve(__dirname, "proof/bucket_proof.proof");
const proof = fs.readFileSync(proofFile, "utf8");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployInitialContracts() {
    const [owner] = await ethers.getSigners();

    console.log("owner address", owner.address);

    // deploy wrapped GHO token
    const GHOL2Factory = await ethers.getContractFactory("GHOL2");
    const GHOL2 = await GHOL2Factory.deploy(owner.address);

    console.log("GHOL2 deployed to:", GHOL2.target);

    // deploy plonk_verifier
    const plonkVerifierFactory = await ethers.getContractFactory(
      "UltraVerifier"
    );
    const plonkVerifier = await plonkVerifierFactory.deploy();

    console.log("plonkVerifier deployed to:", plonkVerifier.target);

    // deploy zkBucketManager
    const zkBucketManagerFactory = await ethers.getContractFactory(
      "ZkBucketManager"
    );
    const zkBucketManager = await zkBucketManagerFactory.deploy(
      GHOL2.getAddress(),
      plonkVerifier.target,
      ADDRESS_ZERO, // since we mock ethSrorageRootOracle
      L2FlashMinterAddress
    );

    // grant FACILITATOR_MANAGER_ROLE to the owner
    const grantFacilitatorManagerTx = await GHOL2.grantRole(
      FACILITATOR_MANAGER_ROLE,
      owner.address
    );
    const grantFacilitatorManagerReciept =
      await grantFacilitatorManagerTx.wait();
    console.log(
      "facilitator manager role granted in tx",
      grantFacilitatorManagerReciept?.hash
    );

    // grant BUCKET_MANAGER_ROLE to zkBucketManager
    const grantTx = await GHOL2.grantRole(
      BUCKET_MANAGER_ROLE,
      zkBucketManager.target
    );
    const reciept = await grantTx.wait();
    console.log("bucket manager role granted in tx", reciept?.hash);

    // set up flash minter with initial bucket cap 1e18
    const addFlashMinterTx = await GHOL2.addFacilitator(
      L2FlashMinterAddress,
      "L2FlashMinter",
      INITIAL_BUCKET_CAP
    );
    const addFlashMinterReciept = await addFlashMinterTx.wait();
    console.log("flash minter added in tx", addFlashMinterReciept?.hash);

    return { GHOL2, plonkVerifier, zkBucketManager, owner };
  }

  describe("Deployment", function () {
    it("Owner has DEFAULT_ADMIN_ROLE", async function () {
      const { GHOL2, owner } = await loadFixture(deployInitialContracts);

      const deployerIsDefaultAdmin = await GHOL2.hasRole(
        DEFAULT_ADMIN_ROLE,
        owner.address
      );
      expect(deployerIsDefaultAdmin).to.be.true;
    });

    it("Owner has FACILITATOR_MANAGER_ROLE", async function () {
      const { GHOL2, owner } = await loadFixture(deployInitialContracts);

      const deployerIsDefaultAdmin = await GHOL2.hasRole(
        FACILITATOR_MANAGER_ROLE,
        owner.address
      );
      expect(deployerIsDefaultAdmin).to.be.true;
    });

    it("zkBucketManager has BUCKET_MANAGER_ROLE", async function () {
      const { GHOL2, zkBucketManager } = await loadFixture(
        deployInitialContracts
      );

      const isBucketManager = await GHOL2.hasRole(
        BUCKET_MANAGER_ROLE,
        zkBucketManager.target
      );

      expect(isBucketManager).to.be.true;
    });

    it("L2FlashMinter is facilitator with initial cap 1e18", async function () {
      const { GHOL2 } = await loadFixture(deployInitialContracts);

      const facilitator = await GHOL2.getFacilitator(L2FlashMinterAddress);

      expect(facilitator.bucketCapacity).to.be.equal(INITIAL_BUCKET_CAP);
    });
  });

  describe("Verification", function () {
    it("Should verify correct proof", async function () {
      const { GHOL2, zkBucketManager } = await loadFixture(
        deployInitialContracts
      );

      const verifyTx = await zkBucketManager.updateBucketCap(
        hexlify("0x" + proof),
        hexlify(proofInput.storage),
        UPDATED_BUCKET_CAP.toString()
      );

      await verifyTx.wait();

      // since proof was correct, GHOL2 bucket cap for L2FlashMinter should be updated
      const facilitator = await GHOL2.getFacilitator(L2FlashMinterAddress);

      expect(facilitator.bucketCapacity).to.be.equal(UPDATED_BUCKET_CAP);
    });

    it("Should revert on wrong proof", async function () {
      const { zkBucketManager } = await loadFixture(deployInitialContracts);

      await expect(
        zkBucketManager.updateBucketCap(
          hexlify("0x" + proof),
          hexlify(proofInput.storage),
          UPDATED_BUCKET_CAP + 1n
        )
      ).to.be.reverted;
    });
  });
});
