'use client';

import React, { useState } from 'react';
import { useWallet } from '@coin98-com/wallet-adapter-react';

import { cn } from '@/lib/utils';
import { formatAddress } from '@/common/functions';

import { BodyLock } from '../BodyLock';

const menuItems = [
  {
    title: 'Tour Listing',
    href: '/',
  },
  {
    title: 'Mission',
    href: '/',
  },
  {
    title: 'My Booked Ticket',
    href: '/',
  },
  {
    title: 'Saved List',
    href: '/',
  },
];

const HeaderMenu = () => {
  const { address, disconnect } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <BodyLock />}

      <span
        className={cn('text-2xl cursor-pointer', isOpen ? 'icon-close' : 'icon-hamburger')}
        onClick={() => setIsOpen(prev => !prev)}
      />
      <div
        className={cn(
          'fixed top-[3.75rem] p-5 left-0 w-full h-[calc(100%-3.75rem)] bg-white z-30 translate-x-full transition flex flex-col',
          isOpen && 'translate-x-0'
        )}>
        <div className='p-4 bg-[#F5F1ED] rounded-2xl mb-6'>
          <div className='text-sm'>{formatAddress(address as string)}</div>
          <div className='text-xs'>Balance: 0.1 NETI</div>
        </div>

        <ul className='space-y-6'>
          {menuItems.map(item => (
            <li key={item.title}>
              <a href={item.href} className='hover:text-[#FC5201] transition'>
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <div className='mt-auto flex items-center justify-center'>
          <span className='text-[#FC5201] font-semibold cursor-pointer' onClick={disconnect}>
            Disconnect
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
