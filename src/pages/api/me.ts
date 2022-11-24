import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from "../../lib/security/session";
import PersonService from "../../service/PersonService";
import { withIronSessionApiRoute } from "iron-session/next";
import {sessionOptions} from "../../types/session";

type IUser = {
  navn: string
  fodselsnummer: string;
}
export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUser>
) {
  const session = await getSession(req);
  if (!session) return res.status(401).end();

  if (!session?.user?.fnr) {
    return res.status(401).end();
  }

  const personInfo = await new PersonService(session).hentPersonInfo(session.user.fnr)
  res.status(200).json(personInfo!)
}