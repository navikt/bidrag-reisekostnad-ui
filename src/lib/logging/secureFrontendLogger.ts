import pino from 'pino';
import { getCorrelationId } from './types';
import { errorifyMessages } from './types';

export const secureFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            write: () => {},
            transmit: {
                send: async (_, logEvent) => {
                    try {
                        // If your app uses a basePath, you'll need to add it to the path here
                        const response = await fetch(`/api/log/secure`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                'x-correlation-id': getCorrelationId(),
                            },
                            body: JSON.stringify(errorifyMessages(logEvent)),
                            keepalive: true,
                        });
                        if (!response.ok) {
                            throw new Error('Secure logging request failed');
                        }
                    } catch {
                        console.warn('Unable to send sensitive log to backend');
                    }
                },
            },
        },
    });
