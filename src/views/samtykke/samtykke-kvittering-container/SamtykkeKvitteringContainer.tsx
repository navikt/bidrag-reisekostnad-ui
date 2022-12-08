import { SuccessStroke } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

interface ISamtykkeKvitteringContainerProps {
  barnInformation: string[];
}

export default function SamtykkeKvitteringContainer({
  barnInformation,
}: ISamtykkeKvitteringContainerProps) {
  const { t: translate } = useTranslation("kvittering");
  const content = translate("samtykke.ja.description");
  // const content =
  //   status === ForesporselStatus.KANSELLERT
  //     ? translate("samtykke.nei.description", {
  //         barn: barnInformation.join("\n"),
  //       })
  //     : translate("samtykke.ja.description");

  return (
    <ConfirmationLayout title={translate("samtykke.title")}>
      <div className="flex gap-8">
        <div>
          <SuccessStroke color="green" fontSize="60" />
        </div>
        <div className="flex flex-col gap-7">
          <div>
            <BodyShort spacing className="whitespace-pre-wrap">
              {parse(content)}
            </BodyShort>
          </div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
