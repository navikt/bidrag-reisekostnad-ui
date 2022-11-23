import { NextRequest, NextResponse } from "next/server";
import {NextApiRequest} from "next";
import tokenProvider from "./providers";
import {apiToken} from "./issuers";

function getTokenFromHeader(req: NextApiRequest | NextRequest): string | null | undefined{
  return req instanceof NextRequest ? req.headers.get("authorization") :  req.headers.authorization
}

export function getToken(req: NextApiRequest | NextRequest): string | null {
  const token = getTokenFromHeader(req)
  if (!token) return token ?? null;
  return token.split(" ")[1];
}

export async function getSession(req: NextApiRequest | NextRequest){
  try {
    const token = tokenProvider.getToken(req)
    if (!token) return null
    const { payload } = await tokenProvider.verifyToken(token);
    return {
      token,
      user: {
        sub: payload.sub as string,
        pid: payload.pid as string
      },
      expires_in: expiresIn(payload.exp!),
      getToken: apiToken(tokenProvider, token),
    };
  } catch (err) {
    throw err;
  }
}

function expiresIn(timestamp: number): number {
  return timestamp - Math.round(Date.now() / 1000);
}