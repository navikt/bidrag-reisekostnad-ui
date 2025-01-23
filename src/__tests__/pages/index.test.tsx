import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../../pages";
import {
  KVINNE_MED_FORESPORSEL_SOM_MOTPART_OG_HOVEDPART,
  KVINNE_UTEN_BARN,
  MANN_UTEN_FORESPORSEL,
} from "../mock/brukerinformasjon";
import { fetchBrukerinformasjon } from "../utils/api.utils";
import { getCreateForesporselButton, getOverviewCardById, getSpinner } from "../utils/index.utils";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { createMockRouter } from "../utils/router.utils";
import { MockContext } from "../mock/MockContext";
import { beforeEach, describe, expect, it } from "vitest";

describe("No data", () => {
  it("should render spinner when there is no data", () => {
    render(
      <MockContext>
        <Home />
      </MockContext>
    );

    const spinner = getSpinner();
    expect(spinner).toBeInTheDocument();
  });
});

describe("Person without barn", () => {
  it("should render alert when person has no barn", async () => {
    fetchBrukerinformasjon(KVINNE_UTEN_BARN);
    render(
      <MockContext>
        <Home />
      </MockContext>
    );

    await waitForElementToBeRemoved(() => getSpinner());
    const alert = await screen.findByTestId("alert.funnet_ingen_barn");

    expect(alert).toBeInTheDocument();
  });
});

describe("Person without foresporsel", () => {
  beforeEach(async () => {
    fetchBrukerinformasjon(MANN_UTEN_FORESPORSEL);
    render(
      <MockContext>
        <Home />
      </MockContext>
    );

    await waitForElementToBeRemoved(() => getSpinner());
  });

  it("should render alert", async () => {
    const alert = await screen.findByTestId("alert.ingen_saker");
    const button = await getCreateForesporselButton();
    expect(button).toBeInTheDocument();
    expect((button as HTMLAnchorElement).href).toContain("/foresporsel");
    expect(alert).toBeInTheDocument();
  });
});

describe("Person with existing foresporsler", () => {
  const personMedForesporsler =
    KVINNE_MED_FORESPORSEL_SOM_MOTPART_OG_HOVEDPART as unknown as IBrukerinformasjon;
  const numberOfForesporsler = personMedForesporsler.forespørslerSomHovedpart.length;
  const FORESPORSEL_ID = "1000127";
  const router = createMockRouter({ query: { id: FORESPORSEL_ID } });

  beforeEach(async () => {
    fetchBrukerinformasjon(personMedForesporsler);
    render(
      <MockContext router={router}>
        <Home />
      </MockContext>
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
      scroll: true,
      shallow: undefined,
    });
  });

  it("should render both sendt inn and motatt foresporsler", async () => {
      const sendtInnForesporsel = await screen.findByText("title.sendt_inn_foresporsler");
      expect(sendtInnForesporsel).toBeInTheDocument();
      const motattForesporsel = await screen.findByText("title.motatt_foresporsler");
      expect(motattForesporsel).toBeInTheDocument();
  });

  it("should redirect to create new foresporsel page", async () => {
    const EXPECTED_PATH = "/foresporsel";

    const button = await getCreateForesporselButton();
    fireEvent.click(button);

    expect(router.push).toHaveBeenCalledWith(EXPECTED_PATH, EXPECTED_PATH, {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
  });
});
