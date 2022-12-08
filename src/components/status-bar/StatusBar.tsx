import { Tag } from "@navikt/ds-react";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import { useTranslation } from "next-i18next";

interface IStatusBar {
  status: ForesporselStatus;
}

export default function StatusBar({ status }: IStatusBar) {
  const { t: translate } = useTranslation();

  return (
    <>
      {(() => {
        switch (status) {
          case ForesporselStatus.VENTER_PAA_SAMTYKKE:
            return (
              <Tag variant="warning" size="small" className="mt-3">
                {translate("status.venter_paa_samtykke")}
              </Tag>
            );
          case ForesporselStatus.TREKKET_TILBAKE:
            return (
              <Tag variant="neutral" size="small" className="mt-3">
                {translate("status.trekket_tilbake")}
              </Tag>
            );
          case ForesporselStatus.VENTER_PAA_OVERFORING:
            return (
              <Tag variant="alt2" size="small" className="mt-3">
                {translate("status.venter_paa_overforing")}
              </Tag>
            );
          default:
            return (
              <Tag variant="success" size="small" className="mt-3">
                {translate("status.under_behandling")}
              </Tag>
            );
        }
      })()}
    </>
  );
}
