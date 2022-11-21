export interface IForesporsel {
  brukersFornavn: string;
  kanSokeOmFordelingAvReisekostnader: boolean;
  foresporslerSomHovedpart: IForesporslerSomHovedpart[];
  foresporslerSomMotpart: any[];
  motparterMedFellesBarnUnderFemtenAar: IMotparterMedFellesBarnUnderFemtenAar[];
  barnMinstFemtenor: IPerson[];
}

interface IMotparterMedFellesBarnUnderFemtenAar {
  motpart: IPerson;
  fellesBarnUnder15Aar: IPerson[];
}

interface IForesporslerSomHovedpart {
  idForesporsel: number;
  kreverSamtykke: boolean;
  barn: IPerson[];
  hovedpart: IPerson;
  motpart: IPerson;
  opprettet: string;
  samtykket?: any;
  journalfoert?: any;
}

interface IPerson {
  fornavn: string;
  foedselsdato: string;
}
