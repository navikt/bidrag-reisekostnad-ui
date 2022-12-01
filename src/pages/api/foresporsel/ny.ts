import { NextApiRequest, NextApiResponse } from "next";
import { HTTPStatus } from "../../../enum/HttpStatus";
import { logger } from "../../../lib/logging/logger";
import { withSessionApiRoute } from "../../../lib/security/withSessionApiRoute";
import ReisekostnadService from "../../../service/ReisekostnadService";

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);
    const responseStatus = await new ReisekostnadService(req.session).opprettNyForesporsel(body);

    if (responseStatus !== HTTPStatus.OK) {
      throw new Error(`Fikk respons ${responseStatus}`);
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}
