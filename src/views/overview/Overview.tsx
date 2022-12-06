import { Heading, BodyShort, Button } from "@navikt/ds-react";
import Link from "next/link";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import OverviewCard from "../../components/card/overview-card/OverviewCard";
import { PageMeta } from "../../components/page-meta/PageMeta";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function Overview() {
  const { userInformation } = useReisekostnad();

  if (!userInformation) {
    return null;
  }

  const { forespørslerSomMotpart, forespørslerSomHovedpart } = userInformation;

  return (
    <>
      <PageMeta title="Oversikt" />
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-10">
          <GreetingCard name={userInformation.fornavn} gender={userInformation.kjønn} />
          <BodyShort>
            {/* TODO: ENDRE PÅ TEKSTEN */}
            {forespørslerSomMotpart.length === 0 && forespørslerSomHovedpart.length == 0
              ? "Du har ingen forespørsel å vise"
              : "Her finner du oversikt over forerspørsel om reisekostander du har sendt inn. + noe om at du har mopttatt"}
          </BodyShort>
          <div>
            <Link href="/foresporsel">
              <Button type="button">Opprett en ny fordeling av reisekostnader</Button>
            </Link>
          </div>
          {forespørslerSomMotpart.length > 0 && (
            <>
              <div className="w-full flex flex-col gap-5">
                {forespørslerSomMotpart && (
                  <Heading level="1" size="small">
                    Sendt til deg:
                  </Heading>
                )}
                {forespørslerSomMotpart
                  .filter((foresporsel) => !foresporsel.erAlleOver15)
                  .map((request, index) => {
                    return <OverviewCard key={index} foresporsel={request} />;
                  })}
              </div>
            </>
          )}
          {forespørslerSomHovedpart.length > 0 && (
            <div className="w-full flex flex-col gap-5">
              <Heading level="1" size="small">
                Sendt fra deg:
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
