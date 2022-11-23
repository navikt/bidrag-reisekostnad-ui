import {NextApiRequest} from "next";
import {NextRequest} from "next/server";
import tokenProvider from "./providers";
import {oboToken} from "./oboproviders";

export interface ISession {
  token: string;
  user: IUserSession,
  expires_in: number,
  getOBOToken: (audience: string)=>Promise<string|undefined>
}

export interface IUserSession {
  sub: string;
  fnr: string;
}

export async function getSession(req: NextApiRequest | NextRequest): Promise<ISession | null> {
  try {
    const token = tokenProvider.getToken(req)
    if (!token) return null
    const { payload } = await tokenProvider.verifyToken(token);
    return {
      token,
      user: {
        sub: payload.sub as string,
        fnr: payload.pid as string
      },
      expires_in: expiresIn(payload.exp!),
      getOBOToken: oboToken(tokenProvider, token),
    };
  } catch (err) {
    throw err;
  }
}

function expiresIn(timestamp: number): number {
  return timestamp - Math.round(Date.now() / 1000);
}