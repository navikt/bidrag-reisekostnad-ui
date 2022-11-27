import {withSessionApiRoute} from "../../../lib/security/withSessionApiRoute";
import {NextApiRequest} from "next";
import {NextApiResponse} from "next";

export interface ISessionData {
  expiresIn: number;
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ISessionData>
) {
  const session = req.session
  res.json({
    expiresIn: session.expires_in,
  });
}

export default withSessionApiRoute(handler)