import pino from "pino";
import { getCorrelationId } from "./types";
import { errorifyMessages } from "./types";

export const frontendLogger = (): pino.Logger =>
  pino({
    browser: {
      transmit: {
        send: async (_, logEvent) => {
          try {
            // If your app uses a basePath, you'll need to add it to the path here
            await fetch(`/api/log`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-correlation-id": getCorrelationId(),
              },
              body: JSON.stringify(errorifyMessages(logEvent)),
            });
          } catch (e) {
            console.warn(e);
            console.warn("Unable to log to backend", logEvent);
          }
        },
      },
    },
  });
