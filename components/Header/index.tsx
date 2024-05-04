import { FunctionComponent } from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Header: FunctionComponent = () => {
  return (
    <div className={cn('h-10 px-5', 'flex items-center justify-between')}>
      <Link href='/'>
        <Image width={46} height={18} src='/neti_logo.svg' alt='Neti logo' />
      </Link>

      <div>Menu</div>
    </div>
  );
};

export default Header;
