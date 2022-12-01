import { ForesporselStatus } from "../enum/foresporsel-status";
import { IForesporsel, IPerson } from "../types/foresporsel";
import { calculateAge } from "./dateUtils";
import { isAgeOver15YearsOld, isEveryoneOver15YearsOld } from "./personUtils";

export function mapToForesporselWithStatusAndPersonsAge(
  foresporsel: IForesporsel[]
): IForesporsel[] {
  return foresporsel.map((foresporsel) => ({
    ...foresporsel,
    barn: foresporsel.barn.map((person) => ({
      ...person,
      alder: calculateAge(person.fødselsdato),
      erOver15: isAgeOver15YearsOld(person.fødselsdato),
    })),
    erAlleOver15: isEveryoneOver15YearsOld(foresporsel.barn as IPerson[]),
    status: getStatus(foresporsel),
  })) as unknown as IForesporsel[];
}

function getStatus(foresporsel: IForesporsel): ForesporselStatus {
  if (isEveryoneOver15YearsOld(foresporsel.barn as IPerson[])) {
    return ForesporselStatus.AUTOMATISK_SENDT_INN_TIL_NAV;
  } else if (foresporsel.samtykket) {
    return ForesporselStatus.SAMTYKKET;
  } else if (foresporsel.samtykket === null) {
    return ForesporselStatus.VENTER_PAA_SAMTYKKE;
  } else {
    // TODO
    return ForesporselStatus.TREKKET_TILBAKE;
  }
}

export function findForesporselById(
  foresporsler: IForesporsel[],
  id: string
): IForesporsel | undefined {
  return foresporsler.find((foresporsel) => foresporsel.idForespørsel === Number(id));
}
