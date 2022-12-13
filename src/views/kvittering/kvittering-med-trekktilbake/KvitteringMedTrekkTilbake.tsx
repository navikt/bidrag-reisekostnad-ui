import { Button } from "@navikt/ds-react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import StatusBar from "../../../components/status-bar/StatusBar";
import { ForesporselStatus } from "../../../enum/foresporsel-status";
import useForesporselApi from "../../../hooks/useForesporselApi";
import { formatDate } from "../../../utils/dateUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/modal/confirm-modal/ConfirmModal";
import { useTranslation } from "next-i18next";

interface IKvitteringMedTrekkTilbakeProps {
  foresporselId: number;
  barnInformation: string[];
  sentDate: string | null;
  status: ForesporselStatus;
}

export default function KvitteringMedTrekkTilbake({
  foresporselId,
  barnInformation,
  sentDate,
  status,
}: IKvitteringMedTrekkTilbakeProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { submitting, success, failed, trekkeForesporsel } = useForesporselApi();
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { t: kvitteringTranslate } = useTranslation("kvittering");

  useEffect(() => {
    if (success && !failed) {
      router.reload();
    }
  }, [success]);

  return (
    <>
      <ConfirmationLayout title={kvitteringTranslate("title")}>
        <div className="w-full grid gap-10">
          <div className="flex justify-between max-[700px]:flex-col">
            <div className="flex">
              <span>For: </span>
              <ul className="pl-2 m-0">
                {barnInformation.map((information, index) => {
                  return (
                    <li className="list-none" key={index}>
                      <strong>{information}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>
            <span>{translate("sendt", { date: sentDate ? formatDate(sentDate) : "" })}</span>
          </div>
          <div className="grid gap-6">
            <div>
              <StatusBar status={status} />
            </div>
            <div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen((current) => !current)}
              >
                {translate("button.trekk_foresporselen")}
              </Button>
            </div>
          </div>
        </div>
        <ConfirmModal
          open={open}
          header={kvitteringTranslate("modal.header")}
          content={kvitteringTranslate("modal.content")}
          submitText={translate("button.trekk_foresporselen")}
          onSubmit={() => trekkeForesporsel(foresporselId)}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          loading={submitting}
          showError={!success && failed}
          errorMessage={translate("errors.tekniskfeil") ?? ""}
        />
      </ConfirmationLayout>
    </>
  );
}
