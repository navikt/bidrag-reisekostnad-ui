export interface IPerson extends IPersonAge {
    ident: string;
    fornavn: string;
    fødselsdato: string;
}

export interface IPersonAge {
    alder: number;
    erOver15: boolean;
    er15Om30Dager: boolean;
}

export interface IMotpart {
    motpart: IPerson;
    fellesBarnUnder15År: IPerson[];
}
