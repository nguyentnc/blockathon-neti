'use client';

import { FormEvent, FunctionComponent } from 'react';
import dayjs from 'dayjs';
import Title from '@/components/Title';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { convertBalanceToWei } from '@/common/functions';
import { TourService } from '@/services/TourService';
import { EvmWeb3Service } from '@/services/EvmWeb3Service';

interface TourListingCreateProps {
  className?: string;
}

const fieldWrapperClassName = 'grid w-full max-w-sm items-center gap-1.5 mt-4';

const TourListingCreate: FunctionComponent<TourListingCreateProps> = () => {
  const adapter = useWallet();
  const { address } = adapter;

  const handleApprove = async () => {
    const web3Service = new EvmWeb3Service(adapter);
    const hashApprove = await web3Service.approveToken(
      '0x59b05006dd3729C11a62Eb65562e7758cd3458E4',
      address as string,
      '0x68876F09F1A8A6EBC94e315d8F68cDf9079f0b92'
    );
    console.log('handleApprove ~ hashApprove:', hashApprove);
  };

  const createTour = async (data: {
    title: string;
    endTime: number;
    priceTourNumber: number;
    guaranteeFeeNumber: number;
    limitClient: number;
  }) => {
    const { title, endTime, priceTourNumber, guaranteeFeeNumber, limitClient } =
      data;

    try {
      const priceTour = convertBalanceToWei(priceTourNumber).toString();
      const guaranteeFee = convertBalanceToWei(guaranteeFeeNumber).toString();

      const tourService = new TourService(adapter);

      const hash = await tourService.createTour(
        title,
        endTime,
        priceTour,
        guaranteeFee,
        limitClient
      );

      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const web3Service = new EvmWeb3Service(adapter);

    const data = event.target as any;

    const title = data?.title?.value;
    const endTime = dayjs(data?.endTime?.value).valueOf();

    const priceTourNumber = Number(data?.priceTour?.value);
    const guaranteeFeeNumber = Number(data?.guaranteeFee?.value);
    const limitClient = Number(data?.limitClient?.value);

    const tokenAllowance = await web3Service.getTokenAllowance(
      '0x59b05006dd3729C11a62Eb65562e7758cd3458E4',
      address as string,
      '0x68876F09F1A8A6EBC94e315d8F68cDf9079f0b92'
    );

    if (Number(tokenAllowance) === 0) {
      await handleApprove();
    }

    createTour({
      title,
      endTime,
      limitClient,
      priceTourNumber,
      guaranteeFeeNumber,
    });
  };
  return (
    <main className='p-5 pb-10 flex flex-col'>
      <form onSubmit={handleSubmit}>
        <Title className='text-2xl font-semibold mb-10'>Crate Tour</Title>

        <div className={fieldWrapperClassName}>
          <Label className='text-base font-normal' htmlFor='title'>
            Tour Name
          </Label>
          <Input
            type='title'
            id='title'
            className='text-base w-full'
            placeholder='Tour Name'
          />
        </div>

        <div className={fieldWrapperClassName}>
          <Label className='text-base font-normal' htmlFor='endTime'>
            End Time
          </Label>
          <Input
            type='date'
            id='endTime'
            className='text-base w-full'
            placeholder='End Time'
          />
        </div>

        <div className={fieldWrapperClassName}>
          <Label className='text-base font-normal' htmlFor='priceTour'>
            Price Tour
          </Label>
          <Input
            type='number'
            id='priceTour'
            className='text-base w-full'
            placeholder='Price Tour'
          />
        </div>

        <div className={fieldWrapperClassName}>
          <Label className='text-base font-normal' htmlFor='guaranteeFee'>
            Guarantee Fee
          </Label>
          <Input
            type='number'
            id='guaranteeFee'
            className='text-base w-full'
            placeholder='Guarantee Fee'
          />
        </div>

        <div className={fieldWrapperClassName}>
          <Label className='text-base font-normal' htmlFor='limitClient'>
            Total Joiner
          </Label>
          <Input
            type='number'
            id='limitClient'
            className='text-base w-full'
            placeholder='Total Joiner'
          />
        </div>

        <div className='flex justify-end mt-4'>
          <Link href='/'>
            <Button variant='ghost' className='w-20 mr-2'>
              Cancel
            </Button>
          </Link>

          <Button type='submit' className='w-20'>
            Create
          </Button>
        </div>
      </form>
    </main>
  );
};

export default TourListingCreate;
