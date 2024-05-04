import Web3 from 'web3';
import { AdapterWallet } from '@/types/common';

import { VRC25_ABI } from './abi/VRC25';
import { ADDRESS_ZERO } from './constants';

export class EvmWeb3Service {
  client: Web3;
  adapter?: AdapterWallet;
  MAX_INT = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

  constructor(adapter?: AdapterWallet) {
    this.client = new Web3('https://rpc5.viction.xyz');
    this.adapter = adapter;
  }

  getContract(abi: any, contractAddress: string) {
    const client = this.client;
    const contract = new client.eth.Contract(abi, contractAddress);

    return contract;
  }

  async getNativeBalance(address: string) {
    return (await this.client.eth.getBalance(address)).toString();
  }

  async getTokenBalance(walletAddress: string, tokenAddress: string) {
    const tokenContract = this.getContract(VRC25_ABI, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    return balance.toString();
  }

  async getTokenAllowance(tokenAddress: string, ownerAddress: string, spenderAddress: string) {
    try {
      const tokenContract = this.getContract(VRC25_ABI, tokenAddress);
      const allowance = await tokenContract.methods.allowance(ownerAddress, spenderAddress).call();

      return allowance;
    } catch (error) {
      throw error;
    }
  }

  async getBalance(walletAddress: string, tokenAddress: string) {
    try {
      if (tokenAddress === ADDRESS_ZERO) {
        const nativeBalance = await this.client.eth.getBalance(walletAddress);
        return nativeBalance.toString();
      }

      const tokenContract = this.getContract(VRC25_ABI, tokenAddress);
      const balance = await tokenContract.methods.balanceOf(walletAddress).call();
      return balance.toString();
    } catch (error) {
      return '0';
    }
  }

  async approveToken(tokenAddress: string, ownerAddress: string, spenderAddress: string) {
    try {
      const adapter = this.adapter as AdapterWallet;
      const tokenContract = this.getContract(VRC25_ABI, tokenAddress);
      const approveABI = tokenContract.methods.approve(spenderAddress, this.MAX_INT).encodeABI();

      const txn = {
        from: ownerAddress,
        to: tokenAddress,
        data: approveABI,
      };

      const response = await adapter.sendTransaction(txn);
      return response;
    } catch (error) {
      console.log('EvmFungibleService ~ error:', error);
      throw error;
    }
  }
}
