import { GuidePanel } from "@navikt/ds-react";

export default function FordelingGuideCard() {
  return (
    <GuidePanel>
      <p>
        Her kan du sende inn en forespørsel om NAV kan beregne reisekostnader ved samvær med barn.
      </p>
      <p>
        Normalt skal dere som foreldre selv avtale fordelingen på den måten dere synes er best. Det
        vanlige er at reisekostnadene fordeles forholdsmessig mellom dere, etter størrelsen på
        inntekten deres. For at NAV skal beregne for dere, må det foreligge såkalte særlige grunner.
        Dette kan være hvis dere er uenige i fordelingen, samtidig som det er store
        inntektsforskjeller og store reisekostnader.
      </p>
      <b>Samtykke fra den andre forelderen</b>
      <p>
        Når barnet er under 15 år, må begge foreldre være enige i at NAV skal beregne fordelingen
        for dere. Vi innhenter derfor et samtykke fra den andre forelderen. Hvis den andre
        forelderen ikke vil samtykke, må NAV avvise forespørselen om beregning.
      </p>
      <p>
        Når barnet er 15 år, eller eldre, trengs det ikke samtykke fra den andre forelderen. Da blir
        forespørselen automatisk sendt videre til behandling.
      </p>
    </GuidePanel>
  );
}
