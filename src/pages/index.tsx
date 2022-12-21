import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Overview from "../views/overview/Overview";
import { useEffect, useState } from "react";
import { useReisekostnad } from "../context/reisekostnadContext";
import { IBrukerinformasjon } from "../types/foresporsel";
import Spinner from "../components/spinner/spinner/spinner";
import { generateAndStoreCorrelationIdAsCookie } from "../lib/logging/types";
import { fetcher } from "../utils/apiUtils";
import { Alert } from "@navikt/ds-react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import { PageMeta } from "../components/page-meta/PageMeta";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR<IBrukerinformasjon>("/api/brukerinformasjon", fetcher);
  const { updateUserInformation } = useReisekostnad();
  const { t: translate } = useTranslation();
  const { t: oversiktTranslate } = useTranslation("oversikt");

  const [hasNoBarn, setHasNoBarn] = useState<boolean>(false);

  useEffect(() => {
    generateAndStoreCorrelationIdAsCookie();
  }, []);

  useEffect(() => {
    if (data) {
      const hasBarn =
        data.barnMinstFemtenÅr.length === 0 &&
        data.motparterMedFellesBarnUnderFemtenÅr.flatMap((person) => person.fellesBarnUnder15År)
          .length === 0;

      updateUserInformation(data);
      setHasNoBarn(hasBarn);
    }
  }, [data]);

  if (!data) return <Spinner />;

  if (hasNoBarn) {
    return (
      <>
        <PageMeta title={oversiktTranslate("page_title")} />
        <Alert data-testid="alert.funnet_ingen_barn" variant="info">
          {parse(translate("alert.funnet_ingen_barn"))}
        </Alert>
      </>
    );
  }

  return <Overview />;
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "oversikt"])),
    },
  };
}
