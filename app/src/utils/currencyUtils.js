
export const convertCurrency = (
  amount,
  currency = "INR",
  exchangeRates = { INR: 1 }
) => {
  const numericAmount = Number(amount) || 0;

  const rate = exchangeRates[currency];

  if (typeof rate !== "number" || !Number.isFinite(rate)) {
    throw new Error(`Exchange rate unavailable for ${currency}`);
  }

  return numericAmount * rate;
};

export const formatCurrency = (
  amount,
  currency = "INR",
  exchangeRates = { INR: 1 }
) => {
  const convertedAmount = convertCurrency(
    amount,
    currency,
    exchangeRates
  );

  const localeMap = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
  };

  return new Intl.NumberFormat(localeMap[currency] || "en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
};
