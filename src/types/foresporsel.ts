export interface IBrukerinformasjon {
  brukersFornavn: string;
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
}

export interface IPerson {
  fornavn: string;
  fødselsdato: string;
}

interface IMotpart {
  motpart: IPerson;
  fellesBarnUnder15År: IPerson[];
}
