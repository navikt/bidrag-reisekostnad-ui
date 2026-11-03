import { errors } from 'jose';
import { NextApiHandler } from 'next';
import { logger } from '../logging/logger';
import { secureLogger } from '../logging/secureLogger';

function getResponseError(error: unknown) {
    if (!(error instanceof errors.JOSEError)) return error;

    return {
        name: error.name,
        code: error.code,
        ...(error instanceof errors.JWTClaimValidationFailed || error instanceof errors.JWTExpired
            ? { claim: error.claim, reason: error.reason }
            : {}),
    };
}

export function withErrorHandler(handler: NextApiHandler): NextApiHandler {
    return async function errorHandler(req, res) {
        try {
            return await handler(req, res);
        } catch (e) {
            const execptionMessage = e instanceof Error ? e.message : '';
            const errorMessage = `Det skjedde en feil ved håndtering av api endepunkt ${req.url} med feilmelding ${execptionMessage}`;
            logger.error(e, errorMessage);
            if (req.body) {
                const bodyString = JSON.stringify(req.body);
                secureLogger
                    .child({
                        requestBody: bodyString,
                    })
                    .error(e, errorMessage);
            }

            return res.status(500).send(getResponseError(e));
        }
    };
}
