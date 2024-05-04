import { AdapterWallet } from '@/types/common';
import { EvmWeb3Service } from './EvmWeb3Service';
import { TOUR_ABI } from './abi/TOUR';

const TOUR_ADDRESS = '0x68876F09F1A8A6EBC94e315d8F68cDf9079f0b92';

export class TourService {
  web3: EvmWeb3Service;
  adapter?: AdapterWallet;

  constructor(adapter?: AdapterWallet) {
    this.web3 = new EvmWeb3Service(adapter);
    this.adapter = adapter;
  }

  async createTour(
    id: string,
    endTime: number,
    priceTour: string,
    guaranteeFee: string,
    limitClient: number
  ) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const createTourAbi = tourContract.methods
      .createTour(
        this.web3.toByte32(id),
        Math.floor(endTime / 1000),
        priceTour,
        guaranteeFee,
        limitClient
      )
      .encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: createTourAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  async registerTour(id: string) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const registerTourAbi = tourContract.methods.registerTour(id).encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: registerTourAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  async cancelTour(id: string) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const cancelTourAbi = tourContract.methods.cancelTour(id).encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: cancelTourAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  async checkAttendance(id: string, wallets: string[]) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const checkAttendanceAbi = tourContract.methods.checkAttendance(id, wallets).encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: checkAttendanceAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  // Claim guarantee fee after cancel
  async claimGuaranteeFee(id: string) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const claimGuaranteeFeeAbi = tourContract.methods.claimGuaranteeFee(id).encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: claimGuaranteeFeeAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  // Claim after cancel
  async claimWhenCancel(id: string) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const claimWhenCancelAbi = tourContract.methods.claimWhenCancel(id).encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: claimWhenCancelAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  async getInfo(id: string) {
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const checkInfoData = tourContract.methods.checkInfoData(id).call();
    console.log('TourService ~ checkInfo ~ checkInfoData:', checkInfoData);
  }
}
