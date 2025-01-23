import { NextRouter } from "next/router";
import { vi } from 'vitest';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return { ...mockRouter, ...router };
}

export const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  back: vi.fn(),
  beforePopState: vi.fn(),
  prefetch: vi.fn(),
  forward: vi.fn(),
  push: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
};
