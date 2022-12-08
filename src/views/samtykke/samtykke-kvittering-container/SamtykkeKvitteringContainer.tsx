import { SuccessStroke } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { useTranslation } from "next-i18next";

interface ISamtykkeKvitteringContainerProps {
  barnInformation: string[];
}

export default function SamtykkeKvitteringContainer({
  barnInformation,
}: ISamtykkeKvitteringContainerProps) {
  const { t: translate } = useTranslation("kvittering");

  return (
    <ConfirmationLayout>
      <div className="flex space-x-14">
        <SuccessStroke color="green" fontSize="60" />
        <div className="flex flex-col gap-7">
          <div>
            <BodyShort spacing>{translate("samtykke.description")}</BodyShort>
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
          <BodyShort spacing>{translate("samtykke.gjenfinne")} [lenke].</BodyShort>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
