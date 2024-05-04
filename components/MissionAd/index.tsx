import { cn } from '@/lib/utils';
import { FunctionComponent } from 'react';
import { Button } from '../Button';
import Icon from '../Icon';

interface MissionAdProps {
  className?: string;
}

const MissionAd: FunctionComponent<MissionAdProps> = ({ className }) => {
  return (
    <div className={cn('py-4 px-5', 'bg-[#FC5201]', className)}>
      <div className='text-[#ffffff]'>
        <div className='mb-3 max-w-[232px] font-semibold text-base'>
          Complete NeTi mission to earn more exclusive voucher and Token
        </div>

        <Button className='px-0 font-medium text-sm'>
          JOIN OUR MISSION
          <Icon name='send' className='text-xl ml-1' />
        </Button>
      </div>
    </div>
  );
};

export default MissionAd;
