import { ForesporselStatus } from '../../enum/foresporsel-status';
import { Gender } from '../../enum/gender';
import { IBrukerinformasjon } from '../../types/foresporsel';
import { IPerson } from '../../types/person';

export const BRUKERENS_FORNAVN = 'Nils';

const person = (
    ident: string,
    fornavn: string,
    fødselsdato: string,
    alder: number,
    er15Om30Dager = false
): IPerson => ({
    ident,
    fornavn,
    fødselsdato,
    alder,
    erOver15: alder >= 15,
    er15Om30Dager,
});

export const BRUKER_INFORMASJON_1: IBrukerinformasjon = {
    fornavn: 'Gråtass',
    kjønn: Gender.KVINNE,
    harDiskresjon: true,
    kanSøkeOmFordelingAvReisekostnader: true,
    harSkjulteFamilieenheterMedDiskresjon: true,
    forespørslerSomHovedpart: [
        {
            id: 1,
            kreverSamtykke: false,
            barn: [person('77777777777', 'Grus', '2007-11-21', 18)],
            hovedpart: person('11111111111', 'Gråtass', '1982-11-21', 43),
            motpart: person('22222222222', 'Streng', '1984-11-21', 41),
            opprettet: '2022-11-21T10:54:31.071878',
            samtykket: null,
            journalført: null,
            deaktivert: null,
            samtykkefrist: null,
            deaktivertAv: null,
            erAlleOver15: true,
            status: ForesporselStatus.UNDER_BEHANDLING,
            erHovedpart: true,
        },
    ],
    forespørslerSomMotpart: [
        {
            id: 4,
            kreverSamtykke: false,
            barn: [person('77777777777', 'Grus', '2007-11-21', 18)],
            hovedpart: person('22222222222', 'Streng', '1982-11-21', 43),
            motpart: person('11111111111', 'Gråtass', '1984-11-21', 41),
            opprettet: '2022-11-21T10:54:31.071878',
            samtykket: null,
            journalført: null,
            deaktivert: null,
            samtykkefrist: null,
            deaktivertAv: null,
            erAlleOver15: true,
            status: ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG,
            erHovedpart: false,
        },
        {
            id: 5,
            kreverSamtykke: false,
            barn: [person('93847563829', 'Kristine', '2007-01-16', 19)],
            hovedpart: person('22222222222', 'Streng', '1982-11-21', 43),
            motpart: person('11111111111', 'Gråtass', '1984-11-21', 41),
            opprettet: '2022-11-21T10:54:31.071878',
            samtykket: null,
            journalført: '2022-12-2022T10:54:31.071878',
            deaktivert: null,
            samtykkefrist: null,
            deaktivertAv: null,
            erAlleOver15: true,
            status: ForesporselStatus.KANSELLERT,
            erHovedpart: false,
        },
    ],
    motparterMedFellesBarnUnderFemtenÅr: [
        {
            motpart: person('22222222222', 'Streng', '1984-11-21', 41),
            fellesBarnUnder15År: [
                person('88888888888', 'Småstein', '2012-11-21', 13),
                person('99999999999', 'Barn 2', '2012-11-21', 13),
            ],
        },
    ],
    barnMinstFemtenÅr: [person('77777777777', 'Grus', '2007-11-21', 18)],
};
