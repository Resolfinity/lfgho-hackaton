import { JsonRpcProvider } from "ethers";
import { EventEmitter } from "events";

import { IGhoToken } from "../../typechain";

export const getUpdatedCap = async (
  gtoToken: IGhoToken,
  flashminterFacilitator: string
) => {
  const cap = await gtoToken.getFacilitatorBucket(flashminterFacilitator);
  return cap[0];
};

// in production, it is meant to lister to the mainnet cap and run proof building if cap was changed
// here we don't use this code, reading getUpdatedCap once in ./relay/index.ts
export const capListener = (
  provider: JsonRpcProvider,
  gtoToken: IGhoToken,
  flashminterFacilitator: string
) => {
  const emitter = new EventEmitter();

  provider.on("block", async (blockNumber) => {
    console.log("new block in mainnet", blockNumber);
    const currentCap = await getUpdatedCap(gtoToken, flashminterFacilitator);
    // todo: compare currentCap with previous cap stored in db
    // if changed, emit event that will trigger proof building
    emitter.emit("cap-updated", currentCap);
  });
  return emitter;
};
