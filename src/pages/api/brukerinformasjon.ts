import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from "../../lib/security/session";
import ReisekostnadService from "../../service/ReisekostnadService";
import {IBrukerinformasjon} from "../../types/foresporsel";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBrukerinformasjon>
) {
  const session = await getSession(req);
  if (!session) return res.status(401).end();

  if (!session?.user?.fnr) {
    return res.status(401).end();
  }

  const personInfo = await new ReisekostnadService(session).hentBrukerInformasjon()
  res.status(200).json(personInfo!)
}