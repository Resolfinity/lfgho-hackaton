import { Network as EthersNetwork, ethers } from "ethers";
import "dotenv/config";

export type Network = "mainnet" | "mumbai" | "localhost";
export type SignerNetwork = "mumbai" | "localhost";

const NETWORK_URI_MAPPING: Record<Network, string | undefined> = {
  mainnet: process.env.MAINNET_NODE_URI,
  mumbai: process.env.MUMBAI_NODE_URI,
  localhost: process.env.ANVIL_URL || "http://127.0.0.1:8545",
};

export const getProvider = (network: Network) => {
  const rpc = NETWORK_URI_MAPPING[network];

  const staticNetwork =
    network === "localhost"
      ? new EthersNetwork("anvil", 7878)
      : network === "mainnet"
      ? new EthersNetwork("ethereum", 1)
      : new EthersNetwork("mumbai", 80001);

  return new ethers.JsonRpcProvider(rpc, undefined, {
    staticNetwork,
    cacheTimeout: 1,
  });
};

const PRIVATE_KEYS_MAPPING: Record<SignerNetwork, string | undefined> = {
  mumbai: process.env.PRIVATE_KEY,
  localhost: process.env.PRIVATE_KEY,
};

const getPrivateKeyByNetwork = (network: SignerNetwork) => {
  const pk = PRIVATE_KEYS_MAPPING[network];
  if (!pk) {
    throw new Error(`Missing private key for network ${network}`);
  }
  return pk;
};

export const getAddressFromPrivateKey = (network: SignerNetwork) => {
  const pk = getPrivateKeyByNetwork(network);
  return new ethers.Wallet(pk).address;
};

export const getSigner = async (network: SignerNetwork) => {
  const provider = getProvider(network);

  switch (network) {
    case "mumbai":
      return new ethers.Wallet(getPrivateKeyByNetwork(network), provider);

    case "localhost":
      return await impersonate(provider, getAddressFromPrivateKey("mumbai"));
  }
};

export const impersonate = async (
  provider: ethers.JsonRpcProvider,
  address: string,
  setBalance: boolean = false
) => {
  await provider.send("anvil_impersonateAccount", [address]);

  if (setBalance) {
    await provider.send("anvil_setBalance", [
      address,
      "0x10000000000000000000",
    ]);
  }

  const signer = await provider.getSigner(address);

  return signer;
};
