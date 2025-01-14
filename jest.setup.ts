/* eslint-disable @typescript-eslint/no-empty-function */
import { BRUKER_INFORMASJON_1 } from "./src/__mocks__/testdata/brukerinformasjon";

require("next");
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { setupServer } from "msw/node";
import { http, HttpResponse, delay } from "msw";
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
  http.get("/api/brukerinformasjon", async () => {
    await delay(100);
    return HttpResponse.json<IBrukerinformasjon | undefined>(undefined);
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());
