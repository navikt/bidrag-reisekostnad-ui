import {NextApiHandler} from "next";
import {getValidSession} from "./session";
import getPropertyDescriptorForReqSession from "../../types/next";

export function withSessionApiRoute(handler: NextApiHandler): NextApiHandler {
  return async function nextApiHandlerWrappedWithSession(req, res) {
    const session = await getValidSession(req);
    if (!session) return res.status(401).end();

    Object.defineProperty(
        req,
        "session",
        getPropertyDescriptorForReqSession(session),
    );
    return handler(req, res)
  }

}