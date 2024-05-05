/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { NETI, NETIInterface } from "../../contracts/NETI";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "supply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Fee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "FeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "estimateFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "issuer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002b3c38038062002b3c8339818101604052810190620000379190620004d8565b83838382600590816200004b9190620007c9565b5081600690816200005d9190620007c9565b5080600760006101000a81548160ff021916908360ff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050620000cf3382620000d960201b60201c565b5050505062000a3d565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200014b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001429062000911565b60405180910390fd5b62000162816008546200026960201b90919060201c565b600881905550620001bb816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200026960201b90919060201c565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200025d919062000944565b60405180910390a35050565b60008082846200027a919062000990565b905083811015620002c2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002b99062000a1b565b60405180910390fd5b8091505092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200033582620002ea565b810181811067ffffffffffffffff82111715620003575762000356620002fb565b5b80604052505050565b60006200036c620002cc565b90506200037a82826200032a565b919050565b600067ffffffffffffffff8211156200039d576200039c620002fb565b5b620003a882620002ea565b9050602081019050919050565b60005b83811015620003d5578082015181840152602081019050620003b8565b60008484015250505050565b6000620003f8620003f2846200037f565b62000360565b905082815260208101848484011115620004175762000416620002e5565b5b62000424848285620003b5565b509392505050565b600082601f830112620004445762000443620002e0565b5b815162000456848260208601620003e1565b91505092915050565b600060ff82169050919050565b62000477816200045f565b81146200048357600080fd5b50565b60008151905062000497816200046c565b92915050565b6000819050919050565b620004b2816200049d565b8114620004be57600080fd5b50565b600081519050620004d281620004a7565b92915050565b60008060008060808587031215620004f557620004f4620002d6565b5b600085015167ffffffffffffffff811115620005165762000515620002db565b5b62000524878288016200042c565b945050602085015167ffffffffffffffff811115620005485762000547620002db565b5b62000556878288016200042c565b9350506040620005698782880162000486565b92505060606200057c87828801620004c1565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005db57607f821691505b602082108103620005f157620005f062000593565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200065b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200061c565b6200066786836200061c565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620006aa620006a46200069e846200049d565b6200067f565b6200049d565b9050919050565b6000819050919050565b620006c68362000689565b620006de620006d582620006b1565b84845462000629565b825550505050565b600090565b620006f5620006e6565b62000702818484620006bb565b505050565b5b818110156200072a576200071e600082620006eb565b60018101905062000708565b5050565b601f82111562000779576200074381620005f7565b6200074e846200060c565b810160208510156200075e578190505b620007766200076d856200060c565b83018262000707565b50505b505050565b600082821c905092915050565b60006200079e600019846008026200077e565b1980831691505092915050565b6000620007b983836200078b565b9150826002028217905092915050565b620007d48262000588565b67ffffffffffffffff811115620007f057620007ef620002fb565b5b620007fc8254620005c2565b620008098282856200072e565b600060209050601f8311600181146200084157600084156200082c578287015190505b620008388582620007ab565b865550620008a8565b601f1984166200085186620005f7565b60005b828110156200087b5784890151825560018201915060208501945060208101905062000854565b868310156200089b578489015162000897601f8916826200078b565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f56524332353a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000620008f9601f83620008b0565b91506200090682620008c1565b602082019050919050565b600060208201905081810360008301526200092c81620008ea565b9050919050565b6200093e816200049d565b82525050565b60006020820190506200095b600083018462000933565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200099d826200049d565b9150620009aa836200049d565b9250828201905080821115620009c557620009c462000961565b5b92915050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b600062000a03601b83620008b0565b915062000a1082620009cb565b602082019050919050565b6000602082019050818103600083015262000a3681620009f4565b9050919050565b6120ef8062000a4d6000396000f3fe608060405234801561001057600080fd5b50600436106100e65760003560e01c806301ffc9a7146100eb57806306fdde031461011b578063095ea7b314610139578063127e8e4d1461016957806318160ddd146101995780631d143848146101b757806323b872dd146101d557806324ec759014610205578063313ce5671461022357806342966c681461024157806369fe0e2d1461027157806370a082311461028d57806379ba5097146102bd5780638da5cb5b146102c757806395d89b41146102e5578063a9059cbb14610303578063dd62ed3e14610333578063f2fde38b14610363575b600080fd5b61010560048036038101906101009190611647565b61037f565b604051610112919061168f565b60405180910390f35b6101236103e9565b604051610130919061173a565b60405180910390f35b610153600480360381019061014e91906117f0565b61047b565b604051610160919061168f565b60405180910390f35b610183600480360381019061017e9190611830565b6104ab565b604051610190919061186c565b60405180910390f35b6101a16104eb565b6040516101ae919061186c565b60405180910390f35b6101bf6104f5565b6040516101cc9190611896565b60405180910390f35b6101ef60048036038101906101ea91906118b1565b61051f565b6040516101fc919061168f565b60405180910390f35b61020d610741565b60405161021a919061186c565b60405180910390f35b61022b61074b565b6040516102389190611920565b60405180910390f35b61025b60048036038101906102569190611830565b610762565b604051610268919061168f565b60405180910390f35b61028b60048036038101906102869190611830565b610790565b005b6102a760048036038101906102a2919061193b565b610861565b6040516102b4919061186c565b60405180910390f35b6102c56108a9565b005b6102cf610a84565b6040516102dc9190611896565b60405180910390f35b6102ed610aae565b6040516102fa919061173a565b60405180910390f35b61031d600480360381019061031891906117f0565b610b40565b60405161032a919061168f565b60405180910390f35b61034d60048036038101906103489190611968565b610b6f565b60405161035a919061186c565b60405180910390f35b61037d6004803603810190610378919061193b565b610bf6565b005b60007f08617865000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6060600580546103f8906119d7565b80601f0160208091040260200160405190810160405280929190818152602001828054610424906119d7565b80156104715780601f1061044657610100808354040283529160200191610471565b820191906000526020600020905b81548152906001019060200180831161045457829003601f168201915b5050505050905090565b60008061048860006104ab565b9050610495338585610d39565b6104a0333083610f02565b600191505092915050565b60006104cc3373ffffffffffffffffffffffffffffffffffffffff16611000565b156104da57600090506104e6565b6104e382611013565b90505b919050565b6000600854905090565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008061052b836104ab565b9050610540818461103c90919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156105fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f590611a54565b60405180910390fd5b61069f8161069185600460008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461109a90919063ffffffff16565b61109a90919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061072a8585856110f3565b610735858583610f02565b60019150509392505050565b6000600154905090565b6000600760009054906101000a900460ff16905090565b60008061076f60006104ab565b905061077b33846113e2565b610786333083610f02565b6001915050919050565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610820576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081790611ac0565b60405180910390fd5b806001819055507f8c4d35e54a3f2ef1134138fd8ea3daee6a3c89e10d2665996babdf70261e2c7681604051610856919061186c565b60405180910390a150565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610939576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093090611b52565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060068054610abd906119d7565b80601f0160208091040260200160405190810160405280929190818152602001828054610ae9906119d7565b8015610b365780601f10610b0b57610100808354040283529160200191610b36565b820191906000526020600020905b815481529060010190602001808311610b1957829003601f168201915b5050505050905090565b600080610b4c836104ab565b9050610b593385856110f3565b610b64338583610f02565b600191505092915050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c86576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7d90611ac0565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cf5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cec90611be4565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610da8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9f90611c76565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e17576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0e90611d08565b60405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610ef5919061186c565b60405180910390a3505050565b610f213373ffffffffffffffffffffffffffffffffffffffff16611000565b610ffb576000811115610ffa57610f5b83600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836110f3565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167ffcf5b3276434181e3c48bd3fe569b8939808f11e845d4b963693b9d7dbd6dd9984604051610ff1919061186c565b60405180910390a45b5b505050565b600080823b905060008111915050919050565b600061101d610741565b82111561102c57819050611037565b611034610741565b90505b919050565b600080828461104b9190611d57565b905083811015611090576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108790611dd7565b60405180910390fd5b8091505092915050565b6000828211156110df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d690611e43565b60405180910390fd5b81836110eb9190611e63565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611162576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161115990611f09565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036111d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111c890611f9b565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115611252576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124990612007565b60405180910390fd5b6112a3816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461109a90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611336816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461103c90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516113d5919061186c565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611451576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161144890612099565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548111156114d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114c990612007565b60405180910390fd5b6114e78160085461109a90919063ffffffff16565b60088190555061153e816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461109a90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516115de919061186c565b60405180910390a35050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611624816115ef565b811461162f57600080fd5b50565b6000813590506116418161161b565b92915050565b60006020828403121561165d5761165c6115ea565b5b600061166b84828501611632565b91505092915050565b60008115159050919050565b61168981611674565b82525050565b60006020820190506116a46000830184611680565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156116e45780820151818401526020810190506116c9565b60008484015250505050565b6000601f19601f8301169050919050565b600061170c826116aa565b61171681856116b5565b93506117268185602086016116c6565b61172f816116f0565b840191505092915050565b600060208201905081810360008301526117548184611701565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117878261175c565b9050919050565b6117978161177c565b81146117a257600080fd5b50565b6000813590506117b48161178e565b92915050565b6000819050919050565b6117cd816117ba565b81146117d857600080fd5b50565b6000813590506117ea816117c4565b92915050565b60008060408385031215611807576118066115ea565b5b6000611815858286016117a5565b9250506020611826858286016117db565b9150509250929050565b600060208284031215611846576118456115ea565b5b6000611854848285016117db565b91505092915050565b611866816117ba565b82525050565b6000602082019050611881600083018461185d565b92915050565b6118908161177c565b82525050565b60006020820190506118ab6000830184611887565b92915050565b6000806000606084860312156118ca576118c96115ea565b5b60006118d8868287016117a5565b93505060206118e9868287016117a5565b92505060406118fa868287016117db565b9150509250925092565b600060ff82169050919050565b61191a81611904565b82525050565b60006020820190506119356000830184611911565b92915050565b600060208284031215611951576119506115ea565b5b600061195f848285016117a5565b91505092915050565b6000806040838503121561197f5761197e6115ea565b5b600061198d858286016117a5565b925050602061199e858286016117a5565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806119ef57607f821691505b602082108103611a0257611a016119a8565b5b50919050565b7f56524332353a20616d6f756e742065786565647320616c6c6f77616e63650000600082015250565b6000611a3e601e836116b5565b9150611a4982611a08565b602082019050919050565b60006020820190508181036000830152611a6d81611a31565b9050919050565b7f56524332353a2063616c6c6572206973206e6f7420746865206f776e65720000600082015250565b6000611aaa601e836116b5565b9150611ab582611a74565b602082019050919050565b60006020820190508181036000830152611ad981611a9d565b9050919050565b7f56524332353a206f6e6c79206e6577206f776e65722063616e2061636365707460008201527f206f776e65727368697000000000000000000000000000000000000000000000602082015250565b6000611b3c602a836116b5565b9150611b4782611ae0565b604082019050919050565b60006020820190508181036000830152611b6b81611b2f565b9050919050565b7f56524332353a206e6577206f776e657220697320746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611bce6024836116b5565b9150611bd982611b72565b604082019050919050565b60006020820190508181036000830152611bfd81611bc1565b9050919050565b7f56524332353a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611c606024836116b5565b9150611c6b82611c04565b604082019050919050565b60006020820190508181036000830152611c8f81611c53565b9050919050565b7f56524332353a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611cf26022836116b5565b9150611cfd82611c96565b604082019050919050565b60006020820190508181036000830152611d2181611ce5565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611d62826117ba565b9150611d6d836117ba565b9250828201905080821115611d8557611d84611d28565b5b92915050565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000600082015250565b6000611dc1601b836116b5565b9150611dcc82611d8b565b602082019050919050565b60006020820190508181036000830152611df081611db4565b9050919050565b7f536166654d6174683a207375627472616374696f6e206f766572666c6f770000600082015250565b6000611e2d601e836116b5565b9150611e3882611df7565b602082019050919050565b60006020820190508181036000830152611e5c81611e20565b9050919050565b6000611e6e826117ba565b9150611e79836117ba565b9250828203905081811115611e9157611e90611d28565b5b92915050565b7f56524332353a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611ef36025836116b5565b9150611efe82611e97565b604082019050919050565b60006020820190508181036000830152611f2281611ee6565b9050919050565b7f56524332353a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611f856023836116b5565b9150611f9082611f29565b604082019050919050565b60006020820190508181036000830152611fb481611f78565b9050919050565b7f56524332353a20696e7375666669656e742062616c616e636500000000000000600082015250565b6000611ff16019836116b5565b9150611ffc82611fbb565b602082019050919050565b6000602082019050818103600083015261202081611fe4565b9050919050565b7f56524332353a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006120836021836116b5565b915061208e82612027565b604082019050919050565b600060208201905081810360008301526120b281612076565b905091905056fea26469706673582212207bac98c223a7549d5c15b396d77e31f2a35d19c1ae8f77bcc3899493e216a7d264736f6c63430008180033";

type NETIConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NETIConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NETI__factory extends ContractFactory {
  constructor(...args: NETIConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    decimals_: BigNumberish,
    supply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name,
      symbol,
      decimals_,
      supply,
      overrides || {}
    );
  }
  override deploy(
    name: string,
    symbol: string,
    decimals_: BigNumberish,
    supply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      name,
      symbol,
      decimals_,
      supply,
      overrides || {}
    ) as Promise<
      NETI & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): NETI__factory {
    return super.connect(runner) as NETI__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NETIInterface {
    return new Interface(_abi) as NETIInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): NETI {
    return new Contract(address, _abi, runner) as unknown as NETI;
  }
}