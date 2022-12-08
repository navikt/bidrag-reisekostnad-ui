import { Heading, Button, Alert } from "@navikt/ds-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import OverviewCard from "../../components/card/overview-card/OverviewCard";
import { PageMeta } from "../../components/page-meta/PageMeta";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { IForesporsel } from "../../types/foresporsel";
import { useTranslation } from "next-i18next";

export default function Overview() {
  const { userInformation } = useReisekostnad();
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
      <PageMeta title="Oversikt" />
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-10">
          <GreetingCard name={userInformation.fornavn} gender={userInformation.kjønn} />
          <div>
            <p>
              Her kan du sende inn en forespørsel om NAV kan beregne fordeling av reisekostnader i
              forbindelse med samvær med barn.
            </p>
            <p>
              For at NAV skal beregne for dere, må det foreligge såkalte særlige grunner til at
              reisekostnadene ikke skal deles forholdsmessig etter størrelsen på inntekten deres.
              Hva som er «særlige grunner» blir vurdert av en saksbehandler, på bakgrunn av hva dere
              oppgir som grunn.
            </p>
            <b>Når innhenter vi samtykke fra den andre forelderen?</b>
            <p>
              Når barnet er under 15 år, må begge foreldre være enige i at NAV skal beregne
              fordelingen for dere. Vi innhenter derfor et samtykke fra den andre forelderen. Hvis
              den andre forelderen ikke vil samtykke, må NAV avvise forespørselen om beregning
            </p>
            <p>
              Når barnet er 15 år, eller eldre, trengs det ikke samtykke fra den andre forelderen.
              Da blir forespørselen automatisk sendt videre til behandling.
            </p>
          </div>
          {showedForespørslerSomMotpart.length === 0 && forespørslerSomHovedpart.length == 0 && (
            <Alert variant="info">Du har ingen saker om fordeling av reisekostnader</Alert>
          )}
          <div>
            <Link href="/foresporsel">
              <Button type="button"> {translate("button.send_foresporsel_om_fordeling")}</Button>
            </Link>
          </div>
          {showedForespørslerSomMotpart.length > 0 && (
            <>
              <div className="w-full flex flex-col gap-5">
                {showedForespørslerSomMotpart && (
                  <Heading level="1" size="small">
                    Saker du har mottatt fra den andre forelderen:
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
              <Heading level="1" size="small">
                Saker du har sendt inn:
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
