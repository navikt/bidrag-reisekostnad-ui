import { IPerson } from "../types/foresporsel";
import { calculateAge } from "./dateUtils";

export function getPersonOver15YearsOld(person: IPerson[]): IPerson[] {
  return person.filter((i) => calculateAge(i.fødselsdato) >= 15);
}
