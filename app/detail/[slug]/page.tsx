'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Skeleton } from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { TourService } from '@/services/TourService';
import { Button } from '@/components/Button';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { EvmWeb3Service } from '@/services/EvmWeb3Service';
import { NETI_ADDRESS, TOUR_ADDRESS } from '@/services/constants';
import { convertWeiToBalance } from '@/common/functions';
import dayjs from 'dayjs';

const DetailPage = () => {
  const { slug } = useParams();
  const adapter = useWallet();
  const { address } = adapter;
  const web3Service = new EvmWeb3Service();

  const {
    data: tourData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tour-detail', slug],
    queryFn: () => {
      const tourService = new TourService();
      return tourService.getInfo(slug as string);
    },
  });
  console.log('DetailPage ~ tourData:', tourData);

  const { data: isRegistered, refetch: refetchIsRegistered } = useQuery({
    queryKey: ['is-registered', slug, address as string],
    queryFn: () => {
      const tourService = new TourService();
      return tourService.checkIsRegistered(slug as string, address as string);
    },
    enabled: Boolean(address),
  });

  const isTourGuide = useMemo(() => {
    if (!address || !tourData) {
      return false;
    }

    return (
      web3Service.checkSumAddress(address as string) ===
      web3Service.checkSumAddress(tourData?.tourGuide)
    );
  }, [address, tourData]);

  const isCanceled = useMemo(() => {
    if (!tourData) {
      return false;
    }

    return tourData?.status === false;
  }, [tourData]);

  const isEnded = dayjs().isAfter(tourData?.endTimeRegister);
  const isStarted = tourData?.status;

  const handleCancelTour = async () => {
    try {
      console.log('cancel tour');
      const tourService = new TourService(adapter);
      const hash = await tourService.cancelTour(slug as string);
      refetch();
      return hash;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterTour = async () => {
    try {
      console.log('register tour');
      await handleApprove();
      const tourService = new TourService(adapter);
      const hash = await tourService.registerTour(slug as string);
      refetch();
      refetchIsRegistered();
      return hash;
    } catch (error) {
      console.log(error);
    }
  };

  // const handleStartTour = async () => {
  //   try {
  //     await handleApprove();
  //     const tourService = new TourService(adapter);
  //     const hash = await tourService.checkAttendance(slug as string, []);
  //     refetch();
  //     return hash;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClaimGuaranteeFee = async () => {
    try {
      await handleApprove();
      const tourService = new TourService(adapter);
      const hash = await tourService.claimGuaranteeFee(slug as string);
      refetch();
      refetchIsRegistered();
      return hash;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaimAfterCancel = async () => {
    try {
      console.log('claim after canceled');
      await handleApprove();
      const tourService = new TourService(adapter);
      const hash = await tourService.claimWhenCancel(slug as string);
      refetch();
      refetchIsRegistered();
      return hash;
    } catch (error) {
      console.log(error);
    }
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

    await web3Service.approveToken(NETI_ADDRESS, address as string, TOUR_ADDRESS);
  };

  // console.log({ isStarted });

  const renderFooter = () => {
    if (!tourData) return null;

    // if (isStarted && !isEnded && isTourGuide) {
    //   return (
    //     <Button
    //       variant='secondary'
    //       disabled
    //       className='ml-auto rounded-full uppercase font-semibold'>
    //       Started
    //     </Button>
    //   );
    // }

    if (!isTourGuide && isCanceled && isRegistered) {
      return (
        <Button
          variant='secondary'
          onClick={handleClaimAfterCancel}
          className='ml-auto rounded-full uppercase font-semibold'>
          Claim Fund
        </Button>
      );
    }

    if (!isTourGuide && isRegistered) {
      return (
        <Button
          variant='secondary'
          onClick={handleClaimGuaranteeFee}
          className='ml-auto rounded-full uppercase font-semibold'>
          Claim guarantee fee
        </Button>
      );
    }

    if (isEnded) {
      return (
        <Button
          variant='secondary'
          disabled
          className='ml-auto rounded-full uppercase font-semibold pointer-events-none'>
          Ended
        </Button>
      );
    }

    return (
      <>
        {!isTourGuide && (
          <div className='text-white'>
            <span className='font-semibold text-xl'>
              {convertWeiToBalance(tourData.priceTour).toString()} NETI
            </span>
            <br />
            <span className='text-xs'>(Include Tour fee & Reservation)</span>
          </div>
        )}

        {isCanceled && (
          <Button
            variant='secondary'
            className='ml-auto rounded-full uppercase font-semibold'
            disabled>
            Canceled
          </Button>
        )}

        {!isCanceled && (
          <Button
            variant='secondary'
            className='ml-auto rounded-full uppercase font-semibold'
            disabled={isRegistered}
            onClick={isTourGuide ? handleCancelTour : handleRegisterTour}>
            {isTourGuide ? 'Cancel tour' : isRegistered ? 'Booked' : 'Book tour'}
          </Button>
        )}
      </>
    );
  };

  return (
    <div>
      <div className='relative aspect-video'>
        <Image
          src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='tour'
          className='object-cover'
          fill
        />
      </div>

      <div className='px-5 py-3'>
        {/* <div className='text-[#FC5201] text-xs font-semibold mb-2'>
          Starting at 12:00PM - 24/12/2024
        </div> */}

        <h2 className='text-xl font-semibold mb-2 capitalize'>
          {(slug as string).split('-').join(' ')}{' '}
          {isCanceled && <span className='text-[#FC5201]'>(Canceled)</span>}
        </h2>

        <div className='flex items-center gap-2'>
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

          <span className='text-xs text-[#8E8E8E]'>are coming</span>
        </div>

        <p className='mt-3 text-sm'>
          Join us for a unique Saigon evening street food adventure, where we'll take you on a
          culinary journey off the beaten path to discover authentic local flavors. Unlike typical
          food tours, we'll skip the commonly known dishes like Pho, Spring Rolls, and Banh Mi
          Sandwiches, and instead introduce you to hidden gems that locals love.
        </p>

        {/* Divider */}
        <div className='h-[1px] bg-[#E6E6E6] my-6' />

        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src='/images/nizzy.webp' />
            <AvatarFallback>
              <Skeleton className='w-full h-full rounded-full' />
            </AvatarFallback>
          </Avatar>

          <div>
            <div className='mb-1 font-semibold'>Meet your host, Nguyen Tran</div>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1 text-[#5E5E5E]'>
                <span className='icon-security text-xl' />
                <span className='text-xs'>Identity verified</span>
              </div>

              <div className='flex items-center gap-1 text-[#5E5E5E]'>
                <span className='icon-thumb_up text-xl' />
                <span className='text-xs'>Good rating</span>
              </div>
            </div>
          </div>
        </div>

        <p className='mt-3 text-sm'>
          Great to meet you, I'm Olivia.
          <br />
          My brother Peter, and I are founders of a Local Guide Team with our co-hosts who are
          knowledgeable, and passionate. <br />
          <br />
          We first discovered Saigon while studying at University after leaving our hometown in
          rural Vietnam. We immediately became fascinated by the city's unique blend of culture,
          history, and delicious cuisine. Our education focused on tourism, and we have extensive
          experience working as local English-speaking tour guides. But, We finally decided it was
          time to bring our custom-tailored experiences to my guests, so we're starting this local
          experience.
          <br />
          <br />
          Why choose us?
          <br />1 Specialized: We are licensed Tour Guides with knowledge, passion, and personal
          perspective.
          <br />2 An experience like a local: Something guests can't find anywhere else
          <br />3 Connect: Warmly welcome guests, turning strangers into friends.
        </p>

        {/* Divider */}
        <div className='h-[1px] bg-[#E6E6E6] my-6' />
      </div>

      {tourData && (
        <div className='sticky p-5 bottom-0 left-0 w-full bg-[#FC5201] flex items-center justify-between'>
          {renderFooter()}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
