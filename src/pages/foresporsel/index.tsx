import { BodyShort, ConfirmationPanel, Button } from "@navikt/ds-react";
import { useState } from "react";
import Link from "next/link";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import { MAA_SAMTYKKE } from "../../constants/error";

export default function Foresporsel() {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  function onClick() {
    setShowError(!isAgree);
    if (isAgree) {
      // TODO sende til velge barn side
    }
  }

  function onConfirm() {
    setIsAgree((current) => {
      setShowError(current);
      return !current;
    });
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <GreetingCard name={"Navn"} gender={"kvinne"} />
      <BodyShort>Dine rettigheter og plikter?</BodyShort>
      <ConfirmationPanel
        size="small"
        checked={isAgree}
        label="Jeg har lest og forstått...."
        onChange={onConfirm}
        error={showError && MAA_SAMTYKKE}
      ></ConfirmationPanel>
      <div className="w-[15rem] flex justify-between">
        <Button onClick={onClick}>NESTE</Button>
        <Link href="/" className="no-underline">
          <Button type="button" variant="secondary">
            AVBRYT
          </Button>
        </Link>
      </div>
      <Link href="https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad#NAV140507">
        Les om hvordan NAV behandler personopplysningene dine.
      </Link>
    </div>
  );
}
