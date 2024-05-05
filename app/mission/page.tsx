'use client';
import { Fragment, useState } from 'react';
import { Button } from '@/components/Button';
import Title from '@/components/Title';
import MissionCard from '@/components/MissionCard';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { MissionService } from '@/services/MissionService';
import { convertBalanceToWei } from '@/common/functions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/AlertDialog';

const Mission = () => {
  const adapter = useWallet();

  const [isOpen, setIsOpen] = useState(false);

  const closeAlert = () => {
    setIsOpen(false);
  };

  const claimReward = async () => {
    try {
      const missionReward = new MissionService(adapter);
      const hash = await missionReward.claimReward(
        convertBalanceToWei(9898).toString(),
        1
      );

      if (hash) {
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='px-5 pb-10 flex flex-col'>
      <div className='py-5'>
        <div className='px-4 py-3 w-full rounded-md bg-[#FC5201] flex items-center justify-between'>
          <div className='text-white'>
            <span className='text-xs'>Total reward</span>
            <br />
            <span className='font-semibold text-xl'>9898 NETI</span>
          </div>

          <Button
            onClick={claimReward}
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

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Claim successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Congratulations! Let's start with the trips
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeAlert}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Mission;
