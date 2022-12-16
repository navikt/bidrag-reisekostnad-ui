import { rest } from "msw";
import { server } from "../../../jest.setup";
import { IBrukerinformasjon } from "../../types/foresporsel";

export function fetchBrukerinformation(expectedResponse: unknown) {
  server.use(
    rest.get("/api/brukerinformasjon", (_req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json<IBrukerinformasjon>(expectedResponse as IBrukerinformasjon)
      );
    })
  );
}

export function postForesporsel() {
  server.use(
    rest.post("/api/foresporsel/ny", (_req, res, ctx) => {
      return res(ctx.delay(100), ctx.status(200));
    })
  );
}
