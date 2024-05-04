import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import Title from '../Title';
import { Button } from '../Button';
import Icon from '../Icon';

interface TourCardProps {
  className?: string;
}

const TourCard: FunctionComponent<TourCardProps> = ({ className }) => {
  return (
    <div className={cn('p-1', '', className)}>
      <div className='relative'>
        <picture>
          <Image width={342} height={186} alt='' src='' />
        </picture>
      </div>
      <div className='p-2'>
        <div className='text-xs font-semibold text-[#FC5201]'>
          [3 days] Starting at 12:00PM - 24/12/2024
        </div>

        <Title className='text-xl mt-2'>
          11D10N Ovation Of The Seas - Australia - New Zealand
        </Title>

        <div className='flex items-center justify-between mt-8'>
          <div className='mr-1'>
            <div className='text-xl font-semibold text-[#FC5201]'>
              4,300 C98
            </div>
            <span className='text-xs font-normal text-[#5E5E5E]'>
              (Include Tour & Reservation fee)
            </span>
          </div>

          <Button className='text-xs font-semibold bg-[#2C2C2C] rounded-full text-[#ffffff]'>
            Join now
            <Icon name='send' className='text-base ml-1' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
