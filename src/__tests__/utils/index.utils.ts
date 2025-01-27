import { screen } from '@testing-library/react';

export function getSpinner(): HTMLElement {
    return screen.getByTestId('spinner-testid');
}

export async function getCreateForesporselButton(): Promise<HTMLElement> {
    return (await screen.findByTestId('button.send_foresporsel_om_fordeling')) as HTMLElement;
}

export async function getOverviewCardById(id: string): Promise<HTMLAnchorElement> {
    return (await screen.findByTestId(`overviewcard-${id}`)) as HTMLAnchorElement;
}

export function getSelectBarnCheckboxById(id: string): HTMLInputElement {
    return screen.getByTestId(`checkboxgroup.opprett.barn-${id}`) as HTMLInputElement;
}

export function getSelectBarnCheckboxError(): HTMLElement {
    return screen.queryByText('errors.velg_barn') as HTMLElement;
}

export function getSendInnButton(): HTMLElement {
    return screen.getByTestId('button.send_inn') as HTMLElement;
}

export function getHarLestOgForstaatCheckbox(): HTMLInputElement {
    return screen.getByTestId('confirmationpanel.opprett.maa.samtykke') as HTMLInputElement;
}

export function getHarLestOgForstaatError(): HTMLElement {
    return screen.queryByText('errors.maa_samtykke') as HTMLElement;
}
