import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Coin98AdapterProvider from '@/components/providers/Coin98AdapterProvider';
import Coin98AdapterModal from '@/components/modals/Coin98AdapterModal';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

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
      <body className={inter.className}>
        <ReactQueryProvider>
          <Coin98AdapterProvider>
            {children}
            <Coin98AdapterModal />
          </Coin98AdapterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
