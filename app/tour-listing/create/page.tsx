import { FunctionComponent } from 'react';

import Title from '@/components/Title';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Button } from '@/components/Button';
import Link from 'next/link';

interface TourListingCreateProps {
  className?: string;
}

const fieldWrapperClassName = 'grid w-full max-w-sm items-center gap-1.5 mt-4';

const TourListingCreate: FunctionComponent<TourListingCreateProps> = () => {
  return (
    <main className='p-5 pb-10 flex flex-col'>
      <Title className='text-2xl font-semibold mb-10'>Crate Tour</Title>

      <div className={fieldWrapperClassName}>
        <Label className='text-base font-normal' htmlFor='title'>
          Title
        </Label>
        <Input
          type='title'
          id='title'
          className='text-base w-full'
          placeholder='Title'
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

        <Button className='w-20'>Create</Button>
      </div>
    </main>
  );
};

export default TourListingCreate;
