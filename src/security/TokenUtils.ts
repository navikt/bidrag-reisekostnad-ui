import {NextApiRequest} from "next";

export class TokenUtils {

  static getUserToken(req: NextApiRequest): string | undefined{
    const token = req.headers.authorization;
    if (!token) return token;
    return token.split(" ")[1];
  }
}