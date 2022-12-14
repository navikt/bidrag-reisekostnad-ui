import { rest } from "msw";

export const opprettNyForesporselHandlers = [
  rest.post("/api/foresporsel/ny", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.delay(100), ctx.set("Content-Type", "application/json"), ctx.status(200));
  }),
];

export const trekkeForesporselHandlers = [
  rest.put("/api/foresporsel/trekke", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.delay(100), ctx.set("Content-Type", "application/json"), ctx.status(201));
  }),
];

export const samtykkeForesporselHandlers = [
  rest.put("/api/foresporsel/samtykke", (_req, res, ctx) => {
    // @ts-ignore
    return res(ctx.delay(100), ctx.set("Content-Type", "application/json"), ctx.status(201));
  }),
];
