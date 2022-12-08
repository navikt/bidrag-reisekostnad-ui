import { Heading } from "@navikt/ds-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { SAMTYKKE_CONFIRMATION_COLLAPSE } from "../../../constants/collapse-data";
import Collapse from "../../collapse/Collapse";
import { PageMeta } from "../../page-meta/PageMeta";
import { Right } from "@navikt/ds-icons";
import { useTranslation } from "next-i18next";

export default function ConfirmationLayout({ children }: PropsWithChildren) {
  const { t: translate } = useTranslation();

  return (
    <>
      <PageMeta title="Bekreftelse på innsending" />
      <div className="w-full grid gap-10">
        <div className="flex flex-col gap-14 items-center">
          <Heading level="1" size="xlarge">
            Bekreftelse på innsending
          </Heading>
          <div className="flex space-x-14">
            <div>{children}</div>
          </div>
        </div>
        <div className="grid gap-2">
          <Link href="/" className="no-underline flex gap-2 items-center hover:underline" passHref>
            {translate("button.til_oversikten")}
            <Right aria-hidden />
          </Link>
          <Collapse data={SAMTYKKE_CONFIRMATION_COLLAPSE} />
        </div>
      </div>
    </>
  );
}
