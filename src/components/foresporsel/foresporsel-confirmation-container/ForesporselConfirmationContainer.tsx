import { SuccessStroke } from "@navikt/ds-icons";
import { Alert, BodyShort, Heading } from "@navikt/ds-react";

export default function ForesporselConfirmationContainer() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <Heading level="1" size="xlarge">
        Bekreftelse på innsending
      </Heading>
      <div className="grid grid-cols-[10%_90%]">
        <SuccessStroke color="green" fontSize="60" />
        <div>
          <BodyShort className="leading-relaxed" spacing>
            Du har bedt NAV om behandle forerspørsel om fordeling av reisekostnader for barn: Barn
            3, dd.mm.yyyy, 5 år (med Ole Normann) Barn 4, dd.mm.yyyy, 15 år (med Ole Normann)
          </BodyShort>
          <BodyShort className="leading-relaxed" spacing>
            Forerspørsel for Barn 4, dd.mm.yyyy, 15 år går til NAV automatisk og trenger ikke
            signering fra motparten. Forerspørsel for Barn 3, dd.mm.yyyy, 5 år må signeres slik at
            NAV skal behandle den videre.
          </BodyShort>
        </div>
      </div>
      <Alert variant="warning">
        Forerspørselen er ikke gyldig før motparten har samtykket.
        <br></br>
        Han/hun kan allerede nå logge seg inn NAV sine sider og samtykke fordeling av
        reisekostnader.
        <br></br>
        Du bør gjøre motparten oppmerksom på dette. Hvis motparten ikke har signert innen tre dager
        vil vi sende han en påminnelse per sms.
      </Alert>
      <div className="flex flex-col gap-5">
        <BodyShort spacing> Du kan gjenfinne forerspørselen om reisekostnader her: lenke</BodyShort>
        <BodyShort className="leading-relaxed" spacing>
          Du kan trekke forerspørselen tilbake før motparten har samtykket. Da skal motparten få
          varsel om det og du skal starte på nytt hvis du har behov for det.
        </BodyShort>
        <BodyShort className="leading-relaxed" spacing>
          Hvis motparten ikke signerer innen 30 dager, forerspørselen skal slettes. Vi skal slette
          søknaden helt fra Dine sider på NAV etter 3 måneder.
        </BodyShort>
        <BodyShort className="leading-relaxed" spacing>
          Det bør ikke opprettes et nytt forerspørsel for samme barn før motparten har signert eller
          den forerspørselen skal slettes.
        </BodyShort>
      </div>
    </div>
  );
}
