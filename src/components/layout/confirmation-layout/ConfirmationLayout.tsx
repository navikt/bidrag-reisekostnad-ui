import { Button, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { SAMTYKKE_CONFIRMATION_COLLAPSE } from "../../../constants/collapse";
import Collapse from "../../collapse/Collapse";
import { PageMeta } from "../../page-meta/PageMeta";
import { Right } from "@navikt/ds-icons";

export default function ConfirmationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PageMeta title="Bekreftelse på innsending" />
      <div className="grid gap-10">
        <div className="flex flex-col gap-14 items-center">
          <Heading level="1" size="xlarge">
            Bekreftelse på innsending
          </Heading>
          <div className="flex space-x-14">
            <div>{children}</div>
          </div>
        </div>
        <div className="grid gap-2">
          <Link href="/" className="no-underline" passHref>
            <Button
              type="button"
              variant="tertiary"
              icon={<Right aria-hidden />}
              iconPosition="right"
            >
              Til oversikten
            </Button>
          </Link>
          <Collapse data={SAMTYKKE_CONFIRMATION_COLLAPSE} />
        </div>
      </div>
    </>
  );
}
