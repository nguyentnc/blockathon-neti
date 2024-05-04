import { AdapterWallet } from '@/types/common';
import { EvmWeb3Service } from './EvmWeb3Service';

import { REWARD_ABI } from './abi/REWARD';
import { signClaim } from '@/hooks/useSignClaim';
import { ethers } from 'ethers';

const REWARD_ADDRESS = '0xB8DcbbBAA17ddf458E478654a0440C5d293CDd21';

export class MissionService {
  web3: EvmWeb3Service;
  adapter?: AdapterWallet;

  constructor(adapter?: AdapterWallet) {
    this.web3 = new EvmWeb3Service(adapter);
    this.adapter = adapter;
  }

  async claimReward(amount: string, claimId: number) {
    const adapterWallet = this.adapter!;
    const rewardContract = this.web3.getContract(REWARD_ABI, REWARD_ADDRESS);
    console.log(
      '🚀 ~ file: MissionService.tsx:23 ~ REWARD_ADDRESS:',
      REWARD_ADDRESS
    );
    const signer = new ethers.Wallet(
      '0x967edf8107e48f73b4f02b60f2d08d53a83b0262d0513e99cf30df1f2c4d989d'
    );
    const signature = await signClaim(
      signer,
      88,
      REWARD_ADDRESS,
      adapterWallet.address as string,
      claimId,
      amount
    );

    const rewardAbi = rewardContract.methods
      .claimReward({ user: adapterWallet.address, amount: Number(1), claimId: 1 }, signature)
      .encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: REWARD_ADDRESS,
      data: rewardAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }
}
