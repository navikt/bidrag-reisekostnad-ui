/* eslint-disable @typescript-eslint/no-empty-function */
require("next");
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

jest.mock("uuid", () => {
  return {
    v4: () => "localhost-uuid",
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: any) => str,
      i18n: {
        language: "nb",
        changeLanguage: jest.fn().mockImplementation((lang: string) => console.log(lang)),
      },
    };
  },
}));
