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
    // TODO: IMPLEMENTERE RIKTIG STATUS
    status: ForesporselStatus.VENTER_PAA_SAMTYKKE,
  })) as unknown as IForesporsel[];
}

export function findForesporselById(
  foresporsler: IForesporsel[],
  id: string
): IForesporsel | undefined {
  return foresporsler.find((foresporsel) => foresporsel.idForespørsel === Number(id));
}
