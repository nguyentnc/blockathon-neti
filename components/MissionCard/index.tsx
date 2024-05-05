import { FunctionComponent } from 'react';
import Title from '../Title';
import { Button } from '../Button';
import Icon from '../Icon';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  isEarned?: boolean;
  className?: string;
}

const MissionCard: FunctionComponent<MissionCardProps> = ({
  isEarned,
  className,
}) => {
  return (
    <div className={className}>
      <div className='bg-[#FC520129] text-[#FC5201] px-2 py-1 text-xs font-semibold w-max rounded-full'>
        4,300 NETI
      </div>

      <Title className='text-xl font-semibold mt-1'>Tour around Website</Title>

      <div className='text-sm text-[#5E5E5E] font-normal mt-1'>
        Join us for a unique Saigon evening street food adventure, where we'll
        take you on a culinary journey off the
      </div>

      <Button
        variant='ghost'
        className={cn(
          'mt-5',
          'w-full rounded-full border text-xs font-semibold',
          isEarned
            ? 'text-[#139D21] border-[#139D21]'
            : 'text-[#2C2C2C] border-[#E1E1E1]'
        )}
      >
        {isEarned ? 'Earned' : 'Join Quest'}
        <Icon name='send' className='text-xl ml-1' />
      </Button>
    </div>
  );
};

export default MissionCard;
