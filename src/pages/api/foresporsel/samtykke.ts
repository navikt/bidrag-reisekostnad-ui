import { NextApiRequest, NextApiResponse } from "next";
import { HTTPStatus } from "../../../enum/HttpStatus";
import { logger } from "../../../lib/logging/logger";
import { withSessionApiRoute } from "../../../lib/security/withSessionApiRoute";
import ReisekostnadService from "../../../service/ReisekostnadService";

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { foresporselId } = req.body;
    const response = await new ReisekostnadService(req.session).samtykkeForesporsel(foresporselId);

    if (response.status !== HTTPStatus.CREATED) {
      logger.error(response);
      throw new Error(`Fikk respons ${response.status}`);
    }

    return res.status(HTTPStatus.OK);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}
