// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionApiRoute } from "../../../lib/security/withSessionApiRoute";

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  res.status(200).send(req.session.token);
}
