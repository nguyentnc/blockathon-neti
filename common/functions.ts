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
