import BigNumber from 'bignumber.js';

export const convertWeiToBalance = (amount: string | number, decimal = 18) => {
  try {
    const bigDecimal = BigNumber(10).pow(decimal);
    const bigAmount = new BigNumber(amount);

    return bigAmount.div(bigDecimal);
  } catch (error) {
    return '0';
  }
};

export const formatAddress = (address: string, length = 6) => {
  if (!address) return '';

  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
