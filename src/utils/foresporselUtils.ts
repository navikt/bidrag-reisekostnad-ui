import { IForesporsel, IPerson } from "../types/foresporsel";
import { calculateAge } from "./dateUtils";
import { isAgeOver15YearsOld, isEveryoneOver15YearsOld } from "./personUtils";

export function mapToForesporselWithPersonsAge(foresporsel: IForesporsel[]): IForesporsel[] {
  return foresporsel.map((foresporsel) => ({
    ...foresporsel,
    barn: foresporsel.barn.map((person) => ({
      ...person,
      alder: calculateAge(person.fødselsdato),
      erOver15: isAgeOver15YearsOld(person.fødselsdato),
    })),
    erAlleOver15: isEveryoneOver15YearsOld(foresporsel.barn as IPerson[]),
  })) as unknown as IForesporsel[];
}
