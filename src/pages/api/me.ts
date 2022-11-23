// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from "../../libs/security/session";
import PersonService from "../../service/PersonService";
import {capitalizeFirstLetter} from "../../libs/string.util";

type IMeResponse = {
  navn: string
  fodselsnummer: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IMeResponse>
) {
  const session = await getSession(req);
  if (!session) return res.status(401).end();

  if (!session?.user?.fnr) {
    return res.status(401).end();
  }

  const personInfo = await new PersonService(session).hentPersonInfo(session.user.fnr)
  res.status(200).json(personInfo!)
}