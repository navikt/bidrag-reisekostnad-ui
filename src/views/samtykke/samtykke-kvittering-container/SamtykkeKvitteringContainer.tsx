import { SuccessStroke } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";

interface ISamtykkeKvitteringContainerProps {
  barnInformation: string[];
}

export default function SamtykkeKvitteringContainer({
  barnInformation,
}: ISamtykkeKvitteringContainerProps) {
  return (
    <ConfirmationLayout>
      <div className="flex space-x-14">
        <SuccessStroke color="green" fontSize="60" />
        <div className="flex flex-col gap-7">
          <div>
            <BodyShort spacing>
              Du har signert fordeling av reisekostnader med Kari Normann for
            </BodyShort>
            <ul className="p-0">
              {barnInformation.map((information, index) => {
                return (
                  <li key={index} className="list-none font-bold">
                    {information}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* TODO */}
          <BodyShort spacing>Du kan gjenfinne samtykken her [lenke].</BodyShort>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
