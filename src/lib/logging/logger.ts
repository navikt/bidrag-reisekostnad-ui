// This logger is isomorphic, and can be imported from anywhere in the app

import type { Logger, LoggerOptions } from 'pino';

type LoggerFactory = (defaultConfig?: LoggerOptions) => Logger;

export let logger: Logger = (await getLogger())();

export async function initLoggerWithContext(defaultConfig?: LoggerOptions): Promise<void> {
    const makeLogger = await getLogger();
    logger = makeLogger(defaultConfig);
}

async function getLogger(): Promise<LoggerFactory> {
    if (typeof window !== 'undefined') {
        const newLogger = await import('./frontendLogger');
        return newLogger.frontendLogger as LoggerFactory;
    }
    const newLogger = await import('./backendLogger');
    return newLogger.backendLogger as LoggerFactory;
}
