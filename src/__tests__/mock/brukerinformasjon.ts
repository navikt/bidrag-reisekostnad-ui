import { Gender } from "../../enum/gender";

export const KVINNE_UTEN_BARN = {
  fornavn: "ENTUSIASTISK",
  kjønn: Gender.KVINNE,
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
  kjønn: Gender.MANN,
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [],
  forespørslerSomMotpart: [],
  motparterMedFellesBarnUnderFemtenÅr: [
    {
      motpart: {
        ident: "LaXn8UMRHY9PRPV11BOZlw==",
        fornavn: "UMODEN",
        kortnavn: null,
        fødselsdato: "1982-09-23",
      },
      fellesBarnUnder15År: [
        {
          ident: "kz1Y4xdyb16ebUdt7/TJdw==",
          fornavn: "TOÅRIG",
          kortnavn: null,
          fødselsdato: "2013-04-21",
        },
        {
          ident: "V7EFtbVkSaQIWkJZIPrDXg==",
          fornavn: "MORALSK",
          kortnavn: null,
          fødselsdato: "2019-10-18",
        },
      ],
    },
  ],
  barnMinstFemtenÅr: [
    {
      ident: "QkjXfxzwpibXA5d6miT/Xg==",
      fornavn: "SPESIFIKK",
      kortnavn: null,
      fødselsdato: "2007-03-01",
    },
  ],
};

export const MANN_MED_ETT_BARN_OG_FORESPORSEL = {
  fornavn: "FYLDIG",
  kjønn: Gender.MANN,
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [
    {
      id: 1000129,
      kreverSamtykke: true,
      barn: [
        {
          ident: "QkjXfxzwpibXA5d6miT/Xg==",
          fornavn: "SPESIFIKK",
          kortnavn: null,
          fødselsdato: "2007-03-01",
        },
      ],
      hovedpart: {
        ident: "3qdxow8/575cVArg+af8Uiw==",
        fornavn: "FYLDIG",
        kortnavn: "FYLDIG FYLDIG",
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
      deaktivert: null,
      deaktivertAv: null,
    },
  ],
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
  kjønn: Gender.KVINNE,
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
      deaktivert: null,
      deaktivertAv: null,
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
      deaktivert: "2022-12-13T09:55:14.384357",
      deaktivertAv: "HOVEDPART",
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

export const KVINNE_MED_FORESPORSEL_SOM_MOTPART_OG_HOVEDPART = {
  fornavn: "STOR",
  kjønn: Gender.KVINNE,
  harDiskresjon: false,
  kanSøkeOmFordelingAvReisekostnader: true,
  harSkjulteFamilieenheterMedDiskresjon: false,
  forespørslerSomHovedpart: [
    {
      id: 1000127,
      kreverSamtykke: true,
      barn: [
        {
          ident: "B33ZBAwenZPKeYFX6+oN8g==",
          fornavn: "PRESENTABEL",
          kortnavn: "PRESENTABEL PERSON",
          fødselsdato: "2008-01-26",
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
      opprettet: "2022-12-13T10:07:12.47564",
      samtykket: null,
      samtykkefrist: "2023-01-12",
      journalført: null,
      deaktivert: "2022-12-13T10:10:30.345667",
      deaktivertAv: "HOVEDPART",
    },
  ],
  forespørslerSomMotpart: [
    {
      id: 1000151,
      kreverSamtykke: true,
      barn: [
        {
          ident: "B33ZBAwenZPKeYFX6+oN8g==",
          fornavn: "PRESENTABEL",
          kortnavn: "PRESENTABEL PERSON",
          fødselsdato: "2023-01-26",
        },
      ],
      hovedpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: "GLOVARM KONGRESS",
        fødselsdato: "1982-05-28",
      },
      motpart: {
        ident: "qdxow8/575cVArg+af8Uiw==",
        fornavn: "STOR",
        kortnavn: "STOR BYSSE",
        fødselsdato: "1982-07-04",
      },
      opprettet: "2022-12-16T09:16:51.094715",
      samtykket: null,
      samtykkefrist: "2023-01-15",
      journalført: null,
      deaktivert: "2022-12-16T09:17:10.426398",
      deaktivertAv: "HOVEDPART",
    },
    {
      id: 1000155,
      kreverSamtykke: true,
      barn: [
        {
          ident: "B33ZBAwenZPKeYFX6+oN8g==",
          fornavn: "PRESENTABEL",
          kortnavn: "PRESENTABEL PERSON",
          fødselsdato: "2008-01-26",
        },
      ],
      hovedpart: {
        ident: "OlY9sQuCAOkjah9tBAp2Yw==",
        fornavn: "GLOVARM",
        kortnavn: "GLOVARM KONGRESS",
        fødselsdato: "1982-05-28",
      },
      motpart: {
        ident: "qdxow8/575cVArg+af8Uiw==",
        fornavn: "STOR",
        kortnavn: "STOR BYSSE",
        fødselsdato: "1982-07-04",
      },
      opprettet: "2022-12-16T13:54:43.64062",
      samtykket: null,
      samtykkefrist: "2023-01-15",
      journalført: null,
      deaktivert: null,
      deaktivertAv: null,
    },
  ],
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
