import {NextApiRequest} from "next";
import {NextApiResponse} from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import environment from "../../../environment";
import {sessionOptions} from "../../../types/session";


export default withIronSessionApiRoute(handler, sessionOptions);
async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

  if (environment.system.isProduction){
    res.status(404).end()
    return
  }

  req.session.token = req.body.id_token
  await req.session.save();
  res.status(200).end()
}