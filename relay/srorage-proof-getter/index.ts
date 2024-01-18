import { JsonRpcProvider } from "ethers";

export const getStorageProof = async (
  provider: JsonRpcProvider,
  address: string,
  slot: string
) => {
  const storageProof = await provider.send("eth_getProof", [
    address,
    [slot],
    "latest",
  ]);
  return storageProof;
};
