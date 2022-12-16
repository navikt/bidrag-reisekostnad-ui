export const KVINNE_UTEN_BARN = {
  fornavn: "ENTUSIASTISK",
  kjønn: "KVINNE",
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [],
  forespørslerSomMotpart: [],
  motparterMedFellesBarnUnderFemtenÅr: [],
  barnMinstFemtenÅr: [],
};

export const MANN_UTEN_FORESPORSEL = {
  fornavn: "FYLDIG",
  kjønn: "MANN",
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [],
  forespørslerSomMotpart: [],
  motparterMedFellesBarnUnderFemtenÅr: [],
  barnMinstFemtenÅr: [
    {
      ident: "QkjXfxzwpibXA5d6miT/Xg==",
      fornavn: "SPESIFIKK",
      kortnavn: null,
      fødselsdato: "2007-03-01",
    },
  ],
};

export const KVINNE_MED_FORESPORSEL = {
  fornavn: "STOR",
  kjønn: "KVINNE",
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [
    {
      id: 1000115,
      kreverSamtykke: true,
      barn: [
        {
          ident: "Gfm5R0RKdBma6u1w4f7Cjg==",
          fornavn: "UTÅLMODIG",
          kortnavn: "UTÅLMODIG UNGDOM",
          fødselsdato: "2012-05-05",
        },
      ],
      hovedpart: {
        ident: "qdxow8/575cVArg+af8Uiw==",
        fornavn: "STOR",
        kortnavn: "STOR BYSSE",
        fødselsdato: "1982-07-04",
      },
      motpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: "GLOVARM KONGRESS",
        fødselsdato: "1982-05-28",
      },
      opprettet: "2022-12-12T15:56:43.172578",
      samtykket: null,
      samtykkefrist: "2023-01-11",
      journalført: null,
      deaktivert: "2022-12-12T15:56:54.571401",
      deaktivertAv: "HOVEDPART",
    },
    {
      id: 1000125,
      kreverSamtykke: true,
      barn: [
        {
          ident: "3NnfD7vKh29r0dh0LfEauQ==",
          fornavn: "ALTERNATIV",
          kortnavn: "ALTERNATIV BADEBY",
          fødselsdato: "2015-05-06",
        },
      ],
      hovedpart: {
        ident: "qdxow8/575cVArg+af8Uiw==",
        fornavn: "STOR",
        kortnavn: "STOR BYSSE",
        fødselsdato: "1982-07-04",
      },
      motpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: "GLOVARM KONGRESS",
        fødselsdato: "1982-05-28",
      },
      opprettet: "2022-12-13T09:43:14.787596",
      samtykket: null,
      samtykkefrist: "2023-01-12",
      journalført: null,
      deaktivert: "2022-12-13T10:33:35.902114",
      deaktivertAv: "HOVEDPART",
    },
    {
      id: 1000126,
      kreverSamtykke: true,
      barn: [
        {
          ident: "Gfm5R0RKdBma6u1w4f7Cjg==",
          fornavn: "UTÅLMODIG",
          kortnavn: "UTÅLMODIG UNGDOM",
          fødselsdato: "2012-05-05",
        },
      ],
      hovedpart: {
        ident: "qdxow8/575cVArg+af8Uiw==",
        fornavn: "STOR",
        kortnavn: "STOR BYSSE",
        fødselsdato: "1982-07-04",
      },
      motpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: "GLOVARM KONGRESS",
        fødselsdato: "1982-05-28",
      },
      opprettet: "2022-12-13T09:54:46.11402",
      samtykket: "2022-12-13T09:55:14.384357",
      samtykkefrist: "2023-01-12",
      journalført: "2022-12-13T09:55:18.407284",
      deaktivert: null,
      deaktivertAv: null,
    },
  ],
  forespørslerSomMotpart: [],
  motparterMedFellesBarnUnderFemtenÅr: [
    {
      motpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: null,
        fødselsdato: "1982-05-28",
      },
      fellesBarnUnder15År: [
        {
          ident: "3NnfD7vKh29r0dh0LfEauQ==",
          fornavn: "ALTERNATIV",
          kortnavn: null,
          fødselsdato: "2015-05-06",
        },
        {
          ident: "Gfm5R0RKdBma6u1w4f7Cjg==",
          fornavn: "UTÅLMODIG",
          kortnavn: null,
          fødselsdato: "2012-05-05",
        },
        {
          ident: "B33ZBAwenZPKeYFX6+oN8g==",
          fornavn: "PRESENTABEL",
          kortnavn: null,
          fødselsdato: "2008-01-26",
        },
      ],
    },
  ],
  barnMinstFemtenÅr: [],
};
