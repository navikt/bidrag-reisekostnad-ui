import { fireEvent, render } from "@testing-library/react";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { getAllBarn } from "../../utils/personUtils";
import OpprettForesporsel from "../../views/foresporsel/opprett-foresporsel/OpprettForesporsel";
import { MANN_UTEN_FORESPORSEL } from "../mock/brukerinformasjon";
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
  const router = createMockRouter({ route: "/foresporsel" });
  const personMedForesporsler = MANN_UTEN_FORESPORSEL as unknown as IBrukerinformasjon;
  const allBarn = getAllBarn(personMedForesporsler);

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
