import { IBrukerinformasjon, IPerson } from "../types/foresporsel";
import { calculateAge, is15YearsOldIn30Days } from "./dateUtils";

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

export function getBarnWithNoActiveForesporsler(userInformation: IBrukerinformasjon): IPerson[] {
  const {
    barnMinstFemtenÅr,
    motparterMedFellesBarnUnderFemtenÅr,
    forespørslerSomHovedpart,
    forespørslerSomMotpart,
  } = userInformation;

  const fellesBarnUnder15Aar = motparterMedFellesBarnUnderFemtenÅr.flatMap(
    (barn) => barn.fellesBarnUnder15År
  );
  const allBarn = [...barnMinstFemtenÅr, ...fellesBarnUnder15Aar];

  const barnIForespørslerSomHovedpart = forespørslerSomHovedpart
    .filter((foresporspel) => foresporspel.deaktivert === null)
    .flatMap((foresporsel) => foresporsel.barn);
  const barnIForespørslerSomMotpart = forespørslerSomMotpart
    .filter((foresporspel) => foresporspel.deaktivert === null)
    .flatMap((foresporsel) => foresporsel.barn);

  const allBarnIdenterIForesporsler = [
    ...barnIForespørslerSomHovedpart,
    ...barnIForespørslerSomMotpart,
  ].map((i) => i.ident);

  const result = [] as IPerson[];

  allBarn.forEach((barn) => {
    if (!allBarnIdenterIForesporsler.includes(barn.ident)) {
      result.push(barn);
    }
  });

  return result;
}
