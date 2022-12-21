import { NextRouter } from "next/router";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return { ...mockRouter, ...router };
}

export const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  forward: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
};
