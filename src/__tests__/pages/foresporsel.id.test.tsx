import { screen, render, waitFor } from "@testing-library/react";
import { waitForElementToBeRemoved } from "@testing-library/react";
import ForesporselId from "../../pages/foresporsel/[id]";
import { IBrukerinformasjon } from "../../types/foresporsel";
import {
  KVINNE_MED_FORESPORSEL,
  KVINNE_MED_FORESPORSEL_SOM_MOTPART_OG_HOVEDPART,
} from "../mock/brukerinformasjon";
import { MockContext } from "../mock/MockContext";
import { fetchBrukerinformation } from "../utils/api.utils";
import { getSpinner } from "../utils/index.utils";
import { createMockRouter } from "../utils/router.utils";

describe("Kansellert foresporsel gjort av hovedpart", () => {
  it("should render kvittering for kansellert foresporsel", async () => {
    const personMedForesporsler =
      KVINNE_MED_FORESPORSEL_SOM_MOTPART_OG_HOVEDPART as unknown as IBrukerinformasjon;
    // foresporsel har status Kansellert og deaktivertAv hovedpart
    const foresporsel = personMedForesporsler.forespørslerSomHovedpart[0];
    const FORESPORSEL_ID = foresporsel.id as unknown as string;
    const router = createMockRouter({ query: { id: FORESPORSEL_ID } });
    fetchBrukerinformation(personMedForesporsler);

    render(
      <MockContext router={router}>
        <ForesporselId />
      </MockContext>
    );
    await waitForElementToBeRemoved(() => getSpinner());

    await waitFor(() => {
      const title = screen.queryByText("kanseller.hovedpart.title");
      expect(title).toBeInTheDocument();
    });
  });
});

describe("Personen er hovedpart: Vente paa samtykke foresporsel", () => {
  const personMedForesporsler = KVINNE_MED_FORESPORSEL as unknown as IBrukerinformasjon;
  // foresporsel har status Vent paa samtykke
  const foresporsel = personMedForesporsler.forespørslerSomHovedpart.filter(
    (i) => i.deaktivertAv === null
  )[0];
  const router = createMockRouter({ query: { id: foresporsel.id as unknown as string } });

  beforeEach(async () => {
    fetchBrukerinformation(personMedForesporsler);
    render(
      <MockContext router={router}>
        <ForesporselId />
      </MockContext>
    );
    await waitForElementToBeRemoved(() => getSpinner());
  });

  it("should render kvittering with trekke tilbake button", async () => {
    await waitFor(() => {
      const trekkTilbakeButton = screen.queryByText("button.trekk_foresporselen");
      expect(trekkTilbakeButton).toBeInTheDocument();
    });
  });
});
