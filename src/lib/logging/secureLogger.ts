// This logger is isomorphic, and can be imported from anywhere in the app

import type { Logger, LoggerOptions } from 'pino';

type LoggerFactory = (defaultConfig?: LoggerOptions) => Logger;

export let secureLogger = (await getLogger())();

export async function initSecureLoggerWithContext(defaultConfig?: LoggerOptions): Promise<void> {
    const makeLogger = await getLogger();
    secureLogger = makeLogger(defaultConfig);
}

async function getLogger(): Promise<LoggerFactory> {
    if (typeof window !== 'undefined') {
        const newLogger = await import('./secureFrontendLogger');
        return newLogger.secureFrontendLogger as LoggerFactory;
    }
    const newLogger = await import('./secureBackendLogger');
    return newLogger.secureBackendLogger as LoggerFactory;
}
