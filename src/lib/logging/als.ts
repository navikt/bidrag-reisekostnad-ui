import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidV4 } from 'uuid';

export interface IRequestContext {
    correlationId: string;
    eid?: number;
    tid?: number;
}

const asyncStorage = new AsyncLocalStorage<IRequestContext>();

export function getAsyncStorage() {
    return asyncStorage;
}

export function getCorrelationIdFromContext() {
    const store = asyncStorage.getStore();
    return store?.correlationId ?? uuidV4();
}

export function getTransactionIdFromContext() {
    const store = asyncStorage.getStore();
    const transactionId = store?.eid ?? -1;
    const triggerId = store?.tid ?? -1;
    return `tx_${transactionId}_${triggerId}`;
}

export function getLoggerContext() {
    const store = asyncStorage.getStore();
    if (!store) return {};

    return {
        correlationId: store.correlationId,
        transactionId: getTransactionIdFromContext(),
    };
}
