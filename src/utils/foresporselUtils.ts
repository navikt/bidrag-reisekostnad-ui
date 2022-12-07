import { ForesporselStatus } from "../enum/foresporsel-status";
import { IForesporsel, IPerson } from "../types/foresporsel";
import { calculateAge, is15YearsOldIn30Days } from "./dateUtils";
import { isAgeOver15YearsOld, isEveryoneOver15YearsOld } from "./personUtils";

export function mapToForesporselWithStatusAndPersonsAge(
  foresporsel: IForesporsel[]
): IForesporsel[] {
  const nyForesporsel = foresporsel.map((foresporsel) => ({
    ...foresporsel,
    barn: foresporsel.barn.map((person) => ({
      ...person,
      alder: calculateAge(person.fødselsdato),
      erOver15: isAgeOver15YearsOld(person.fødselsdato),
      er15Om30Dager: is15YearsOldIn30Days(person.fødselsdato),
    })),
    erAlleOver15: isEveryoneOver15YearsOld(foresporsel.barn as IPerson[]),
    status: getStatus(foresporsel),
  })) as unknown as IForesporsel[];

  return sortByStatus(nyForesporsel);
}

function getStatus(foresporsel: IForesporsel): ForesporselStatus {
  const { kreverSamtykke, samtykket, journalført, deaktivert } = foresporsel;

  if (journalført !== null) {
    return ForesporselStatus.UNDER_BEHANDLING;
  } else if (kreverSamtykke && samtykket === null && journalført === null) {
    return ForesporselStatus.VENTER_PAA_SAMTYKKE;
  } else if (deaktivert !== null) {
    return ForesporselStatus.TREKKET_TILBAKE;
  }

  return ForesporselStatus.VENTER_PAA_OVERFORING;
}

function sortByStatus(foresporsler: IForesporsel[]) {
  return foresporsler.sort((a, b) => b.status.toString().localeCompare(a.status.toString()));
}

export function findForesporselById(
  foresporsler: IForesporsel[],
  id: string
): IForesporsel | undefined {
  return foresporsler.find((foresporsel) => foresporsel.id === Number(id));
}

// - kreverSamtykke: false (pga at barnet var under 15 da den ble opprettet)
// - samtykket: null (motpart trenger ikke lenger å samtykke ettersom barnet har fylt 15)
// - journalført: ikke null (har blitt sendt inn til NAV etter at barnet ble 15 år)
export function isAutomaticSubmission(foresporsler: IForesporsel): boolean {
  const { kreverSamtykke, samtykket, journalført } = foresporsler;
  return !kreverSamtykke && samtykket === null && journalført !== null;
}
