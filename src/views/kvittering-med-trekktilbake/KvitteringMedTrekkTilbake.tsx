import { Button } from "@navikt/ds-react";
import ConfirmationLayout from "../../components/layout/confirmation-layout/ConfirmationLayout";
import StatusBar from "../../components/status-bar/StatusBar";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import { formatDate } from "../../utils/dateUtils";

interface IKvitteringMedTrekkTilbakeProps {
  barnInformation: string[];
  sentDate: string | null;
  status: ForesporselStatus;
}

export default function KvitteringMedTrekkTilbake({
  barnInformation,
  sentDate,
  status,
}: IKvitteringMedTrekkTilbakeProps) {
  function onWithdraw() {
    //TODO
  }

  return (
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
            <Button type="button" variant="secondary" onClick={onWithdraw}>
              TREKK TILBAKE
            </Button>
          </div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
