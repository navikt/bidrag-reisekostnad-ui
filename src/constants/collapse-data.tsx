import Link from "next/link";
import { ICollapseData } from "../components/collapse/Collapse";

export const GJELDER_BARN_SOM_IKKE_VISES_HER_COLLAPSE: ICollapseData[] = [
  {
    header: "Gjelder forespørselen barn som ikke vises her?",
    content: (
      <p>
        Hvis forespørselen gjelder barn som ikke vises her, kan du ikke bruke dette skjemaet. Da må
        du enten kontakte oss på telefon 55 55 33 33, eller via tjenesten{" "}
        <Link href="https://www.nav.no/skriv-til-oss">Skriv til oss</Link>
      </p>
    ),
  },
];

export const BEHANDLING_AV_PERSONLIGOPPLYSNING_COLLAPSE: ICollapseData[] = [
  {
    header: "Slik behandler NAV personopplysningene dine",
    content: (
      <>
        <span>
          Vi innhenter og mottar opplysninger om deg for å behandle saken din. Opplysningene vi
          innhenter kommer enten fra deg eller fra offentlige registre:
        </span>
        <ul>
          <li>hvilke barn du er registrert som forelder til.</li>
          <li>hvem den andre forelderen er.</li>
          <li>Inntekten din.</li>
          {/* TODO */}
          <li>Her kommer det nok mer</li>
        </ul>
        <span>
          Du har rett til innsyn i saken din. Vil du vite mer om hvordan NAV behandler
          personopplysninger? Se {/* TODO ER LENKE RIKTIG? */}
          <Link href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten">
            nav.no/personvern
          </Link>
        </span>
      </>
    ),
  },
];
