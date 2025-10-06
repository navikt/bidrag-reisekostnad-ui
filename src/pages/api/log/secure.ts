import { NextApiRequest, NextApiResponse } from 'next';
import { secureLogger } from '../../../lib/logging/secureLogger';
import { isLogEvent, toLevelLabel } from '../../../lib/logging/utils';

const loggingHandler = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    if (!isLogEvent(req.body)) {
        res.status(400).json({ error: 'Invalid payload' });
        return;
    }

    const { level, ts, messages } = req.body;
    const label = toLevelLabel(level);

    if (!label) {
        res.status(400).json({ error: `Invalid level ${String(level)}` });
        return;
    }

    const child = secureLogger.child({
        x_timestamp: ts,
        x_isFrontend: true,
        x_userAgent: req.headers['user-agent'],
        correlationId: (req.headers['x-correlation-id'] as string) ?? 'not-set',
    } as Record<string, unknown>);

    (child[label] as (...args: unknown[]) => void)(...(messages as unknown[]));

    res.status(200).json({ ok: `ok` });
};

export default loggingHandler;
