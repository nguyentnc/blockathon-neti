'use client';

import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';
import dayjs from 'dayjs';

import { ADDRESS_ZERO, NETI_ADDRESS, TOUR_ADDRESS } from '@/services/constants';
import { convertBalanceToWei, convertWeiToBalance } from '@/common/functions';

import useUserBalanceQuery from '@/hooks/useUserBalanceQuery';
import { TourService } from '@/services/TourService';
import { Button } from '@/components/Button';
import { EvmWeb3Service } from '@/services/EvmWeb3Service';

export default function TestPage() {
  const adapter = useWallet();
  const { address, disconnect, connected } = adapter;
  const { openWalletModal } = useWalletModal();

  const { data: balance } = useUserBalanceQuery(ADDRESS_ZERO);
  const { data: balanceC98 } = useUserBalanceQuery('0x0Fd0288AAAE91eaF935e2eC14b23486f86516c8C');

  const handleCreateTour = async () => {
    try {
      const title = Buffer.from('Tour 1');
      const endTimeRegister = dayjs().add(10, 'minute').valueOf();
      const priceTour = convertBalanceToWei(10).toString();
      const guaranteeFee = convertBalanceToWei(1).toString();
      const limitClient = 3;

      const tourService = new TourService(adapter);

      console.log({ title, endTimeRegister, priceTour, guaranteeFee, limitClient });

      const hash = await tourService.createTour(
        'tour-3',
        endTimeRegister,
        priceTour,
        guaranteeFee,
        limitClient
      );
      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    const web3Service = new EvmWeb3Service(adapter);

    console.log('Check approve');
    await web3Service.approveToken(NETI_ADDRESS, address as string, TOUR_ADDRESS);
  };

  return (
    <main className='p-8 space-y-6'>
      {!connected ? (
        <div>
          <button onClick={openWalletModal}>Connect wallet</button>
        </div>
      ) : (
        <>
          <span className='icon-history' />
          <div>{address}</div>
          <div>Balance VIC: {convertWeiToBalance(balance).toString()}</div>
          <div>Balance C98: {convertWeiToBalance(balanceC98).toString()}</div>
          <button onClick={disconnect}>Disconnect wallet</button>
          <Button onClick={handleApprove}>Approve token</Button>
          <Button onClick={handleCreateTour}>CREATE TOUR</Button>
        </>
      )}
    </main>
  );
}
