import { JsonRpcProvider } from "ethers";
import TOML from "@iarna/toml";
import fs from "fs";

type Serial = {
  proof: number[];
  key: number[];
  value: number[];
  storage: number[];
};

function serialise(val: string, pad: boolean = false) {
  let x = val.replace("0x", "");
  if (pad) {
    x = x.padStart(64, "0");
  }
  return Array.from(Buffer.from(x, "hex"));
}

export const getStorageProof = async (
  provider: JsonRpcProvider,
  address: string,
  slot: string
) => {
  const res = await provider.send("eth_getProof", [address, [slot], "latest"]);
  const MAX_TRIE_NODE_LENGTH = 532;
  const { storageProof, storageHash } = res;
  const theProof = storageProof[0];

  let proofPath: string = "";
  for (let i = 0; i < theProof.proof.length; i++) {
    let layer = theProof.proof[i];
    layer = layer.replace("0x", "").padEnd(MAX_TRIE_NODE_LENGTH * 2, "0");
    proofPath = proofPath + layer;
  }

  // encode this into bytes which can be interpreted by the prover
  // The rlp encoded proof path is right padded at each node with 0s and then concatenated
  const key = serialise(theProof.key);
  const value = serialise(theProof.value, true);
  const proof = serialise(proofPath);
  const storage = serialise(storageHash);

  console.log("storagehash", storageHash);

  const rawProofData = {
    proof: proofPath,
    key: theProof.key,
    storage: storageHash,
    value: theProof.value,
  };

  fs.writeFileSync("proof.json", JSON.stringify(rawProofData, null, 2));

  const proofData: Serial = {
    proof,
    key,
    storage,
    value,
  };

  fs.writeFileSync("proofData.json", JSON.stringify(proofData, null, 2));

  const proofAsToml = TOML.stringify(proofData);
  // console.log("proofAsToml: ", proofAsToml);
  fs.writeFileSync("Prover.toml", proofAsToml);
  return proofData;
};
