import {NextRequest} from "next/server";
import {JWTVerifyResult} from "jose";
import {NextApiRequest} from "next";

export type GetToken = (req: NextRequest | NextApiRequest) => string | null;
export type VerifyAuth = (
    token: string
) => Promise<JWTVerifyResult>;

export interface AuthProvider {
  name: string;
  getToken: GetToken;
  verifyToken: VerifyAuth;
}


export type IdPortenProvider = AuthProvider & {
  name: "idporten"
}

export type MockProvider = AuthProvider & {
  name: "mock"
}