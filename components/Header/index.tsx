'use client';

import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useWallet } from '@coin98-com/wallet-adapter-react';

import ConnectWallet from '../ConnectWallet';
import HeaderMenu from './HeaderMenu';

const Header: FunctionComponent = () => {
  const { address } = useWallet();

  return (
    <header
      className={cn(
        'h-[3.75rem] sticky top-0 left-0 px-5 z-50 bg-white border-b border-black/10',
        'flex items-center justify-between'
      )}>
      <Link href='/'>
        <Image width={46} height={18} src='/neti_logo.svg' alt='Neti logo' />
      </Link>

      {!address ? <ConnectWallet /> : <HeaderMenu />}
    </header>
  );
};

export default Header;
