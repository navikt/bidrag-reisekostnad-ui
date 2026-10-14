// This logger is isomorphic, and can be imported from anywhere in the app

import type { Logger, LoggerOptions } from 'pino';

type LoggerFactory = (defaultConfig?: LoggerOptions) => Logger;

export const logger: Logger = (await getLogger())();

async function getLogger(): Promise<LoggerFactory> {
    if (typeof window !== 'undefined') {
        const newLogger = await import('./frontendLogger');
        return newLogger.frontendLogger as LoggerFactory;
    }
    const newLogger = await import('./backendLogger');
    return newLogger.backendLogger as LoggerFactory;
}
