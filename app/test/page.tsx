'use client';

import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';
import dayjs from 'dayjs';

import { ADDRESS_ZERO } from '@/services/constants';
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
      const endTime = dayjs().valueOf();
      const priceTour = convertBalanceToWei(10).toString();
      const guaranteeFee = convertBalanceToWei(1).toString();
      const limitClient = 3;

      const tourService = new TourService(adapter);

      console.log({ title, endTime, priceTour, guaranteeFee, limitClient });

      const hash = await tourService.createTour(
        'Tour 1',
        endTime,
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
    const hashApprove = await web3Service.approveToken(
      '0x59b05006dd3729C11a62Eb65562e7758cd3458E4',
      address as string,
      '0x68876F09F1A8A6EBC94e315d8F68cDf9079f0b92'
    );
    console.log('handleApprove ~ hashApprove:', hashApprove);
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
