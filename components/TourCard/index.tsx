import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import Title from '../Title';
import { Button } from '../Button';
import Icon from '../Icon';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import { Skeleton } from '../Skeleton';

interface TourCardProps {
  className?: string;
}

const TourCard: FunctionComponent<TourCardProps> = ({ className }) => {
  return (
    <div className={cn('p-1', 'border border-[#EFEFEF] rounded-lg', className)}>
      <div className='relative'>
        <picture>
          <Image
            width={342}
            height={186}
            alt=''
            className='object-cover w-full aspect-video rounded-lg'
            src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        </picture>
      </div>
      <div className='p-2'>
        <div className='text-xs font-semibold text-[#FC5201]'>
          [3 days] Starting at 12:00PM - 24/12/2024
        </div>

        <Title className='text-xl mt-2 font-semibold'>
          11D10N Ovation Of The Seas - Australia - New Zealand
        </Title>

        <div className='flex items-center mt-2'>
          <div className='flex -space-x-2 overflow-hidden'>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Avatar className='w-6 h-6 border border-white' key={idx}>
                <AvatarImage src='/images/nizzy.webp' />
                <AvatarFallback>
                  <Skeleton className='w-full h-full rounded-full' />
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <span className='text-xs font-normal text-[#5E5E5E] ml-2'>are coming</span>
        </div>

        <div className='flex items-center justify-between mt-8'>
          <div className='mr-1'>
            <div className='text-xl font-semibold text-[#FC5201]'>98.98 NETI</div>
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
