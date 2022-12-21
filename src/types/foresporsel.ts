import { Deaktivator } from "../enum/deaktivator";
import { ForesporselStatus } from "../enum/foresporsel-status";
import { Gender } from "../enum/gender";
import { IMotpart, IPerson } from "./person";

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
  deaktivertAv: Deaktivator | null;
}

interface IForesporselUi {
  erAlleOver15: boolean;
  status: ForesporselStatus;
  erHovedpart: boolean;
}
