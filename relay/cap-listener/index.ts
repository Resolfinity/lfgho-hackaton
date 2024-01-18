import { JsonRpcProvider } from "ethers";
import { EventEmitter } from "events";

import fs from "fs";
import { GhoToken } from "../../types/GHOToken.sol/GhoToken";

if (!fs.existsSync("./db.txt")) {
  fs.writeFileSync("./db.txt", "0");
}

const readCapFromDb = () => {
  const capStringified = fs.readFileSync("./db.txt", "utf-8") as string;
  return BigInt(capStringified);
};

const writeCapToDb = (cap: bigint) => {
  fs.writeFileSync("./db.txt", cap.toString());
};

const getUpdatedCap = async (
  gtoToken: GhoToken,
  flashminterFacilitator: string
) => {
  const cap = await gtoToken.getFacilitatorBucket(flashminterFacilitator);
  return cap[0];
};

export const capListener = (
  provider: JsonRpcProvider,
  gtoToken: GhoToken,
  flashminterFacilitator: string
) => {
  const emitter = new EventEmitter();
  let previousCap = readCapFromDb();
  provider.on("block", async (blockNumber) => {
    console.log("new block in mainnet", blockNumber);
    const currentCap = await getUpdatedCap(gtoToken, flashminterFacilitator);
    console.log("currentCap", currentCap);
    if (currentCap === previousCap) {
      console.log("cap is the same as before, skipping...");
      return;
    }
    writeCapToDb(currentCap);
    previousCap = currentCap;
    emitter.emit("cap-updated", currentCap);
  });
  return emitter;
};
