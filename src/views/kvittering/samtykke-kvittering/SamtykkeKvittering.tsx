import { SuccessStroke } from "@navikt/ds-icons";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

export default function SamtykkeKvittering() {
  const { t: translate } = useTranslation("kvittering");

  return (
    <ConfirmationLayout title={translate("samtykke.title")}>
      <div className="flex gap-8">
        <div className="pt-[36px]">
          <SuccessStroke color="green" fontSize="60" />
        </div>
        <div className="flex flex-col gap-7">
          <div className="whitespace-pre-wrap">{parse(translate("samtykke.description"))}</div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
