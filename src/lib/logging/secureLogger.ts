// This logger is isomorphic, and can be imported from anywhere in the app

import pino from 'pino';

export let secureLogger = (await getLogger())();

export async function initSecureLoggerWithContext() {
    secureLogger = (await getLogger())();
}

// eslint-disable-next-line
async function getLogger(): Promise<(defaultConfig?: {}) => pino.Logger> {
    if (typeof window !== 'undefined') {
        const logger = await import('./secureFrontendLogger');
        return logger.secureFrontendLogger;
    }

    const logger = await import('./secureBackendLogger');
    return logger.secureBackendLogger;
}
