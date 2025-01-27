export enum ForesporselStatus {
    VENTER_PAA_SAMTYKKE_FRA_DEG = 'Venter på samtykke fra deg',
    VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN = 'Venter på samtykke fra den andre forelderen',
    KANSELLERT = 'Kansellert',
    UNDER_BEHANDLING = 'Under behandling',
}

type statusKey =
    | 'UNDER_BEHANDLING'
    | 'VENTER_PAA_SAMTYKKE_FRA_DEG'
    | 'VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN'
    | 'KANSELLERT';

export function getStatusKey(status: ForesporselStatus): statusKey {
    switch (status) {
        case ForesporselStatus.UNDER_BEHANDLING:
            return 'UNDER_BEHANDLING';
        case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG:
            return 'VENTER_PAA_SAMTYKKE_FRA_DEG';
        case ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN:
            return 'VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN';
        default:
            return 'KANSELLERT';
    }
}

export const ACTIVE_STATUS: ForesporselStatus[] = [
    ForesporselStatus.UNDER_BEHANDLING,
    ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG,
    ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN,
];
