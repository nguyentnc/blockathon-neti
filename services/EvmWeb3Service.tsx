import Web3 from 'web3';
import { AdapterWallet } from '@/types/common';

import { VRC25_ABI } from './abi/VRC25';
import { ADDRESS_ZERO } from './constants';

export class EvmWeb3Service {
  client: Web3;
  adapter?: AdapterWallet;
  MAX_INT = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

  constructor(adapter?: AdapterWallet) {
    this.client = new Web3('https://rpc-testnet.viction.xyz');
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

  async getTransactionReceipt(hash: string, timeout = 30000): Promise<any> {
    const now = Date.now();

    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          const isExpired = Date.now() - now >= timeout;

          if (isExpired) {
            timer && clearInterval(timer);
            reject('Timeout when getting transaction receipt');
          }

          const txReceipt = await this.client.eth.getTransactionReceipt(hash);
          console.log('tx receipt', txReceipt);

          if (txReceipt) {
            timer && clearTimeout(timer);
            resolve(txReceipt);
          }
        } catch (error) {
          clearInterval(timer);
          reject('Error when getting transaction receipt');
        }
      }, 1000);
    });
  }

  async sendAndWaitTransaction(transaction: any, adapter: any) {
    try {
      const txObject = { ...transaction };

      const gas = await this.client.eth.estimateGas(txObject);
      txObject.gas = Number(gas) * 2;

      const hashResponse = await adapter.sendTransaction(txObject);
      if (hashResponse.isError) {
        throw new Error(hashResponse.error);
      }

      const hash = hashResponse?.data;
      const txReceipt = await this.getTransactionReceipt(hash);

      const txStatus = txReceipt?.status;

      if (!txStatus) throw new Error('Transaction failed, please try again');

      return hash as string;
    } catch (error) {
      throw error;
    }
  }
}
