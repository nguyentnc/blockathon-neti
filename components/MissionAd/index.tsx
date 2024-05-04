import { cn } from '@/lib/utils';
import { FunctionComponent } from 'react';
import { Button } from '../Button';

interface MissionAdProps {
  className?: string;
}

const MissionAd: FunctionComponent<MissionAdProps> = ({ className }) => {
  return (
    <div className={cn('py-4 px-5', 'bg-[#FC5201]', className)}>
      <div>
        <div className='mb-3 max-w-[232px] font-semibold text-base color-[#ffffff]'>
          Complete NeTi mission to earn more exclusive voucher and Token
        </div>

        <Button className='px-0 font-medium text-sm color=[#ffffff]'>
          JOIN OUR MISSION

          <span className='' />
        </Button>
      </div>
    </div>
  );
};

export default MissionAd;
