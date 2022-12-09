import { ForesporselStatus } from "../enum/foresporsel-status";
import { IActiveInactiveForesporsel, IForesporsel, IPerson } from "../types/foresporsel";
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
  } else if (kreverSamtykke && samtykket === null && journalført === null && deaktivert === null) {
    return ForesporselStatus.VENTER_PAA_SAMTYKKE;
  } else if (deaktivert !== null) {
    return ForesporselStatus.KANSELLERT;
  }

  return ForesporselStatus.UNDER_BEHANDLING;
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

function getActiveAndInactiveForesporsel(foresporsler: IForesporsel[]): IActiveInactiveForesporsel {
  return foresporsler.reduce(
    (acc: IActiveInactiveForesporsel, cur: IForesporsel) => {
      if (cur.status === ForesporselStatus.KANSELLERT) {
        return { ...acc, active: [...acc.active, cur] };
      } else {
        return { ...acc, inactive: [...acc.inactive, cur] };
      }
    },
    { inactive: [], active: [] }
  );
}

export function removeForesporselWithDuplicatedBarn(foresporsler: IForesporsel[]): IForesporsel[] {
  const { inactive, active } = getActiveAndInactiveForesporsel(foresporsler);

  const inactiveIdents = inactive.flatMap((i) => i.barn).map((i) => i.ident);

  const result = [...active] as IForesporsel[];

  active.forEach((a, index) => {
    a.barn.forEach((b) => {
      if (inactiveIdents.includes(b.ident)) {
        result.splice(index);
      }
    });
  });

  return result;
}
