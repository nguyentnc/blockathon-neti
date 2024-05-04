import React from 'react';
import { Button } from '../Button';

const ConnectWallet = () => {
  return (
    <Button className='uppercase flex items-center gap-1'>
      <span className='icon-wallet text-base' />
      <span className='text-xs'>Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
