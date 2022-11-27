import type {NextApiResponse} from 'next'
import {NextApiRequest} from "next";
import ReisekostnadService from "../../service/ReisekostnadService";
import {IBrukerinformasjon} from "../../types/foresporsel";
import {withSessionApiRoute} from "../../lib/security/withSessionApiRoute";


export default withSessionApiRoute(handler)

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBrukerinformasjon>
) {
  const personInfo = await new ReisekostnadService(req.session).hentBrukerInformasjon()
  res.status(200).json(personInfo!)
}