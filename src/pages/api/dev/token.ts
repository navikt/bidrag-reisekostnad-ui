// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from "../../../lib/security/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {

  const session = await getSession(req);
  if (!session) return res.status(401).end();

  if (!session?.user?.fnr) {
    return res.status(401).end();
  }

  res.status(200).send(session.token)
}
