import { screen } from "@testing-library/react";

export function getSpinner(): HTMLElement {
  return screen.getByTestId("spinner-testid");
}

export async function getCreateForesporselButton(): Promise<HTMLElement> {
  return (await screen.findByTestId("button.send_foresporsel_om_fordeling")) as HTMLElement;
}

export async function getAllBarnCheckbox(): Promise<HTMLInputElement[]> {
  return (await screen.findAllByTestId("checkboxgroup.opprett.barn")) as HTMLInputElement[];
}

export async function getConfirmationPanelInOpprettForesporsel(): Promise<HTMLInputElement> {
  return (await screen.findByTestId("confirmationpanel.opprett.maa.samtykke")) as HTMLInputElement;
}

export async function getSendInnButton(): Promise<HTMLElement> {
  return (await screen.findByTestId("button.send_inn")) as HTMLElement;
}

export async function getOverviewCard(): Promise<HTMLAnchorElement[]> {
  return (await screen.findAllByTestId("overviewcard")) as HTMLAnchorElement[];
}
// export async function getOverviewCard(): Promise<HTMLAnchorElement[]> {
//     const link = screen.getByRole('link', { name: "/forsporsel" });

//   return (await screen.getByRole("a") findAllByTestId("overviewcard")) as HTMLAnchorElement[];
// }
