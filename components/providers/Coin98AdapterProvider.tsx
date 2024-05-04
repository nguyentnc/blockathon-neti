'use client';
import { BLOCKCHAINS_DATA, WalletProvider } from '@coin98-com/wallet-adapter-react';
import { WalletModalProvider } from '@coin98-com/wallet-adapter-react-ui';

// @ts-ignore
import { Coin98WalletAdapter } from '@coin98-com/wallet-adapter-coin98';

const Coin98AdapterProvider = ({ children }: { children: React.ReactNode }) => {
  const enables = [BLOCKCHAINS_DATA.ethereum];
  const wallets = [Coin98WalletAdapter];
  return (
    <WalletProvider wallets={wallets} enables={enables} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default Coin98AdapterProvider;
