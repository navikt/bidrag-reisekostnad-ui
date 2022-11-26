import {NextApiRequest} from "next";
import tokenProvider from "./providers";
import {oboToken} from "./oboproviders";

export interface ISession {
  token: string;
  user: IUserSession,
  expires_in: number,
  getOBOToken: (audience: string)=>Promise<string|null>
}

export interface IUserSession {
  sub: string;
  fnr: string;
}

export async function getValidSession(req: NextApiRequest): Promise<ISession | null> {
    const token = tokenProvider.getToken(req)
    if (!token) return null
    const { payload } = await tokenProvider.verifyToken(token);
    if (!payload?.pid) return null;
    return {
      token,
      user: {
        sub: payload?.sub as string,
        fnr: payload?.pid as string
      },
      expires_in: expiresIn(payload.exp!),
      getOBOToken: await oboToken(tokenProvider, token),
    };
}

function expiresIn(timestamp: number): number {
  return timestamp - Math.round(Date.now() / 1000);
}