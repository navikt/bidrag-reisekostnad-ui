import { rest } from "msw";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { BRUKER_INFORMASJON_1 } from "../testdata/brukerinformasjon";

export const brukerinfoHandlers = [
  rest.get("/api/brukerinformasjon", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.json<IBrukerinformasjon>(BRUKER_INFORMASJON_1));
  }),
];

export const opprettNyForesporselHandlers = [
  rest.post("/api/foresporsel/ny", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.set("Content-Type", "application/json"), ctx.status(200));
  }),
];
