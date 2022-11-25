import { IAuthProvider } from "../providers/AuthProvider";
import tokenx from "./tokenx";

export function oboToken(provider: IAuthProvider, subject_token: string) {
  switch (provider.name) {
    case "idporten":
      return async (audience: string) => tokenx.exchangeToken()(subject_token, audience);
    case "mock":
      return async (audience: string) => tokenx.exchangeToken()(subject_token, audience);
    default:
      throw new Error("Missing token issuer for this provider");
  }
}
