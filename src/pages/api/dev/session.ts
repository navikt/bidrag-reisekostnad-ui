// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import environment from "../../../environment";
import { withSessionApiRoute } from "../../../lib/security/withSessionApiRoute";

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (environment.system.isClusterProduction) {
    return res.status(404).end();
  }

  const session = req.session;
  res.status(200).json(
    JSON.stringify({
      ...session.user,
      idporten_token: session.token,
      reisekostnad_api_token: await session.getOBOToken(
        environment.audiences.bidrag_reisekostnad_api
      ),
    })
  );
}
