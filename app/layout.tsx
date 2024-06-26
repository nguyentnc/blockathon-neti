import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Coin98AdapterProvider from '@/components/providers/Coin98AdapterProvider';
import Coin98AdapterModal from '@/components/modals/Coin98AdapterModal';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import Header from '@/components/Header';
import MissionAd from '@/components/MissionAd';
import ConfigHeightScreen from '@/lib/contexts/ConfigHeightScreen';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeTi',
  description: 'A place where people can get connection and travel together',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ConfigHeightScreen />
      <body
        className={cn(
          inter.className,
          'bg-[#ffffff] min-h-screen flex flex-col relative'
        )}
      >
        <div className='flex-1 flex flex-col max-w-[430px] w-full mx-auto'>
          <ReactQueryProvider>
            <Coin98AdapterProvider>
              <Header />
              {/* <MissionAd /> */}
              {children}
              <Coin98AdapterModal />
            </Coin98AdapterProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
