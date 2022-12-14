import { SuccessStroke } from "@navikt/ds-icons";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import { Deaktivator } from "../../../enum/deaktivator";

interface ISamtykkeKvitteringProps {
  barnInformation: string[];
  deaktivertAv: Deaktivator | null;
}

export default function SamtykkeKvittering({
  barnInformation,
  deaktivertAv,
}: ISamtykkeKvitteringProps) {
  const { t: translate } = useTranslation("kvittering");

  const content =
    deaktivertAv === "MOTPART"
      ? translate("samtykke.nei.description", {
          barn: barnInformation.join("\n"),
        })
      : translate("samtykke.ja.description");

  return (
    <ConfirmationLayout title={translate("samtykke.title")}>
      <div className="flex gap-8">
        <div className="pt-[36px]">
          <SuccessStroke color="green" fontSize="60" />
        </div>
        <div className="flex flex-col gap-7">
          <div className="whitespace-pre-wrap">{parse(content)}</div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
