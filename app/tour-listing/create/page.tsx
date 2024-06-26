'use client';

import { FormEvent, useState } from 'react';
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
import { NETI_ADDRESS, TOUR_ADDRESS } from '@/services/constants';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/AlertDialog';

const fieldWrapperClassName = 'grid w-full max-w-sm items-center gap-1.5 mt-4';

const TourListingCreate = () => {
  const adapter = useWallet();
  const { address } = adapter;

  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState('/');

  const openModal = (slug: string) => {
    setIsOpen(true);
    setSlug(slug);
  };

  const handleApprove = async () => {
    const web3Service = new EvmWeb3Service(adapter);
    const allowance = await web3Service.getTokenAllowance(
      NETI_ADDRESS,
      address as string,
      TOUR_ADDRESS
    );

    if (allowance !== '0') {
      return;
    }

    await web3Service.approveToken(
      NETI_ADDRESS,
      address as string,
      TOUR_ADDRESS
    );
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

      return hash;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const web3Service = new EvmWeb3Service(adapter);

    const data = event.target as any;

    const title = data?.title?.value.toLowerCase().split(' ').join('-');

    const endTime = dayjs().add(3, 'minute').valueOf();

    const priceTourNumber = Number(data?.priceTour?.value);
    const guaranteeFeeNumber = Number(data?.guaranteeFee?.value);
    const limitClient = Number(data?.limitClient?.value);

    await handleApprove();

    const hash = await createTour({
      title,
      endTime,
      limitClient,
      priceTourNumber,
      guaranteeFeeNumber,
    });

    if (hash) {
      openModal(`/detail/${title}`);
    }
  };
  return (
    <main className='p-5 pb-10 flex flex-col'>
      <form onSubmit={handleSubmit}>
        <Title className='text-2xl font-semibold mb-10'>Create Tour</Title>

        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create successfully!</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to detail tour?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Link href='/'>Cancel</Link>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Link href={slug}>Continue</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
