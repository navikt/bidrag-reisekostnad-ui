// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {TokenUtils} from "../../security/TokenUtils";

type Data = {
  name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
  res.status(200).send(TokenUtils.getUserToken(req) ?? "nothing")
}
