import { GuidePanel } from "@navikt/ds-react";

export default function FordelingGuideCard() {
  return (
    <GuidePanel>
      <p>
        Her kan du sende en forespørsel om NAV kan beregne fordelingen av reisekostnader i
        forbindelse med samvær med barn.
      </p>
      <b>For barn under 15 år</b>
      <p>
        Når du har sendt inn forespørselen, sender vi en henvendelse til den andre forelderen for å
        innhente et samtykke. Frist for å samtykke er 30 dager fra forespørselen er sendt fra deg
        til oss.
      </p>
      <p>
        Hvis den andre forelderen samtykker innen fristen, går saken automatisk videre til
        behandling. En saksbehandler tar så kontakt med dere, for avklaringer som trengs i saken.
      </p>
      <p>Hvis den andre forelderen ikke samtykker, må NAV avvise forespørselen.</p>
      <b>For barn som er 15 år, eller eldre</b>
      <p>
        Det trengs ikke samtykke fra den andre forelderen, når barnet er 15 år eller eldre. Da går
        saken automatisk videre til behandling.
      </p>
    </GuidePanel>
  );
}
