import { ForesporselStatus } from "../enum/foresporsel-status";
import { IBrukerinformasjon, IForesporsel } from "../types/foresporsel";
import { IPerson } from "../types/person";
import { calculateAge, is15YearsOldIn30Days } from "./date.utils";

export function getPersonOver15YearsOld(person: IPerson[]): IPerson[] {
  return person.filter((i) => i.alder >= 15);
}

export function isAgeOver15YearsOld(fodselsdato: string): boolean {
  return calculateAge(fodselsdato) >= 15;
}

export function isEveryoneOver15YearsOld(person: IPerson[]): boolean {
  return person.every((i) => isAgeOver15YearsOld(i.fødselsdato));
}

export function mapToPersonWithAge(person: IPerson[]): IPerson[] {
  return person.map((p) => ({
    ...p,
    alder: calculateAge(p.fødselsdato),
    erOver15: isAgeOver15YearsOld(p.fødselsdato),
    er15Om30Dager: is15YearsOldIn30Days(p.fødselsdato),
  }));
}

export function getAllBarn(userInformation: IBrukerinformasjon): IPerson[] {
  const { barnMinstFemtenÅr, motparterMedFellesBarnUnderFemtenÅr } = userInformation;

  const fellesBarnUnder15Aar = motparterMedFellesBarnUnderFemtenÅr.flatMap(
    (barn) => barn.fellesBarnUnder15År
  );

  return [...barnMinstFemtenÅr, ...fellesBarnUnder15Aar];
}

function getBarnInActiveForesporsel(foresporsler: IForesporsel[]): IPerson[] {
  return foresporsler
    .filter((foresporspel) => foresporspel.status !== ForesporselStatus.KANSELLERT)
    .flatMap((foresporsel) => foresporsel.barn);
}

export function getBarnWithNoActiveForesporsler(userInformation: IBrukerinformasjon): IPerson[] {
  const { forespørslerSomHovedpart, forespørslerSomMotpart } = userInformation;
  const allBarn = getAllBarn(userInformation);
  const barnInActiveForespørslerSomHovedpart = getBarnInActiveForesporsel(forespørslerSomHovedpart);
  const barnInActiveForespørslerSomMotpart = getBarnInActiveForesporsel(forespørslerSomMotpart);

  const allBarnInActiveForesporselIdenter = [
    ...barnInActiveForespørslerSomHovedpart,
    ...barnInActiveForespørslerSomMotpart,
  ].map((i) => i.ident);

  const result = [] as IPerson[];
  allBarn.forEach((barn) => {
    if (!allBarnInActiveForesporselIdenter.includes(barn.ident)) {
      result.push(barn);
    }
  });

  return result.sort((a, b) => a.alder - b.alder);
}
