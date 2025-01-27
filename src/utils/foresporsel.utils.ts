/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForesporselStatus, getStatusKey } from '../enum/foresporsel-status';
import { IForesporsel } from '../types/foresporsel';
import { IPerson } from '../types/person';
import { calculateAge, is15YearsOldIn30Days } from './date.utils';
import { isAgeOver15YearsOld, isEveryoneOver15YearsOld } from './person.utils';

export function mapToForesporselWithStatusAndPersonsAge(
    foresporsler: IForesporsel[],
    erHovedpart: boolean
): IForesporsel[] {
    const nyForesporsel = foresporsler.map((foresporsel) => ({
        ...foresporsel,
        barn: foresporsel.barn.map((person) => ({
            ...person,
            alder: calculateAge(person.fødselsdato),
            erOver15: isAgeOver15YearsOld(person.fødselsdato),
            er15Om30Dager: is15YearsOldIn30Days(person.fødselsdato),
        })),
        erAlleOver15: isEveryoneOver15YearsOld(foresporsel.barn as IPerson[]),
        status: getStatus(foresporsel, erHovedpart),
        erHovedpart,
    })) as unknown as IForesporsel[];

    return sortByStatus(nyForesporsel);
}

function getStatus(foresporsel: IForesporsel, erHovedpart: boolean): ForesporselStatus {
    const { kreverSamtykke, samtykket, journalført, deaktivert } = foresporsel;

    if (journalført !== null) {
        return ForesporselStatus.UNDER_BEHANDLING;
    } else if (
        kreverSamtykke &&
        samtykket === null &&
        journalført === null &&
        deaktivert === null
    ) {
        return erHovedpart
            ? ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN
            : ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG;
    } else if (deaktivert !== null) {
        return ForesporselStatus.KANSELLERT;
    }

    return ForesporselStatus.UNDER_BEHANDLING;
}

function sortById(foresporsler?: IForesporsel[]): IForesporsel[] | undefined {
    return foresporsler ? foresporsler.sort((a, b) => b.id - a.id) : undefined;
}

function sortByStatus(foresporsler: IForesporsel[]): IForesporsel[] {
    const groupByStatus = foresporsler.reduce((group, foresporsel) => {
        const { status } = foresporsel;
        const key = getStatusKey(status);
        group[key] = group[key] ?? [];
        group[key]?.push(foresporsel);
        return group;
    }, {} as any);

    const mergeAllStatus = [
        sortById(groupByStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN),
        sortById(groupByStatus.VENTER_PAA_SAMTYKKE_FRA_DEG),
        sortById(groupByStatus.UNDER_BEHANDLING),
        sortById(groupByStatus.KANSELLERT),
    ]
        .flat()
        .filter((i) => i !== undefined);

    return mergeAllStatus as IForesporsel[];
}

export function findForesporselById(
    foresporsler: IForesporsel[],
    id: string
): IForesporsel | undefined {
    return foresporsler.find((foresporsel) => foresporsel.id === Number(id));
}

// - kreverSamtykke: true (pga at barnet var under 15 da den ble opprettet)
// - samtykket: null (motpart trenger ikke lenger å samtykke ettersom barnet har fylt 15)
// - journalført: ikke null (har blitt sendt inn til Nav etter at barnet ble 15 år)
export function isAutomaticSubmission(foresporsler: IForesporsel): boolean {
    const { kreverSamtykke, samtykket, journalført } = foresporsler;
    return kreverSamtykke && samtykket === null && journalført !== null;
}
