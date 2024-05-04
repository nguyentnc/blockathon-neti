'use client';

import React from 'react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/Button';
import Title from '@/components/Title';
import CardTourSmall from '@/components/CardTourSmall';

const DetailPage = () => {
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
        <div className='text-[#FC5201] text-xs font-semibold mb-2'>
          [3 days] Starting at 12:00PM - 24/12/2024
        </div>

        <h2 className='text-xl font-semibold mb-2'>
          11D10N Ovation Of The Seas - Australia - New Zealand
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
          Join us for a unique Saigon evening street food adventure, where we'll
          take you on a culinary journey off the beaten path to discover
          authentic local flavors. Unlike typical food tours, we'll skip the
          commonly known dishes like Pho, Spring Rolls, and Banh Mi Sandwiches,
          and instead introduce you to hidden gems that locals love.
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
            <div className='mb-1 font-semibold'>
              Meet your host, Nguyen Tran
            </div>
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
          My brother Peter, and I are founders of a Local Guide Team with our
          co-hosts who are knowledgeable, and passionate. <br />
          <br />
          We first discovered Saigon while studying at University after leaving
          our hometown in rural Vietnam. We immediately became fascinated by the
          city's unique blend of culture, history, and delicious cuisine. Our
          education focused on tourism, and we have extensive experience working
          as local English-speaking tour guides. But, We finally decided it was
          time to bring our custom-tailored experiences to my guests, so we're
          starting this local experience.
          <br />
          <br />
          Why choose us?
          <br />1 Specialized: We are licensed Tour Guides with knowledge,
          passion, and personal perspective.
          <br />2 An experience like a local: Something guests can't find
          anywhere else
          <br />3 Connect: Warmly welcome guests, turning strangers into
          friends.
        </p>

        {/* Divider */}
        <div className='h-[1px] bg-[#E6E6E6] my-6' />

        <Title className='text-xl' moreAction={{}}>
          More tour by Olivia
        </Title>

        {Array.from({ length: 5 }).map((i, j) => {
          return (
            <div key={j} className='mt-4'>
              <CardTourSmall />
            </div>
          );
        })}
      </div>

      <div className='sticky p-5 bottom-0 left-0 w-full bg-[#FC5201] flex items-center justify-between'>
        <div className='text-white'>
          <span className='font-semibold text-xl'>4300 NETI</span>
          <br />
          <span className='text-xs'>(Include Tour fee & Reservation)</span>
        </div>

        <Button
          variant='secondary'
          className='rounded-full uppercase font-semibold'
        >
          Book tour
        </Button>
      </div>
    </div>
  );
};

export default DetailPage;
