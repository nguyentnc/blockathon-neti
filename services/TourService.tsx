import { AdapterWallet } from '@/types/common';
import { EvmWeb3Service } from './EvmWeb3Service';
import { TOUR_ABI } from './abi/TOUR';
import { TOUR_ADDRESS } from './constants';

export class TourService {
  web3: EvmWeb3Service;
  adapter?: AdapterWallet;

  constructor(adapter?: AdapterWallet) {
    this.web3 = new EvmWeb3Service(adapter);
    this.adapter = adapter;
  }

  async createTour(
    id: string,
    endTimeRegister: number,
    priceTour: string,
    guaranteeFee: string,
    limitClient: number
  ) {
    const adapterWallet = this.adapter!;
    const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
    const createTourAbi = tourContract.methods
      .createTour(
        this.web3.toByte32(id),
        // Math.floor(endTime / 1000),
        Math.floor(endTimeRegister / 1000),
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
    const registerTourAbi = tourContract.methods.registerTour(this.web3.toByte32(id)).encodeABI();

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
    const cancelTourAbi = tourContract.methods.cancelTour(this.web3.toByte32(id)).encodeABI();

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
    const checkAttendanceAbi = tourContract.methods
      .checkAttendence(this.web3.toByte32(id), wallets)
      .encodeABI();

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
    const claimGuaranteeFeeAbi = tourContract.methods
      .claimGuaranteeFee(this.web3.toByte32(id))
      .encodeABI();

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
    const claimWhenCancelAbi = tourContract.methods
      .claimWhenCancel(this.web3.toByte32(id))
      .encodeABI();

    const tx = {
      from: adapterWallet.address,
      to: TOUR_ADDRESS,
      data: claimWhenCancelAbi,
    };

    const hash = await this.web3.sendAndWaitTransaction(tx, adapterWallet);
    return hash;
  }

  async getInfo(id: string) {
    try {
      const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
      const checkInfoData = await tourContract.methods.checkInfo(this.web3.toByte32(id)).call();
      console.log('TourService ~ getInfo ~ checkInfoData:', checkInfoData);

      return {
        startTime: Number(checkInfoData?.startTime) * 1000,
        endTimeRegister: Number(checkInfoData?.endTimeRegister) * 1000,
        limitClient: checkInfoData?.limitClient,
        priceTour: checkInfoData?.priceTour,
        guaranteeFee: checkInfoData?.guaranteeFee,
        tourGuide: checkInfoData?.tourGuide,
        status: checkInfoData?.status,
      };
    } catch (error) {
      console.log('TourService ~ getInfo ~ error:', error);
      throw error;
    }
  }

  async checkIsRegistered(id: string, address: string) {
    try {
      const tourContract = this.web3.getContract(TOUR_ABI, TOUR_ADDRESS);
      console.log(this.adapter?.address);

      return await tourContract.methods.checkIsRegistered(this.web3.toByte32(id), address).call();
    } catch (error) {
      console.log('TourService ~ getInfo ~ error:', error);
      throw error;
    }
  }
}
