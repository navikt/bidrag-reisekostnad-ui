import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { SWRConfig } from "swr";
import { ReisekostnadProvider } from "../../context/reisekostnadContext";
import Home from "../../pages";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { fetcher } from "../../utils/apiUtils";
import { KVINNE_UTEN_BARN } from "../mockdata/brukerinformasjon";

const server = setupServer(
  rest.get("/api/brukerinformasjon", async (_req, res, ctx) => {
    return res(ctx.delay(100), ctx.json<IBrukerinformasjon | undefined>(undefined));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());

describe("No data", () => {
  it("should render spinner when there is no data", () => {
    renderApp();
    const spinner = screen.getByTestId("spinner-testid");

    expect(spinner).toBeInTheDocument();
  });
});

describe("Person without barn", () => {
  beforeEach(async () => {
    server.use(
      rest.get("/api/brukerinformasjon", async (_req, res, ctx) => {
        return res(
          ctx.delay(100),
          ctx.json<IBrukerinformasjon>(KVINNE_UTEN_BARN as unknown as IBrukerinformasjon)
        );
      })
    );

    renderApp();

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner-testid"));
  });

  it("should render alert when person has no barn", async () => {
    const alert = await screen.findByTestId("alert.funnet_ingen_barn");

    expect(alert).toBeInTheDocument();
  });
});

function renderApp() {
  render(
    <ReisekostnadProvider>
      <SWRConfig value={{ fetcher, dedupingInterval: 0, provider: () => new Map() }}>
        <Home />
      </SWRConfig>
    </ReisekostnadProvider>
  );
}
