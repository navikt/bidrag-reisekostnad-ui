import pino from 'pino';
import { mapError } from './types';
import { getLoggerContext } from './als';

export const backendLogger = (defaultConfig = {}): pino.Logger =>
    pino({
        ...defaultConfig,
        timestamp: false,
        formatters: {
            level: (label) => {
                return { level: label };
            },
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            log: (object: any) => {
                mapError(object);
                return object;
            },
        },
    }).child(getLoggerContext());
