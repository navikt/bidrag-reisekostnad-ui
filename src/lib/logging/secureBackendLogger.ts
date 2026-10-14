import pino, { type LoggerOptions } from 'pino';
import { mapError } from './types';
import { getLoggerContext } from './als';
import { teamLogsDestination } from './teamLogsDestination';

export const secureBackendLogger = (defaultConfig?: LoggerOptions): pino.Logger =>
    pino(
        {
            ...defaultConfig,
            timestamp: false,
            messageKey: 'message',
            mixin: getLoggerContext,
            base: process.env.NAIS_POD_NAME
                ? {
                      google_cloud_project: requiredMetadata('GOOGLE_CLOUD_PROJECT'),
                      nais_namespace_name: requiredMetadata('NAIS_NAMESPACE'),
                      nais_pod_name: requiredMetadata('NAIS_POD_NAME'),
                      nais_container_name: requiredMetadata('NAIS_APP_NAME'),
                  }
                : undefined,
            formatters: {
                level: (label) => {
                    return { level: label.toUpperCase() };
                },
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                log: (object: any) => {
                    mapError(object);
                    object.isSecure = true;
                    return object;
                },
            },
        },
        process.env.NAIS_POD_NAME ? teamLogsDestination : process.stdout
    );

function requiredMetadata(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required Team Logs environment variable: ${name}`);
    }
    return value;
}
