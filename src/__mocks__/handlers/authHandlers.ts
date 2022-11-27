import { rest } from "msw";
import { ISessionData } from "../../pages/api/auth/session";

export const authHandlers = [
  rest.get("/api/auth/session", (_req, res, ctx) => {
    return res(
      ctx.json<ISessionData>({
        expiresIn: 100000,
      })
    );
  }),
];
