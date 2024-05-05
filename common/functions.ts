import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const convertWeiToBalance = (amount: string | number, decimal = 18) => {
  try {
    const bigDecimal = BigNumber(10).pow(decimal);
    const bigAmount = new BigNumber(amount);

    return bigAmount.div(bigDecimal);
  } catch (error) {
    return new BigNumber(0);
  }
};

export const convertBalanceToWei = (amount: string | number, decimal = 18) => {
  try {
    const bigDecimal = BigNumber(10).pow(decimal);
    const bigAmount = new BigNumber(amount);

    return bigAmount.multipliedBy(bigDecimal);
  } catch (error) {
    return new BigNumber(0);
  }
};

export const formatAddress = (address: string, length = 6) => {
  if (!address) return '';

  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const formatReadableNumber = (
  value: number | string,
  options: {
    isTokenAmount?: boolean;
    locale?: string;
    currency?: string;
    isCompact?: boolean;
    threshold?: number;
    customDecimal?: number | null;
  } = {}
) => {
  const parseNumber = typeof value === 'string' ? parseFloat(value) : value;
  const {
    isTokenAmount = false,
    locale = 'en-US',
    isCompact = false,
    threshold = 1e4,
    customDecimal = null,
  } = options;

  const isOverThreshold = parseNumber >= threshold;

  let decimal = isTokenAmount ? 4 : 2;

  if (isOverThreshold && isCompact) {
    decimal = 0;
  }

  let formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: customDecimal || decimal,

    ...(isOverThreshold && isCompact && { notation: 'compact' }),
  }).format(parseNumber);

  return formattedNumber;
};
