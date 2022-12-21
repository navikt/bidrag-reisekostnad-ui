/* eslint-disable @typescript-eslint/no-empty-function */
require("next");
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { IBrukerinformasjon } from "./src/types/foresporsel";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => {
        if (str.includes("accordion")) {
          return [
            {
              header: "",
              content: "",
            },
          ];
        } else {
          return str;
        }
      },
      i18n: {
        language: "nb",
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

export const server = setupServer(
  rest.get("/api/brukerinformasjon", async (_req, res, ctx) => {
    return res(ctx.delay(100), ctx.json<IBrukerinformasjon | undefined>(undefined));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());
