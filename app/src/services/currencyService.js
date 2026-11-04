const CURRENCY_API =
  "https://api.frankfurter.dev/v2/rates?base=INR&quotes=USD,EUR,GBP";

export const getExchangeRates = async () => {
  const response = await fetch(CURRENCY_API);

  if (!response.ok) {
    throw new Error("Unable to fetch exchange rates.");
  }

  const data = await response.json();

  const rates = {
    INR: 1,
  };

  data.forEach((item) => {
    rates[item.quote] = item.rate;
  });

  ["USD", "EUR", "GBP"].forEach((currency) => {
    if (!rates[currency]) {
      throw new Error(`Exchange rate unavailable for ${currency}`);
    }
  });

  return {
    rates,
    date: data[0]?.date || null,
  };
};