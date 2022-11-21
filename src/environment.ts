// @ts-nocheck
const system = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

const url = {
  bidragReisekostnad: process.env.BIDRAG_REISEKOSTNAD_URL,
};

export default { url, system };
