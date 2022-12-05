import pino from "pino";
import fs from "fs";
import {mapError} from "./types";
import {getCorrelationIdFromContext} from "./als";
import {getTransactionIdFromContext} from "./als";

export const secureBackendLogger = (defaultConfig = {}): pino.Logger =>
  pino(
    {
      ...defaultConfig,
      timestamp: false,
      formatters: {
        level: (label) => {
          return { level: label };
        },
        log: (object: any) => {
          mapError(object);
          object.isSecure = true;
          return object;
        },
      },
    },
    pino.multistream(getStreams())
  ).child({
    correlationId: getCorrelationIdFromContext(),
    transactionId: getTransactionIdFromContext(),
  });

function getStreams() {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION == "true") {
    return [{ stream: fs.createWriteStream("/secure-logs/secure.log") }];
  }
  return [{ stream: process.stdout }];
}
