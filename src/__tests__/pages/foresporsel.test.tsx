import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { getAllBarn } from "../../utils/personUtils";
import OpprettForesporsel from "../../views/foresporsel/opprett-foresporsel/OpprettForesporsel";
import { MANN_MED_ETT_BARN_OG_FORESPORSEL, MANN_UTEN_FORESPORSEL } from "../mock/brukerinformasjon";
import { MockContext } from "../mock/MockContext";
import {
  getHarLestOgForstaatCheckbox,
  getHarLestOgForstaatError,
  getSelectBarnCheckboxById,
  getSelectBarnCheckboxError,
  getSendInnButton,
} from "../utils/index.utils";
import { createMockRouter } from "../utils/router.utils";

const createForesporselFn = jest.fn();

jest.mock("../../hooks/useForesporselApi", () => ({
  useForesporselApi: jest.fn(() => ({
    createForesporsel: createForesporselFn,
  })),
}));

describe("Person with barn", () => {
  const personMedForesporsler = MANN_UTEN_FORESPORSEL as unknown as IBrukerinformasjon;
  const allBarn = getAllBarn(personMedForesporsler);
  const HOME_PATH = "/";
  const router = createMockRouter({ route: HOME_PATH });

  beforeEach(() => {
    render(
      <MockContext router={router} reisekostnadProviderInitialState={personMedForesporsler}>
        <OpprettForesporsel />
      </MockContext>
    );
  });

  it("should render one checkbox for person with one barn", () => {
    const barnCheckbox = allBarn.map((i) => getSelectBarnCheckboxById(i.ident));
    expect(barnCheckbox.length).toEqual(allBarn.length);
  });

  it("should render modal when clicken on Avbryt and Ja button should redirect to home", () => {
    const avbrytButton = screen.queryByText("button.avbryt") as HTMLElement;
    fireEvent.click(avbrytButton);

    const modalHeader = screen.queryByText("modal.header") as HTMLElement;
    expect(modalHeader).toBeInTheDocument();

    const jaButton = screen.queryByText("button.ja") as HTMLElement;
    fireEvent.click(jaButton);

    expect(router.push).toHaveBeenCalledWith(HOME_PATH);
  });

  it("should render error message when sumbit without selected barn", () => {
    const barnCheckbox = allBarn.map((i) => getSelectBarnCheckboxById(i.ident));
    barnCheckbox.forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toEqual(false);
    });

    const sendInnButton = getSendInnButton();
    fireEvent.click(sendInnButton);

    const error = getSelectBarnCheckboxError();
    expect(error).toBeInTheDocument();
  });

  it("error message should disappear when selected barn", () => {
    const barnCheckbox = allBarn.map((i) => getSelectBarnCheckboxById(i.ident));
    barnCheckbox.forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toEqual(false);
    });

    const sendInnButton = getSendInnButton();
    fireEvent.click(sendInnButton);

    const error = getSelectBarnCheckboxError();
    expect(error).toBeInTheDocument();

    barnCheckbox.forEach((checkbox) => {
      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(true);
    });

    expect(error).not.toBeInTheDocument();
  });

  it("should render error message when sumbit without checked confirmationpanel", () => {
    const barnCheckbox = allBarn.map((i) => getSelectBarnCheckboxById(i.ident));
    barnCheckbox.forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toEqual(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(true);
    });

    const harLestOgForstaat = getHarLestOgForstaatCheckbox();
    expect(harLestOgForstaat).toBeInTheDocument();
    expect(harLestOgForstaat.checked).toEqual(false);

    const sendInnButton = getSendInnButton();
    fireEvent.click(sendInnButton);

    const error = getHarLestOgForstaatError();
    expect(error).toBeInTheDocument();
  });

  it("should be able to submit after selected barn and checked confirmationpanel", () => {
    const barnCheckbox = allBarn.map((i) => getSelectBarnCheckboxById(i.ident));
    // select every barn
    barnCheckbox.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    // check confirmation panel
    const harLestOgForstaat = getHarLestOgForstaatCheckbox();
    fireEvent.click(harLestOgForstaat);

    // click on submit button
    const sendInnButton = getSendInnButton();
    fireEvent.click(sendInnButton);

    expect(createForesporselFn).toBeCalledTimes(1);
    expect(createForesporselFn).toHaveBeenCalledWith(allBarn.map((i) => i.ident));
  });
});

describe("Person with barn in existing foresporsel", () => {
  it("should render alert because there is no more barn to create foresporsel for", async () => {
    const personMedForesporsler = MANN_MED_ETT_BARN_OG_FORESPORSEL as unknown as IBrukerinformasjon;
    render(
      <MockContext reisekostnadProviderInitialState={personMedForesporsler}>
        <OpprettForesporsel />
      </MockContext>
    );

    await waitFor(() => {
      const alert = screen.queryByText("alert.barnet_har_foresporsel") as HTMLElement;
      expect(alert).toBeInTheDocument();
    });
  });
});

describe("Person with barn over 15 years old", () => {
  it("should render alert because there is at least one barn over 15 years old", async () => {
    const personMedForesporsler = MANN_UTEN_FORESPORSEL as unknown as IBrukerinformasjon;
    render(
      <MockContext reisekostnadProviderInitialState={personMedForesporsler}>
        <OpprettForesporsel />
      </MockContext>
    );

    await waitFor(() => {
      const alert = screen.queryByText("alert.barn_over_15") as HTMLElement;
      expect(alert).toBeInTheDocument();
    });
  });
});
