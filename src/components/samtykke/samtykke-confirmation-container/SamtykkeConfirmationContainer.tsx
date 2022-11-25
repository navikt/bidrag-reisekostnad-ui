import { BodyShort, Heading } from "@navikt/ds-react";
import { SuccessStroke } from "@navikt/ds-icons";
import Collapse from "../../collapse/Collapse";
import { SAMTYKKE_CONFIRMATION_COLLAPSE } from "../../../constants/collapse";

export default function SamtykkeConfirmationContainer() {
  return (
    <div className="flex flex-col gap-14 items-center">
      <Heading level="1" size="xlarge">
        Kvittering/ bekreftelse på innsending
      </Heading>
      <div className="flex space-x-14">
        <SuccessStroke color="green" fontSize="50" />
        <div className="flex flex-col gap-7">
          <div>
            <BodyShort spacing>
              Du har signert fordeling av reisekostnader med Kari Normann for
            </BodyShort>
            <b>Barn 3, dd.mm.yyyy, 5 år</b>
          </div>
          {/* TODO */}
          <BodyShort spacing>Du kan gjenfinne samtykken her [lenke].</BodyShort>
        </div>
      </div>
      <Collapse data={SAMTYKKE_CONFIRMATION_COLLAPSE} />
    </div>
  );
}
