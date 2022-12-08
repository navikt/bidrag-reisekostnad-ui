import { ForesporselStatus } from "../enum/foresporsel-status";
import { Gender } from "../enum/gender";

export interface IBrukerinformasjon {
  fornavn: string;
  kjønn: Gender;
  harDiskresjon: boolean;
  kanSøkeOmFordelingAvReisekostnader: boolean;
  harSkjulteFamilieenheterMedDiskresjon: boolean;
  forespørslerSomHovedpart: IForesporsel[];
  forespørslerSomMotpart: IForesporsel[];
  motparterMedFellesBarnUnderFemtenÅr: IMotpart[];
  barnMinstFemtenÅr: IPerson[];
}

export interface IForesporsel extends IForesporselUi {
  id: number;
  kreverSamtykke: boolean;
  barn: IPerson[];
  hovedpart: IPerson;
  motpart: IPerson;
  opprettet: string | null;
  samtykket: string | null;
  journalført: string | null;
  deaktivert: string | null;
  samtykkefrist: string | null;
}

interface IForesporselUi {
  erAlleOver15: boolean;
  status: ForesporselStatus;
}

export interface IPerson extends IPersonAge {
  ident: string;
  fornavn: string;
  fødselsdato: string;
}

export interface IPersonAge {
  alder: number;
  erOver15: boolean;
  er15Om30Dager: boolean;
}

interface IMotpart {
  motpart: IPerson;
  fellesBarnUnder15År: IPerson[];
}
