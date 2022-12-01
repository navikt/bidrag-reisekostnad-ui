export const BRUKERENS_FORNAVN = "Nils";

export const BRUKER_INFORMASJON_1 = {
  fornavn: "Gråtass",
  kjønn: "Kvinne",
  harDiskresjon: true,
  kanSøkeOmFordelingAvReisekostnader: true,
  forespørslerSomHovedpart: [
    {
      idForespørsel: 2,
      kreverSamtykke: true,
      barn: [
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
      hovedpart: {
        fornavn: "Gråtass",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Streng",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.152379",
      samtykket: null,
      journalfoert: null,
    },
    {
      idForespørsel: 1,
      kreverSamtykke: false,
      barn: [
        {
          ident: "77777777777",
          fornavn: "Grus",
          fødselsdato: "2006-11-21",
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
      journalfoert: null,
    },
  ],
  forespørslerSomMotpart: [
    {
      idForespørsel: 3,
      kreverSamtykke: true,
      barn: [
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
      hovedpart: {
        fornavn: "Streng",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Streng",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.152379",
      samtykket: null,
      journalfoert: null,
    },
    {
      idForespørsel: 4,
      kreverSamtykke: false,
      barn: [
        {
          ident: "77777777777",
          fornavn: "Grus",
          fødselsdato: "2006-11-21",
        },
      ],
      hovedpart: {
        fornavn: "Streng",
        fødselsdato: "1982-11-21",
      },
      motpart: {
        fornavn: "Streng",
        fødselsdato: "1984-11-21",
      },
      opprettet: "2022-11-21T10:54:31.071878",
      samtykket: null,
      journalfoert: null,
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
      fødselsdato: "2006-11-21",
    },
  ],
};
