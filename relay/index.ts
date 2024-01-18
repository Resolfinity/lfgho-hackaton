import { GhoToken } from "./../types/GHOToken.sol/GhoToken";
import { GhoToken__factory } from "./../types/factories/GHOToken.sol/GhoToken__factory";
import { capListener } from "./cap-listener";
import { getStorageProof } from "./srorage-proof-getter";
import { getProvider, getSigner } from "./rpc";
import "dotenv/config";

const GHOAddress = "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f";
const FlashMinterFacilitator = "0xb639D208Bcf0589D54FaC24E655C79EC529762B8";
const FlashMinterBucketCapacitySlot =
  "0xac4b83f0960b67ce4032848c9a1828523a1bd87e5074df3b312a61a62a668311";

const main = async () => {
  console.log("Starting relay...");

  const mainnetProvider = getProvider("mainnet");
  const mumbaiSigner = getSigner("mumbai");
  const ghoToken = GhoToken__factory.connect(GHOAddress, mainnetProvider);

  const sepoliaCapListener = capListener(
    mainnetProvider,
    ghoToken,
    FlashMinterFacilitator
  );

  sepoliaCapListener.on("cap-updated", async (cap: bigint) => {
    console.log("cap-updated", cap);
    const capStorageProof = await getStorageProof(
      mainnetProvider,
      GHOAddress,
      FlashMinterBucketCapacitySlot
    );
    console.log("capStorageProof", capStorageProof);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
