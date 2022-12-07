import { Tag } from "@navikt/ds-react";
import { ForesporselStatus } from "../../enum/foresporsel-status";

interface IStatusBar {
  status: ForesporselStatus;
}

export default function StatusBar({ status }: IStatusBar) {
  return (
    <>
      {(() => {
        switch (status) {
          case ForesporselStatus.VENTER_PAA_SAMTYKKE:
            return (
              <Tag variant="warning" size="small" className="mt-3">
                {status}
              </Tag>
            );
          case ForesporselStatus.TREKKET_TILBAKE:
            return (
              <Tag variant="neutral" size="small" className="mt-3">
                {status}
              </Tag>
            );
          case ForesporselStatus.VENTER_PAA_OVERFORING:
            return (
              <Tag variant="alt2" size="small" className="mt-3">
                {status}
              </Tag>
            );
          default:
            return (
              <Tag variant="success" size="small" className="mt-3">
                {status}
              </Tag>
            );
        }
      })()}
    </>
  );
}
