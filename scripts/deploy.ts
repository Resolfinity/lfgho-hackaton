import { ethers } from "hardhat";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const L2FlashMinterAddress = ethers.Wallet.createRandom().address;
const INITIAL_BUCKET_CAP = 100000000000000000n;

const FACILITATOR_MANAGER_ROLE =
  "0x5e20732f79076148980e17b6ce9f22756f85058fe2765420ed48a504bef5a8bc"; // keccak256(id("FACILITATOR_MANAGER_ROLE"));
const BUCKET_MANAGER_ROLE =
  "0xc7f115822aabac0cd6b9d21b08c0c63819451a58157aecad689d1b5674fad408"; //keccak256(id("BUCKET_MANAGER_ROLE"));

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("owner address", owner.address);

  // deploy wrapped GHO token
  const GHOL2Factory = await ethers.getContractFactory("GHOL2");
  const GHOL2 = await GHOL2Factory.deploy(owner.address);

  console.log("GHOL2 deployed to:", GHOL2.target);

  // deploy plonk_verifier
  const plonkVerifierFactory = await ethers.getContractFactory("UltraVerifier");
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
  const grantFacilitatorManagerReciept = await grantFacilitatorManagerTx.wait();
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
