export interface IBrukerinformasjon {
  brukersFornavn: string;
  kanSokeOmFordelingAvReisekostnader: boolean;
  foresporslerSomHovedpart: IForesporsel[];
  foresporslerSomMotpart: IForesporsel[];
  motparterMedFellesBarnUnderFemtenAar: IMotpart[];
  barnMinstFemtenor: IPerson[];
}

export interface IForesporsel {
  idForesporsel: number;
  kreverSamtykke: boolean;
  barn: IPerson[];
  hovedpart: IPerson;
  motpart: IPerson;
  opprettet: string;
  samtykket: string;
  journalfoert: string;
}

export interface IPerson {
  fornavn: string;
  foedselsdato: string;
}

interface IMotpart {
  motpart: IPerson;
  fellesBarnUnder15Aar: IPerson[];
}
