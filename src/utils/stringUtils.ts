import { IPerson } from "../types/foresporsel";
import { calculateAge } from "./dateUtils";

export function getBarnInformationText(person: IPerson): string {
  return `${person.fornavn}, ${person.fødselsdato}, ${calculateAge(person.fødselsdato)} år `;
}
