import { rest } from "msw";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { BRUKER_INFORMASJON_1 } from "../testdata/brukerinformasjon";

export const brukerinfoHandlers = [
  rest.get("/api/brukerinformasjon", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.delay(100), ctx.json<IBrukerinformasjon>(BRUKER_INFORMASJON_1));
  }),
];
