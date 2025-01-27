import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPStatus } from '../../../enum/HttpStatus';
import { logger } from '../../../lib/logging/logger';
import { withSessionApiRoute } from '../../../lib/security/withSessionApiRoute';
import ReisekostnadService from '../../../service/ReisekostnadService';

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const foresporselId = req.body;
    const response = await new ReisekostnadService(req.session).trekkeForesporsel(foresporselId);

    if (response.status !== HTTPStatus.OK) {
        logger.error(response);
        throw new Error(`Fikk respons ${response.status}`);
    }

    return res.status(HTTPStatus.OK).end();
}
