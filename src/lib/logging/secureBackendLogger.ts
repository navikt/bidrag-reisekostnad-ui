import pino from 'pino';
import fs from "fs"

export const secureBackendLogger = (defaultConfig = {}): pino.Logger =>
    pino({
      ...defaultConfig,
      timestamp: false,
      formatters: {
        level: (label) => {
          return { level: label };
        },
        log: (object: any) => {
          if (object.err) {
            // backendlogger has an Error-instance, frontendlogger has already serialized it
            const err = object.err instanceof Error ? pino.stdSerializers.err(object.err) : object.err;
            object.stack_trace = err.stack;
            object.type = err.type;
            object.message = err.message;
            delete object.err;
          }
          object.isSecure = true
          return object;
        },
      },
    }, pino.multistream(getStreams()));



function getStreams(){

  if (process.env.NEXT_PUBLIC_IS_PRODUCTION == "true"){
    return [{ stream: fs.createWriteStream("/secure-logs/secure.log") }]
  }
  return [{ stream: process.stdout }]
}