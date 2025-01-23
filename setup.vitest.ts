import '@testing-library/jest-dom/vitest';

import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { server } from "./src/__mocks__/server";

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Clean up after the tests are finished
afterAll(() => server.close());

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());

vi.mock("next-i18next", () => ({
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