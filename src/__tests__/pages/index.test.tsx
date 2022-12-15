import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { SWRConfig } from "swr";
import { ReisekostnadProvider } from "../../context/reisekostnadContext";
import Home from "../../pages";
import { fetcher } from "../../utils/apiUtils";
import {
  KVINNE_MED_FORESPORSEL,
  KVINNE_UTEN_BARN,
  MANN_UTEN_FORESPORSEL,
} from "../mockdata/brukerinformasjon";
import { fetchBrukerinformation } from "../utils/api.utils";
import { getCreateForesporselButton, getOverviewCardById, getSpinner } from "../utils/index.utils";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { createMockRouter } from "../utils/router.utils";

describe("No data", () => {
  it("should render spinner when there is no data", () => {
    render(mockAppContext());

    const spinner = getSpinner();
    expect(spinner).toBeInTheDocument();
  });
});

describe("Person without barn", () => {
  it("should render alert when person has no barn", async () => {
    fetchBrukerinformation(KVINNE_UTEN_BARN);
    render(mockAppContext());

    await waitForElementToBeRemoved(() => getSpinner());
    const alert = await screen.findByTestId("alert.funnet_ingen_barn");

    expect(alert).toBeInTheDocument();
  });
});

describe("Person without foresporsel", () => {
  beforeEach(async () => {
    fetchBrukerinformation(MANN_UTEN_FORESPORSEL);
    render(mockAppContext());

    await waitForElementToBeRemoved(() => getSpinner());
  });

  it("should render alert", async () => {
    const alert = await screen.findByTestId("alert.ingen_saker");

    expect(alert).toBeInTheDocument();
  });

  it("should render button for creating foresporsel", async () => {
    const button = await getCreateForesporselButton();

    expect(button).toBeInTheDocument();
    expect((button as HTMLAnchorElement).href).toContain("/foresporsel");
  });
});

describe("Person with existing foresporsler", () => {
  const personMedForesporsler = KVINNE_MED_FORESPORSEL as unknown as IBrukerinformasjon;
  const numberOfForesporsler = personMedForesporsler.forespørslerSomHovedpart.length;
  const FORESPORSEL_ID = "1000115";
  const router = createMockRouter({ query: { id: FORESPORSEL_ID } });

  beforeEach(async () => {
    fetchBrukerinformation(personMedForesporsler);
    render(
      <RouterContext.Provider value={createMockRouter(router)}>
        {mockAppContext()}
      </RouterContext.Provider>
    );
    await waitForElementToBeRemoved(() => getSpinner());
  });

  it("should render overviewcard of foresporsel", async () => {
    const allCard = personMedForesporsler.forespørslerSomHovedpart.map(async (i) => {
      return await getOverviewCardById(i.id as unknown as string);
    });

    expect(allCard.length).toEqual(numberOfForesporsler);
  });

  it("should redirect to id page when clicked on overviewcard", async () => {
    const EXPECTED_PATH = `/foresporsel/${FORESPORSEL_ID}`;

    const overviewCard = await getOverviewCardById(FORESPORSEL_ID);
    fireEvent.click(overviewCard);

    expect(router.push).toHaveBeenCalledWith(EXPECTED_PATH, EXPECTED_PATH, {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
  });

  it("should redirect to create new foresporsel page", async () => {
    const EXPECTED_PATH = "/foresporsel";

    const button = await getCreateForesporselButton();
    fireEvent.click(button);

    expect(router.push).toHaveBeenCalledWith(EXPECTED_PATH, EXPECTED_PATH, {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
  });
});

function mockAppContext(): JSX.Element {
  return (
    <ReisekostnadProvider>
      <SWRConfig value={{ fetcher, dedupingInterval: 0, provider: () => new Map() }}>
        <Home />
      </SWRConfig>
    </ReisekostnadProvider>
  );
}
