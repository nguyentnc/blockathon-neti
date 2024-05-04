import { convertBalanceToWei } from '@/common/functions';
import {
  signTypedData,
  SignTypedDataVersion,
  TypedMessage,
} from '@metamask/eth-sig-util';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { ethers, Wallet } from 'ethers';

export async function signClaim(
  wallet: Wallet,
  chainId: number,
  contractAddress: string,
  user: string,
  claimID: number,
  amount: string
): Promise<string> {
  const signer = new ethers.Wallet(wallet.privateKey)
  const domain = {
    name: 'Claim',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  }

  const types = {
    ClaimInfo: [
      {
        name: 'user',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'claimID',
        type: 'uint256',
      },
    ]
  }
  const value = {
    user,
    amount: 1,
    claimID: 1,
  }

  return await signer.signTypedData(domain, types, value)
  // const data: TypedMessage<any> = {
  //   domain: {
  //     name: 'Claim',
  //     version: '1',
  //     chainId,
  //     verifyingContract: contractAddress,
  //   },
  //   message: {
  //     user,
  //     amount: Number(amount),
  //     claimID: 1,
  //   },
  //   primaryType: 'ClaimInfo',
  //   types: {
  //     EIP712Domain: [
  //       { name: 'name', type: 'string' },
  //       { name: 'version', type: 'string' },
  //       { name: 'chainId', type: 'uint256' },
  //       { name: 'verifyingContract', type: 'address' },
  //     ],
  //     ClaimInfo: [
  //       {
  //         name: 'user',
  //         type: 'address',
  //       },
  //       {
  //         name: 'amount',
  //         type: 'uint256',
  //       },
  //       {
  //         name: 'claimID',
  //         type: 'uint256',
  //       },
  //     ],
  //   },
  // };
  // console.log({ data, wallet });

  // return await signTypedData({
  //   privateKey: Buffer.from(wallet.privateKey.substring(2), 'hex'),
  //   data,
  //   version: SignTypedDataVersion.V4,
  // });
  return ''
}
