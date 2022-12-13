export const BRUKERENS_FORNAVN = "Nils";

export const BRUKER_INFORMASJON_1 = {
  fornavn: "Gråtass",
  kjønn: "Kvinne",
  harDiskresjon: true,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: true,
  forespørslerSomHovedpart: [
    {
      id: 1,
      kreverSamtykke: false,
      barn: [
        {
          ident: "77777777777",
          fornavn: "Grus",
          fødselsdato: "2007-11-21",
        },
      ],
      hovedpart: {
        fornavn: "Gråtass",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Streng",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.071878",
      samtykket: null,
      journalført: null,
    },
  ],
  forespørslerSomMotpart: [
    {
      id: 4,
      kreverSamtykke: false,
      barn: [
        {
          ident: "77777777777",
          fornavn: "Grus",
          fødselsdato: "2007-11-21",
        },
      ],
      hovedpart: {
        fornavn: "Streng",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Gråtass",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.071878",
      samtykket: null,
      journalført: null,
    },
    {
      id: 5,
      kreverSamtykke: false,
      barn: [
        {
          ident: "93847563829",
          fornavn: "Kristine",
          fødselsdato: "2007-01-16",
        },
      ],
      hovedpart: {
        fornavn: "Streng",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Gråtass",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.071878",
      samtykket: null,
      journalført: "2022-12-2022T10:54:31.071878",
    },
  ],
  motparterMedFellesBarnUnderFemtenÅr: [
    {
      motpart: {
        fornavn: "Streng",
        fødselsdato: "1984-11-21",
      },
      fellesBarnUnder15År: [
        {
          ident: "88888888888",
          fornavn: "Småstein",
          fødselsdato: "2012-11-21",
        },
        {
          ident: "99999999999",
          fornavn: "Barn 2",
          fødselsdato: "2012-11-21",
        },
      ],
    },
  ],
  barnMinstFemtenÅr: [
    {
      ident: "77777777777",
      fornavn: "Grus",
      fødselsdato: "2007-11-21",
    },
  ],
};
