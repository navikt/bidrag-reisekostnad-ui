import type { IronSessionOptions } from "iron-session";
import environment from "../environment";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "bidrag-reisekostnad-cookie",
  cookieOptions: {
    secure: environment.system.isProduction,
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    token?: string;
  }
}


export type IUser = {
  navn: string
  fodselsnummer: string;
}