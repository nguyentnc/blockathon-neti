import { Fragment, FunctionComponent } from 'react';
import { Button } from '@/components/Button';
import Title from '@/components/Title';
import MissionCard from '@/components/MissionCard';

interface MissionProps {
  className?: string;
}

const Mission: FunctionComponent<MissionProps> = ({ className }) => {
  return (
    <main className='px-5 pb-10 flex flex-col'>
      <div className='py-5'>
        <div className='px-4 py-3 w-full rounded-md bg-[#FC5201] flex items-center justify-between'>
          <div className='text-white'>
            <span className='text-xs'>Total reward</span>
            <br />
            <span className='font-semibold text-xl'>4300 NETI</span>
          </div>

          <Button
            variant='secondary'
            className='rounded-full uppercase font-semibold'
          >
            Claim now
          </Button>
        </div>
      </div>

      <Title className='text-2xl font-semibold mb-1'>Missions</Title>

      {Array.from({ length: 5 }).map((_item, index) => {
        return (
          <Fragment key={index}>
            <MissionCard isEarned={index === 0} className='mt-3' />

            <div className='h-[1px] bg-[#E6E6E6] mb-1 mt-4 last:hidden' />
          </Fragment>
        );
      })}
    </main>
  );
};

export default Mission;
