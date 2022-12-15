import { screen } from "@testing-library/react";

export function getSpinner(): HTMLElement {
  return screen.getByTestId("spinner-testid");
}

export async function getCreateForesporselButton(): Promise<HTMLElement> {
  return (await screen.findByTestId("button.send_foresporsel_om_fordeling")) as HTMLElement;
}

export async function getOverviewCardById(id: string): Promise<HTMLAnchorElement> {
  return (await screen.findByTestId(`overviewcard-${id}`)) as HTMLAnchorElement;
}
