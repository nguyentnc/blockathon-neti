'use client';

import CardTourSmall from '@/components/CardTourSmall';
import Title from '@/components/Title';
import TourCard from '@/components/TourCard';

export default function Home() {
  return (
    <main className='flex-1'>
      <Title className='px-5 text-2xl' moreAction={{}}>
        Tour Listing
      </Title>

      <div className='px-5 mt-2'>
        <TourCard />
      </div>

      <div className='px-5 mt-2'>
        <CardTourSmall />
      </div>
    </main>
  );
}
