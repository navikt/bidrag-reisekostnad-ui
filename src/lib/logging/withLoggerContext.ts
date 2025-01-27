import { NextApiHandler } from "next";
import { executionAsyncId, triggerAsyncId } from "node:async_hooks";
import { CORRELATION_ID_COOKIE_NAME } from "./types";
import { v4 as uuidV4 } from "uuid";
import { IRequestContext } from "./als";
import { getAsyncStorage } from "./als";
import { initLoggerWithContext } from "./logger";
import { initSecureLoggerWithContext } from "./secureLogger";

export function withLoggerContext(handler: NextApiHandler): NextApiHandler {
  return async function errorHandler(req, res) {
    const eid = executionAsyncId();
    const tid = triggerAsyncId();
    const correlationId = req.cookies[CORRELATION_ID_COOKIE_NAME] ?? uuidV4();
    const store: IRequestContext = { correlationId, eid, tid };
    return new Promise((resolve) =>
      getAsyncStorage().run(store, async () => {
        await initLoggerWithContext();
        await initSecureLoggerWithContext();
        resolve(handler(req, res));
      }),
    );
  };
}
