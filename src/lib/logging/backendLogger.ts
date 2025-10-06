import pino, { type Logger, type LoggerOptions } from 'pino';
import { mapError } from './types';
import { getLoggerContext } from './als';

export const backendLogger = (defaultConfig?: LoggerOptions): Logger => {
    const baseOptions = {
        timestamp: false,
        formatters: {
            level: (label: string) => ({ level: label }),
            log: (object: Record<string, unknown>) => {
                mapError(object as unknown);
                return object;
            },
        },
    } satisfies LoggerOptions;

    const options: LoggerOptions = {
        ...baseOptions,
        ...defaultConfig,
    };

    const ctx = getLoggerContext() as Record<string, unknown>;
    return pino(options).child(ctx);
};
