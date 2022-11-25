import { BodyShort, Heading } from "@navikt/ds-react";
import { SuccessStroke } from "@navikt/ds-icons";
import Collapse from "../../../components/collapse/Collapse";
import { SAMTYKKE_CONFIRMATION_COLLAPSE } from "../../../constants/collapse";
import { PageMeta } from "../../../components/page-meta/PageMeta";

interface ISamtykkeConfirmationContainerProps {
  barnInformation: string[];
}

export default function SamtykkeConfirmationContainer({
  barnInformation,
}: ISamtykkeConfirmationContainerProps) {
  return (
    <>
      <PageMeta title="Bekreftelse på innsending" />
      <div className="flex flex-col gap-14 items-center">
        <Heading level="1" size="xlarge">
          Kvittering/ bekreftelse på innsending
        </Heading>
        <div className="flex space-x-14">
          <SuccessStroke color="green" fontSize="60" />
          <div className="flex flex-col gap-7">
            <div>
              <BodyShort spacing>
                Du har signert fordeling av reisekostnader med Kari Normann for
              </BodyShort>
              {barnInformation.map((information, index) => {
                return <b key={index}>{information}</b>;
              })}
            </div>
            {/* TODO */}
            <BodyShort spacing>Du kan gjenfinne samtykken her [lenke].</BodyShort>
          </div>
        </div>
        <Collapse data={SAMTYKKE_CONFIRMATION_COLLAPSE} />
      </div>
    </>
  );
}
