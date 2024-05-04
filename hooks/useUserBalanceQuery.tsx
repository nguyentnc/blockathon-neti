import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@coin98-com/wallet-adapter-react';

import { EvmWeb3Service } from '@/services/EvmWeb3Service';

const useUserBalanceQuery = (tokenAddress: string) => {
  const { address } = useWallet();

  const userBalanceQuery = useQuery({
    queryKey: ['user_balance', address, tokenAddress],
    queryFn: async () => {
      const evmService = new EvmWeb3Service();
      const balance = await evmService.getBalance(address as string, tokenAddress);
      return balance;
    },
    enabled: Boolean(address && tokenAddress),
    staleTime: 30000,
  });

  return userBalanceQuery;
};

export default useUserBalanceQuery;
