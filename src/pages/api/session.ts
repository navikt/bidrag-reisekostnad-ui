// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from "../../libs/security/wonderwall";

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
  const session = await getSession(req);
  if (!session) return res.status(401).end();

  if (!session?.user?.pid) {
    return res.status(401).end();
  }

  res.status(200).json(JSON.stringify({...session.user, token: session.token, person: session.getToken("dev-fss.bidrag.bidrag-person-feature")}))
}
