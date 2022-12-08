import { Button } from "@navikt/ds-react";
import ConfirmationLayout from "../../components/layout/confirmation-layout/ConfirmationLayout";
import StatusBar from "../../components/status-bar/StatusBar";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import useForesporselApi from "../../hooks/useForesporselApi";
import { formatDate } from "../../utils/dateUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/modal/confirm-modal/ConfirmModal";
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

  useEffect(() => {
    if (success && !failed) {
      router.push("/");
    }
  }, [success]);

  return (
    <div className="grid gap-12">
      <ConfirmationLayout>
        <div className="grid gap-12">
          <div className="w-[40rem] grid grid-cols-[70%_30%]">
            <div className="flex gap-4">
              <div>For: </div>
              <div className="grid">
                {barnInformation.map((information, index) => {
                  return <b key={index}>{information}</b>;
                })}
              </div>
            </div>
            <div>{translate("sendt_inn", { date: sentDate ? formatDate(sentDate) : "" })}</div>
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
                {translate("button.trekk_tilbake")}
              </Button>
            </div>
          </div>
        </div>
        <ConfirmModal
          open={open}
          header="Vil du trekke forerspørselen tilbake?"
          content="Trekker du forerspørselen nå, skal 
          den slettes. Motparten blir informert om det."
          submitText={translate("button.trekk_tilbake")}
          onSubmit={() => trekkeForesporsel(foresporselId)}
          onCancel={() => router.push("/")}
          onClose={() => setOpen(false)}
          loading={submitting}
          showError={!success && failed}
          errorMessage="Det skjedde en feil tilbaketrekking av forespørselen"
        />
      </ConfirmationLayout>
    </div>
  );
}
