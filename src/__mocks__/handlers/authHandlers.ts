import { http, HttpResponse, delay } from "msw";
import { ISessionData } from "../../pages/api/auth/session";

export const authHandlers = [
  http.get("/api/auth/session", async () => {
    await delay(100);
    return HttpResponse.json<ISessionData>({
      expiresIn: 100000,
    });
  }),
];
