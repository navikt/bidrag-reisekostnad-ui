import { Heading, BodyShort } from "@navikt/ds-react";
import { PropsWithChildren } from "react";
import { SAMTYKKE_CONFIRMATION_COLLAPSE } from "../../../constants/collapse";
import Collapse from "../../collapse/Collapse";
import { PageMeta } from "../../page-meta/PageMeta";

export default function ConfirmationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageMeta title="Bekreftelse på innsending" />
      <div className="flex flex-col gap-14 items-center">
        <Heading level="1" size="xlarge">
          Kvittering/ bekreftelse på innsending
        </Heading>
        <div className="flex space-x-14">
          <div>{children}</div>
        </div>
        <Collapse data={SAMTYKKE_CONFIRMATION_COLLAPSE} />
      </div>
    </>
  );
}
