/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  CounterTest,
  CounterTestInterface,
} from "../../test.sol/CounterTest";

const _abi = [
  {
    type: "function",
    name: "IS_TEST",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "excludeArtifacts",
    inputs: [],
    outputs: [
      {
        name: "excludedArtifacts_",
        type: "string[]",
        internalType: "string[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "excludeContracts",
    inputs: [],
    outputs: [
      {
        name: "excludedContracts_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "excludeSenders",
    inputs: [],
    outputs: [
      {
        name: "excludedSenders_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "facilitatorManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract FacilitatorManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "failed",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setUp",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "targetArtifactSelectors",
    inputs: [],
    outputs: [
      {
        name: "targetedArtifactSelectors_",
        type: "tuple[]",
        internalType: "struct StdInvariant.FuzzSelector[]",
        components: [
          {
            name: "addr",
            type: "address",
            internalType: "address",
          },
          {
            name: "selectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetArtifacts",
    inputs: [],
    outputs: [
      {
        name: "targetedArtifacts_",
        type: "string[]",
        internalType: "string[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetContracts",
    inputs: [],
    outputs: [
      {
        name: "targetedContracts_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetInterfaces",
    inputs: [],
    outputs: [
      {
        name: "targetedInterfaces_",
        type: "tuple[]",
        internalType: "struct StdInvariant.FuzzInterface[]",
        components: [
          {
            name: "addr",
            type: "address",
            internalType: "address",
          },
          {
            name: "artifacts",
            type: "string[]",
            internalType: "string[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetSelectors",
    inputs: [],
    outputs: [
      {
        name: "targetedSelectors_",
        type: "tuple[]",
        internalType: "struct StdInvariant.FuzzSelector[]",
        components: [
          {
            name: "addr",
            type: "address",
            internalType: "address",
          },
          {
            name: "selectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "targetSenders",
    inputs: [],
    outputs: [
      {
        name: "targetedSenders_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "testFuzz_SetNumber",
    inputs: [
      {
        name: "x",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "test_Increment",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "log",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_address",
    inputs: [
      {
        name: "",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_array",
    inputs: [
      {
        name: "val",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_array",
    inputs: [
      {
        name: "val",
        type: "int256[]",
        indexed: false,
        internalType: "int256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_array",
    inputs: [
      {
        name: "val",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_bytes",
    inputs: [
      {
        name: "",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_bytes32",
    inputs: [
      {
        name: "",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_int",
    inputs: [
      {
        name: "",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_address",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_array",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_array",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "int256[]",
        indexed: false,
        internalType: "int256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_array",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_bytes",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_bytes32",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_decimal_int",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "decimals",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_decimal_uint",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "decimals",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_int",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_string",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_named_uint",
    inputs: [
      {
        name: "key",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "val",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_string",
    inputs: [
      {
        name: "",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "log_uint",
    inputs: [
      {
        name: "",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "logs",
    inputs: [
      {
        name: "",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
] as const;

const _bytecode =
  "0x608060405260078054600160ff199182168117909255600b8054909116909117905534801561002d57600080fd5b506112948061003d6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635c7f60d711610097578063b5508aa911610066578063b5508aa9146101bf578063ba414fa6146101c7578063e20c9f71146101df578063fa7626d4146101e757600080fd5b80635c7f60d71461017a57806366d9a9a01461018d57806385226c81146101a2578063916a17c6146101b757600080fd5b80633e5e3c23116100d35780633e5e3c23146101375780633f7286f41461013f5780634820a1051461014757806350f70c621461014f57600080fd5b80630a9254e4146100fa5780631ed7831c146101045780632ade388014610122575b600080fd5b6101026101f4565b005b61010c61028d565b6040516101199190610dfa565b60405180910390f35b61012a6102ef565b6040516101199190610e6b565b61010c610431565b61010c610491565b6101026104f1565b601c54610162906001600160a01b031681565b6040516001600160a01b039091168152602001610119565b610102610188366004610f46565b6105dc565b6101956106bd565b6040516101199190610f5f565b6101aa6107a3565b6040516101199190611012565b610195610873565b6101aa610959565b6101cf610a29565b6040519015158152602001610119565b61010c610b56565b6007546101cf9060ff1681565b60405161020090610ded565b604051809103906000f08015801561021c573d6000803e3d6000fd5b50601c80546001600160a01b0319166001600160a01b03929092169182179055604051633fb5c1cb60e01b815260006004820152633fb5c1cb90602401600060405180830381600087803b15801561027357600080fd5b505af1158015610287573d6000803e3d6000fd5b50505050565b606060148054806020026020016040519081016040528092919081815260200182805480156102e557602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116102c7575b5050505050905090565b6060601b805480602002602001604051908101604052809291908181526020016000905b8282101561042857600084815260208082206040805180820182526002870290920180546001600160a01b03168352600181018054835181870281018701909452808452939591948681019491929084015b828210156104115783829060005260206000200180546103849061107f565b80601f01602080910402602001604051908101604052809291908181526020018280546103b09061107f565b80156103fd5780601f106103d2576101008083540402835291602001916103fd565b820191906000526020600020905b8154815290600101906020018083116103e057829003601f168201915b505050505081526020019060010190610365565b505050508152505081526020019060010190610313565b50505050905090565b606060168054806020026020016040519081016040528092919081815260200182805480156102e5576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116102c7575050505050905090565b606060158054806020026020016040519081016040528092919081815260200182805480156102e5576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116102c7575050505050905090565b601c60009054906101000a90046001600160a01b03166001600160a01b031663d09de08a6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561054157600080fd5b505af1158015610555573d6000803e3d6000fd5b505050506105da601c60009054906101000a90046001600160a01b03166001600160a01b0316638381f58a6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d391906110b9565b6001610bb6565b565b601c54604051633fb5c1cb60e01b8152600481018390526001600160a01b0390911690633fb5c1cb90602401600060405180830381600087803b15801561062257600080fd5b505af1158015610636573d6000803e3d6000fd5b505050506106ba601c60009054906101000a90046001600160a01b03166001600160a01b0316638381f58a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610690573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b491906110b9565b82610bb6565b50565b60606019805480602002602001604051908101604052809291908181526020016000905b828210156104285760008481526020908190206040805180820182526002860290920180546001600160a01b0316835260018101805483518187028101870190945280845293949193858301939283018282801561078b57602002820191906000526020600020906000905b82829054906101000a900460e01b6001600160e01b0319168152602001906004019060208260030104928301926001038202915080841161074d5790505b505050505081525050815260200190600101906106e1565b60606018805480602002602001604051908101604052809291908181526020016000905b828210156104285783829060005260206000200180546107e69061107f565b80601f01602080910402602001604051908101604052809291908181526020018280546108129061107f565b801561085f5780601f106108345761010080835404028352916020019161085f565b820191906000526020600020905b81548152906001019060200180831161084257829003601f168201915b5050505050815260200190600101906107c7565b6060601a805480602002602001604051908101604052809291908181526020016000905b828210156104285760008481526020908190206040805180820182526002860290920180546001600160a01b0316835260018101805483518187028101870190945280845293949193858301939283018282801561094157602002820191906000526020600020906000905b82829054906101000a900460e01b6001600160e01b031916815260200190600401906020826003010492830192600103820291508084116109035790505b50505050508152505081526020019060010190610897565b60606017805480602002602001604051908101604052809291908181526020016000905b8282101561042857838290600052602060002001805461099c9061107f565b80601f01602080910402602001604051908101604052809291908181526020018280546109c89061107f565b8015610a155780601f106109ea57610100808354040283529160200191610a15565b820191906000526020600020905b8154815290600101906020018083116109f857829003601f168201915b50505050508152602001906001019061097d565b600754600090610100900460ff1615610a4b5750600754610100900460ff1690565b6000737109709ecfa91a80626ff3989d68f67f5b1dd12d3b15610b515760408051737109709ecfa91a80626ff3989d68f67f5b1dd12d602082018190526519985a5b195960d21b82840152825180830384018152606083019093526000929091610ad9917f667f9d70ca411d70ead50d8d5c22070dafc36ad75f3dcf5e7237b22ade9aecc4916080016110d2565b60408051601f1981840301815290829052610af391611103565b6000604051808303816000865af19150503d8060008114610b30576040519150601f19603f3d011682016040523d82523d6000602084013e610b35565b606091505b5091505080806020019051810190610b4d919061111f565b9150505b919050565b606060138054806020026020016040519081016040528092919081815260200182805480156102e5576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116102c7575050505050905090565b808214610cdd577f41304facd9323d75b11bcdd609cb38effffdb05710f7caf0e9b16c6d9d709f50604051610c279060208082526022908201527f4572726f723a2061203d3d2062206e6f7420736174697366696564205b75696e604082015261745d60f01b606082015260800190565b60405180910390a160408051818152600a81830152690808080808081319599d60b21b60608201526020810184905290517fb2de2fbe801a0df6c0cbddfd448ba3c41d48a040ca35c56c8196ef0fcae721a89181900360800190a160408051818152600a81830152690808080808149a59da1d60b21b60608201526020810183905290517fb2de2fbe801a0df6c0cbddfd448ba3c41d48a040ca35c56c8196ef0fcae721a89181900360800190a1610cdd610ce1565b5050565b737109709ecfa91a80626ff3989d68f67f5b1dd12d3b15610ddc5760408051737109709ecfa91a80626ff3989d68f67f5b1dd12d602082018190526519985a5b195960d21b9282019290925260016060820152600091907f70ca10bbd0dbfd9020a9f4b13402c16cb120705e0d1c0aeab10fa353ae586fc49060800160408051601f1981840301815290829052610d7b92916020016110d2565b60408051601f1981840301815290829052610d9591611103565b6000604051808303816000865af19150503d8060008114610dd2576040519150601f19603f3d011682016040523d82523d6000602084013e610dd7565b606091505b505050505b6007805461ff001916610100179055565b6101168061114983390190565b6020808252825182820181905260009190848201906040850190845b81811015610e3b5783516001600160a01b031683529284019291840191600101610e16565b50909695505050505050565b60005b83811015610e62578181015183820152602001610e4a565b50506000910152565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015610f3957603f19888603018452815180516001600160a01b0316865286015160408787018190528151908701819052908701906060600582901b88018101919088019060005b81811015610f2257898403605f1901835284518051808652610f03818e88018f8501610e47565b958c0195601f01601f1916949094018b019350918a0191600101610edc565b509197505050938601935090850190600101610e92565b5092979650505050505050565b600060208284031215610f5857600080fd5b5035919050565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b8481101561100357898403603f19018652825180516001600160a01b03168552880151888501889052805188860181905290890190839060608701905b80831015610fee5783516001600160e01b0319168252928b019260019290920191908b0190610fc4565b50978a01979550505091870191600101610f87565b50919998505050505050505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015610f3957878503603f1901845281518051808752611060818989018a8501610e47565b601f01601f191695909501860194509285019290850190600101611039565b600181811c9082168061109357607f821691505b6020821081036110b357634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156110cb57600080fd5b5051919050565b6001600160e01b03198316815281516000906110f5816004850160208701610e47565b919091016004019392505050565b60008251611115818460208701610e47565b9190910192915050565b60006020828403121561113157600080fd5b8151801515811461114157600080fd5b939250505056fe608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220c372ddc387167a5cf899492d73387d4c26e5405c845ac65201155901ed2c3e6864736f6c63430008150033a2646970667358221220a5ea9545a82fe9ea4e91dc49b7275b3b1eb49db03e9cff4e6cea76f5a42cc0a764736f6c63430008150033";

type CounterTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CounterTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CounterTest__factory extends ContractFactory {
  constructor(...args: CounterTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CounterTest & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CounterTest__factory {
    return super.connect(runner) as CounterTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CounterTestInterface {
    return new Interface(_abi) as CounterTestInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CounterTest {
    return new Contract(address, _abi, runner) as unknown as CounterTest;
  }
}