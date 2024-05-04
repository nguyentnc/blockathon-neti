'use client';

import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';

import { ADDRESS_ZERO } from '@/services/constants';
import { convertWeiToBalance } from '@/common/functions';

import useUserBalanceQuery from '@/hooks/useUserBalanceQuery';

export default function TestPage() {
  const { address, disconnect, connected } = useWallet();
  const { openWalletModal } = useWalletModal();

  const { data: balance } = useUserBalanceQuery(ADDRESS_ZERO);
  const { data: balanceC98 } = useUserBalanceQuery('0x0Fd0288AAAE91eaF935e2eC14b23486f86516c8C');

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
        </>
      )}
    </main>
  );
}
