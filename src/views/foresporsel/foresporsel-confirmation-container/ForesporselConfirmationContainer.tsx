import { SuccessStroke } from "@navikt/ds-icons";
import { Alert, BodyShort } from "@navikt/ds-react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";

export default function ForesporselConfirmationContainer() {
  return (
    <ConfirmationLayout>
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
    </ConfirmationLayout>
  );
}
