import {NextRequest} from "next/server";
import {NextApiRequest} from "next";

function getTokenFromHeader(req: NextApiRequest | NextRequest): string | null | undefined{
  return req instanceof NextRequest ? req.headers.get("authorization") : req.headers.authorization
}

export function getToken(req: NextApiRequest | NextRequest): string | null {
  const token = getTokenFromHeader(req)
  if (!token) return token ?? null;
  return token.split(" ")[1];
}