import { Loader } from "@navikt/ds-react";
import { useTranslation } from "next-i18next";
import { PageMeta } from "../../page-meta/PageMeta";

export default function Spinner() {
  const { t: translate } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center">
      <PageMeta title={translate("loading")} />
      <Loader data-testid="spinner-testid" size="3xlarge" title="venter..." variant="interaction" />
    </div>
  );
}
