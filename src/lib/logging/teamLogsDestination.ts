import { createConnection, type Socket } from 'node:net';
import type { DestinationStream } from 'pino';
import { backendLogger } from './backendLogger';

const diagnosticLogger = backendLogger();
const maxBufferedBytes = 1024 * 1024;
let socket: Socket | undefined;

export const teamLogsDestination: DestinationStream = {
    write(message: string) {
        if (!socket || socket.destroyed) {
            socket = createConnection({ host: 'team-logs.nais-system', port: 5170 });
            const connection = socket;
            connection.unref();
            connection.setTimeout(5000);
            connection.once('connect', () => connection.setTimeout(0));
            connection.once('timeout', () => {
                connection.destroy(new Error('Team Logs connection timed out'));
            });
            connection.on('error', (error: NodeJS.ErrnoException) => {
                diagnosticLogger.error(
                    { code: error.code },
                    'Team Logs delivery failed; sensitive logs may have been lost'
                );
                connection.destroy();
            });
        }

        if (socket.writableLength + Buffer.byteLength(message) > maxBufferedBytes) {
            diagnosticLogger.error('Team Logs buffer is full; sensitive log was dropped');
            return;
        }

        socket.write(message);
    },
};
