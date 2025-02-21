import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPStatus } from '../../../enum/HttpStatus';
import { logger } from '../../../lib/logging/logger';
import { withSessionApiRoute } from '../../../lib/security/withSessionApiRoute';
import ReisekostnadService from '../../../service/ReisekostnadService';

export default withSessionApiRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await new ReisekostnadService(req.session).opprettNyForesporsel(req.body);

    if (response.status !== HTTPStatus.CREATED) {
        logger.error(response);
        throw new Error(`Fikk respons ${response}`);
    }

    return res.status(HTTPStatus.CREATED).end();
}
