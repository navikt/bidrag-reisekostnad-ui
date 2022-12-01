import { Alert, Button } from "@navikt/ds-react";
import ConfirmationLayout from "../../components/layout/confirmation-layout/ConfirmationLayout";
import StatusBar from "../../components/status-bar/StatusBar";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import useForesporselApi from "../../hooks/useForesporselApi";
import { formatDate } from "../../utils/dateUtils";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const { submitting, success, failed, trekkeForesporsel } = useForesporselApi();
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success]);

  return (
    <div className="grid gap-12">
      {!success && failed && (
        <Alert variant="error">Det skjedde en feil ved tilbaketrekking av forespørselen</Alert>
      )}
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
            <div>Sendt inn: {sentDate ? formatDate(sentDate) : ""}</div>
          </div>
          <div className="grid gap-6">
            <div>
              <StatusBar status={status} />
            </div>
            <div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => trekkeForesporsel(foresporselId)}
                loading={submitting}
              >
                TREKK TILBAKE
              </Button>
            </div>
          </div>
        </div>
      </ConfirmationLayout>
    </div>
  );
}
