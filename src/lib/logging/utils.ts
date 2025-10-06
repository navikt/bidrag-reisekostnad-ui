import type pino from 'pino';

export type LevelLabel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
type IncomingLevel = { label: string; value: number };

export function toLevelLabel(level: IncomingLevel): LevelLabel | null {
    if (level && typeof level === 'object') {
        const levelLabel = level.label;
        if (
            levelLabel === 'trace' ||
            levelLabel === 'debug' ||
            levelLabel === 'info' ||
            levelLabel === 'warn' ||
            levelLabel === 'error' ||
            levelLabel === 'fatal'
        ) {
            return levelLabel;
        }

        // Fallback. Hvis levelkode tilgjengelig
        if (typeof level === 'number') {
            switch (level) {
                case 10:
                    return 'trace';
                case 20:
                    return 'debug';
                case 30:
                    return 'info';
                case 40:
                    return 'warn';
                case 50:
                    return 'error';
                case 60:
                    return 'fatal';
                default:
                    return null;
            }
        }
    }

    return null;
}

export function isLogEvent(body: unknown): body is pino.LogEvent {
    if (!body || typeof body !== 'object') return false;
    const anyBody = body as Record<string, unknown>;
    return (
        typeof anyBody.level !== 'undefined' &&
        typeof anyBody.ts === 'number' &&
        Array.isArray(anyBody.messages)
    );
}
