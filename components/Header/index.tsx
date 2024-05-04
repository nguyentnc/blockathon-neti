import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import ConnectWallet from '../ConnectWallet';

const Header: FunctionComponent = () => {
  return (
    <div className={cn('h-[3.75rem] px-5', 'flex items-center justify-between')}>
      <Link href='/'>
        <Image width={46} height={18} src='/neti_logo.svg' alt='Neti logo' />
      </Link>

      <ConnectWallet />
    </div>
  );
};

export default Header;
