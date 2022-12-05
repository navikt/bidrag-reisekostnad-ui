import { SessionStorage } from "@navikt/bidrag-ui-common";
import { v4 as uuidV4 } from "uuid";
import pino from "pino";

export const CORRELATION_ID_STORAGE_NAME = "correlationId";
export const CORRELATION_ID_COOKIE_NAME = CORRELATION_ID_STORAGE_NAME;

export function getCorrelationId() {
  let correlationId = SessionStorage.get(CORRELATION_ID_STORAGE_NAME);
  if (!correlationId) {
    correlationId = `bidrag-reisekostnad-ui/${uuidV4()}`;
    SessionStorage.set(CORRELATION_ID_STORAGE_NAME, correlationId);
  }
  return correlationId;
}

export function generateAndStoreCorrelationIdAsCookie() {
  const corrId = getCorrelationId();
  document.cookie = `${CORRELATION_ID_COOKIE_NAME}=${corrId}`;
}
export function errorifyMessages(logEvent: pino.LogEvent): pino.LogEvent {
  logEvent.messages = logEvent.messages.map((message) => {
    if (typeof message === "object" && "stack" in message) {
      return {
        err: {
          type: message.type,
          stack: message.stack,
          message: message.msg ?? message.message,
        },
      };
    }
    return message;
  });

  return logEvent;
}

export function mapError(object: any) {
  if (object.err) {
    // backendlogger has an Error-instance, frontendlogger has already serialized it
    const err = object.err instanceof Error ? pino.stdSerializers.err(object.err) : object.err;
    object.stack_trace = err.stack;
    object.type = err.type;
    object.message = err.message;
    delete object.err;
  }
}
