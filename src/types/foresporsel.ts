import { Gender } from "../enum/gender";

export interface IBrukerinformasjon {
  fornavn: string;
  kjønn: Gender;
  harDiskresjon: boolean;
  kanSøkeOmFordelingAvReisekostnader: boolean;
  forespørslerSomHovedpart: IForesporsel[];
  forespørslerSomMotpart: IForesporsel[];
  motparterMedFellesBarnUnderFemtenÅr: IMotpart[];
  barnMinstFemtenÅr: IPerson[];
}

export interface IForesporsel {
  idForespørsel: number;
  kreverSamtykke: boolean;
  barn: IPerson[];
  hovedpart: IPerson;
  motpart: IPerson;
  opprettet: string | null;
  samtykket: string | null;
  journalfoert: string | null;
  erAlleOver15: boolean;
}

export interface IPerson extends IPersonAge {
  ident: string;
  fornavn: string;
  fødselsdato: string;
}

export interface IPersonAge {
  alder: number;
  erOver15: boolean;
}

interface IMotpart {
  motpart: IPerson;
  fellesBarnUnder15År: IPerson[];
}
