import {getToken} from "./wonderwall";
import {NextRequest} from "next/server";

export class TokenUtil {

  static getUserToken(req: NextRequest): string | null {
    return getToken(req)
  }

  static getSession(){

  }
}