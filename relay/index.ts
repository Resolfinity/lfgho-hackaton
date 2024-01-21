import { hexlify } from "ethers";
import { IGhoToken__factory } from "../typechain";
import { GHOL2__factory } from "../typechain-types";
import { ZkBucketManager__factory } from "../typechain-types/factories/contracts/ZkFacilitatorManager.sol";
import { capListener, getUpdatedCap } from "./cap-listener";
import { buildProverToml, getStorageProof, runNargoProve } from "./proofs";
import { getProvider, getSigner } from "./rpc";
import "dotenv/config";

const GHOAddress = "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f";
const FlashMinterFacilitator = "0xb639D208Bcf0589D54FaC24E655C79EC529762B8";
const FlashMinterBucketCapacitySlot =
  "0xac4b83f0960b67ce4032848c9a1828523a1bd87e5074df3b312a61a62a668311";

// below are contracts deployed on mumbai testnet, change addresses in case you deploy it by yourself
const GHOL2Address = "0x2AAbf0c3278155c2B83bb32D0506B0D33e7ded4d";
const ZkBucketManagerAddress = "0xf7fe88598229b44a671abdee2518fac1cf756283";
const L2FlashMinterAddress = "0x8a22757dea7cc571cadee8d9749da549d4af4a9d";

const main = async () => {
  console.log("Starting relay...");

  const mainnetProvider = getProvider("mainnet");
  const mumbaiSigner = await getSigner("mumbai");
  const ghoToken = IGhoToken__factory.connect(GHOAddress, mainnetProvider);
  const ghol2Token = GHOL2__factory.connect(GHOL2Address, mumbaiSigner);
  const zkBucketManager = ZkBucketManager__factory.connect(
    ZkBucketManagerAddress,
    mumbaiSigner
  );

  // we don't use cap listener, but i've left it here for future reference
  // const mainnetBucketCapListener = await capListener({
  //   ghoToken: ghoToken,
  //   flashminterFacilitator: FlashMinterFacilitator,
  // });
  // mainnetBucketCapListener.on("cap-updated", async (cap: bigint) => {

  const cap = await getUpdatedCap(ghoToken, FlashMinterFacilitator);

  console.log("Mainnet GHO FlashMinter bucket cap:", cap);

  const mumbaiBucketCap = await ghol2Token.getFacilitatorBucket(
    L2FlashMinterAddress
  );

  console.log("Mumbai GHOL2 FlashMinter bucket cap:", mumbaiBucketCap[0]);
  console.log('Getting storage proof for "bucketCapacity" slot in L1...');

  const capStorageProof = await getStorageProof(
    mainnetProvider,
    GHOAddress,
    FlashMinterBucketCapacitySlot
  );
  console.log("Got storage proof data: ", Object.keys(capStorageProof));

  // start building proof
  // first, we generate in the circuits/Prover.toml file
  // it contains the proof data in TOML format to be used by the prover
  console.log("Generating zk-proof inputs for storage proof");
  await buildProverToml(capStorageProof);

  // then, we run the prover, spinning up a system exec process 'nargo prove'
  // this will generate a proof.json file
  console.log("Start building proof with Noir prover, it takes some time...");
  const proof = await runNargoProve();
  console.log('Proof generated in "circuits/proofs/bucket_proof.proof');

  // at that moment, we have circuits/proofs/bucket_proof.json
  // we can now call the zkBucketManager contract to update the bucket cap in L2

  console.log(
    "Sending tx with new bucket cap and its proof to L2 zkBucketManager..."
  );
  const tx = await zkBucketManager.updateBucketCap(
    hexlify("0x" + proof),
    hexlify(capStorageProof.storage),
    capStorageProof.value.toString()
  );

  const reciept = await tx.wait();

  if (!reciept) {
    throw new Error("Transaction failed");
  }

  console.log("Bucket cap updated in L2 in tx:", reciept.hash);

  // check that the bucket cap was updated in GHO L2 contract
  const newBucketCap = await ghol2Token.getFacilitatorBucket(
    L2FlashMinterAddress
  );

  console.log("New bucket cap in L2:", newBucketCap[0]);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
