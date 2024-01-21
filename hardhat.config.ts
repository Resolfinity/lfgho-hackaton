import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

if (!process.env.MUMBAI_NODE_URI) {
  throw new Error("MUMBAI_NODE_URI is not set");
}

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}

if (!process.env.MUMBAI_ETHERSCAN_API) {
  throw new Error("MUMBAI_ETHERSCAN_API is not set");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23", // any version you want
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        details: {
          yulDetails: {
            optimizerSteps: "u",
          },
        },
      },
    },
  },
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: process.env.MUMBAI_NODE_URI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.MUMBAI_ETHERSCAN_API,
    },
  },
};

export default config;
