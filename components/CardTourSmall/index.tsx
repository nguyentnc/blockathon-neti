import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import Title from '../Title';
import Icon from '../Icon';

interface CardTourSmallProps {
  className?: string;
}

const CardTourSmall: FunctionComponent<CardTourSmallProps> = ({
  className,
}) => {
  return (
    <div className={cn('flex', className)}>
      <picture className='flex-none mr-2'>
        <Image
          width={80}
          height={80}
          alt=''
          className='object-cover w-1/4 min-w-[80px] max-w-[80px] aspect-square rounded-sm'
          src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </picture>

      <div className=''>
        <Title className='text-sm font-semibold'>
          11D10N Ovation Of The Seas - Australia - New Zealand
        </Title>

        <div className='text-xs font-normal text-[#5E5E5E] mt-1 flex items-center'>
          <Icon name='status_pending' className='text-base' />
          &nbsp;12:00PM - 24/12/2024
        </div>

        <div className='mr-1'>
          <span className='text-base font-semibold text-[#FC5201]'>
            4,300 C98
          </span>
          &nbsp;
          <span className='text-xs font-normal text-[#5E5E5E]'>
            (Include Tour & Reservation fee)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardTourSmall;
