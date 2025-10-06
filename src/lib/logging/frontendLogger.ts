import pino, { type Logger, type LoggerOptions, type LogEvent } from 'pino';
import { getCorrelationId, errorifyMessages } from './types';

export const frontendLogger = (defaultConfig?: LoggerOptions): Logger => {
    const correlationId = getCorrelationId();

    const options = {
        browser: {
            asObject: true,
            transmit: {
                send: async (_level: number | string, logEvent: LogEvent) => {
                    try {
                        // Normaliser meldinger/feil før sending
                        const normalized = errorifyMessages(logEvent);
                        await fetch('/api/log', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                'x-correlation-id': String(correlationId),
                            },
                            body: JSON.stringify(normalized),
                            keepalive: true,
                        });
                    } catch (e) {
                        console.warn('Unable to log to backend', e, logEvent);
                    }
                },
            },
        },
        ...defaultConfig,
    } satisfies LoggerOptions;

    return pino(options).child({ correlationId });
};
