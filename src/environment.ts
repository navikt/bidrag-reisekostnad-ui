import env from "env-var";

// @ts-nocheck
const system = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

const url = {
  bidragReisekostnad: env.get("BIDRAG_REISEKOSTNAD_API_URL").required().asString(),
  bidragPerson: env.get("BIDRAG_PERSON_URL").required().asString()
};

const audiences = {
  bidrag_person: env.get("BIDRAG_PERSON_SCOPE").required().asString(),
  bidrag_reisekostnad_api: env.get("BIDRAG_REISEKOSTNAD_API_SCOPE").required().asString()
}

export default { url, system, audiences };
