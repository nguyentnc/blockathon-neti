'use client';

import React from 'react';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';

import { Button } from '../Button';

const ConnectWallet = () => {
  const { openWalletModal } = useWalletModal();

  return (
    <Button className='uppercase flex items-center gap-1' onClick={openWalletModal}>
      <span className='icon-wallet text-base' />
      <span className='text-xs'>Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
