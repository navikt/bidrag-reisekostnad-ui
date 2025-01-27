// This logger is isomorphic, and can be imported from anywhere in the app

import pino from 'pino';

export let logger = (await getLogger())();

export async function initLoggerWithContext() {
    logger = (await getLogger())();
}

// eslint-disable-next-line @typescript-eslint/ban-types
async function getLogger(): Promise<(defaultConfig?: {}) => pino.Logger> {
    if (typeof window !== 'undefined') {
        const logger = await import('./frontendLogger');
        return logger.frontendLogger;
    }

    const logger = await import('./backendLogger');
    return logger.backendLogger;
}
