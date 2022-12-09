import { Heading, Button, Alert } from "@navikt/ds-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import OverviewCard from "../../components/card/overview-card/OverviewCard";
import { PageMeta } from "../../components/page-meta/PageMeta";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { IForesporsel } from "../../types/foresporsel";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

export default function Overview() {
  const { userInformation } = useReisekostnad();
  const { t: oversiktTranslate } = useTranslation("oversikt");
  const { t: translate } = useTranslation();

  const [showedForespørslerSomMotpart, setShowedForespørslerSomMotpart] = useState<IForesporsel[]>(
    []
  );

  useEffect(() => {
    if (userInformation) {
      const { forespørslerSomMotpart } = userInformation;
      const foresporslerWithBarnUnder15 = forespørslerSomMotpart.filter(
        (foresporsel) => !foresporsel.erAlleOver15
      );

      setShowedForespørslerSomMotpart(foresporslerWithBarnUnder15);
    }
  }, [userInformation]);

  if (!userInformation) {
    return null;
  }

  const { forespørslerSomHovedpart } = userInformation;

  return (
    <>
      <PageMeta title={oversiktTranslate("page_title")} />
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-10">
          <GreetingCard name={userInformation.fornavn} gender={userInformation.kjønn} />
          <p>{parse(oversiktTranslate("description"))}</p>
          {showedForespørslerSomMotpart.length === 0 && forespørslerSomHovedpart.length == 0 && (
            <Alert variant="info">{translate("alert.ingen_saker")}</Alert>
          )}
          <div>
            <Link href="/foresporsel">
              <Button type="button">{translate("button.send_foresporsel_om_fordeling")}</Button>
            </Link>
          </div>
          {showedForespørslerSomMotpart.length > 0 && (
            <>
              <div className="w-full flex flex-col gap-5">
                {showedForespørslerSomMotpart && (
                  <Heading level="2" size="small">
                    {oversiktTranslate("title.motatt_foresporsler")}
                  </Heading>
                )}
                {showedForespørslerSomMotpart.map((request, index) => {
                  return <OverviewCard key={index} foresporsel={request} />;
                })}
              </div>
            </>
          )}
          {forespørslerSomHovedpart.length > 0 && (
            <div className="w-full flex flex-col gap-5">
              <Heading level="2" size="small">
                {oversiktTranslate("title.sendt_inn_foresporsler")}
              </Heading>
              {forespørslerSomHovedpart.map((request, index) => {
                return <OverviewCard key={index} foresporsel={request} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
