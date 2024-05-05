'use client';

import Title from '@/components/Title';
import TourCard from '@/components/TourCard';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex-1 flex flex-col'>
      <Title className='px-5 pt-5 text-2xl font-semibold'>Tour Listing</Title>

      {Array.from({ length: 20 }).map((_item, index) => {
        return (
          <div key={index} className='px-5 mt-3'>
            <Link href="/detail/[slug]" as="/detail/dalat">
              <TourCard />
            </Link>
          </div>
        );
      })}
    </main>
  );
}
