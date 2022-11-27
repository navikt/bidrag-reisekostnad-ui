import { IBrukerinformasjon } from "../../types/foresporsel";

export const BRUKERENS_FORNAVN = "Nils";

export const BRUKER_INFORMASJON_1: IBrukerinformasjon = {
  brukersFornavn: "Nils",
  kanSøkeOmFordelingAvReisekostnader: true,
  forespørslerSomHovedpart: [],
  forespørslerSomMotpart: [],
  motparterMedFellesBarnUnderFemtenÅr: [
    {
      motpart: {
        ident: "i+iWLKUPzw+IR7G4rUL2Sg==",
        fornavn: "KONSENTRISK",
        fødselsdato: "1987-03-06",
        alder: 10,
        erOver15: true,
      },
      fellesBarnUnder15År: [
        {
          ident: "XOGvNLC5v+JBDql8n5JfLQ==",
          fornavn: "SART",
          fødselsdato: "2016-11-24",
          alder: 10,
          erOver15: false,
        },
        {
          ident: "MzkAZHloLxh3EXjn5aZWvw==",
          fornavn: "TØFF",
          fødselsdato: "2011-07-11",
          alder: 10,
          erOver15: false,
        },
      ],
    },
  ],
  barnMinstFemtenÅr: [
    {
      ident: "XOGvNLC5v+JBDql8n5JfLQ==",
      fornavn: "Kalle",
      fødselsdato: "2008-11-24",
      alder: 10,
      erOver15: true,
    },
  ],
};
