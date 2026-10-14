import { EventEmitter } from 'node:events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
    createConnection: vi.fn(),
    error: vi.fn(),
}));

vi.mock('node:net', () => ({
    default: { createConnection: mocks.createConnection },
    createConnection: mocks.createConnection,
}));
vi.mock('../../lib/logging/backendLogger', () => ({
    backendLogger: () => ({ error: mocks.error }),
}));

function createSocket() {
    return Object.assign(new EventEmitter(), {
        destroyed: false,
        writableLength: 0,
        unref: vi.fn(),
        setTimeout: vi.fn(),
        write: vi.fn(),
        destroy: vi.fn(function (this: { destroyed: boolean }) {
            this.destroyed = true;
        }),
    });
}

beforeEach(() => {
    vi.resetModules();
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Team Logs destination', () => {
    it('shares one connection and sends newline-delimited JSON unchanged', async () => {
        const socket = createSocket();
        mocks.createConnection.mockReturnValue(socket);
        const { teamLogsDestination } = await import('../../lib/logging/teamLogsDestination');

        teamLogsDestination.write('{"message":"first"}\n');
        teamLogsDestination.write('{"message":"second"}\n');
        socket.emit('connect');

        expect(mocks.createConnection).toHaveBeenCalledExactlyOnceWith({
            host: 'team-logs.nais-system',
            port: 5170,
        });
        expect(socket.write.mock.calls).toEqual([
            ['{"message":"first"}\n'],
            ['{"message":"second"}\n'],
        ]);
        expect(socket.setTimeout).toHaveBeenLastCalledWith(0);
    });

    it('reports delivery failure without exposing the payload and reconnects on the next log', async () => {
        const first = createSocket();
        const second = createSocket();
        mocks.createConnection.mockReturnValueOnce(first).mockReturnValueOnce(second);
        const { teamLogsDestination } = await import('../../lib/logging/teamLogsDestination');

        teamLogsDestination.write('sensitive payload\n');
        first.emit('error', Object.assign(new Error('sensitive error'), { code: 'ECONNRESET' }));
        teamLogsDestination.write('next payload\n');

        expect(mocks.error).toHaveBeenCalledExactlyOnceWith(
            { code: 'ECONNRESET' },
            'Team Logs delivery failed; sensitive logs may have been lost'
        );
        expect(first.destroy).toHaveBeenCalled();
        expect(mocks.createConnection).toHaveBeenCalledTimes(2);
        expect(second.write).toHaveBeenCalledWith('next payload\n');
    });

    it('bounds buffering and reports dropped records without their contents', async () => {
        const socket = createSocket();
        socket.writableLength = 1024 * 1024;
        mocks.createConnection.mockReturnValue(socket);
        const { teamLogsDestination } = await import('../../lib/logging/teamLogsDestination');

        teamLogsDestination.write('sensitive payload\n');

        expect(socket.write).not.toHaveBeenCalled();
        expect(mocks.error).toHaveBeenCalledExactlyOnceWith(
            'Team Logs buffer is full; sensitive log was dropped'
        );
    });

    it('destroys a connection that times out', async () => {
        const socket = createSocket();
        mocks.createConnection.mockReturnValue(socket);
        const { teamLogsDestination } = await import('../../lib/logging/teamLogsDestination');

        teamLogsDestination.write('sensitive payload\n');
        socket.emit('timeout');

        expect(socket.destroy).toHaveBeenCalledWith(new Error('Team Logs connection timed out'));
    });
});
