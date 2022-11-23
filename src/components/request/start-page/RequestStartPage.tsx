import { BodyShort, ConfirmationPanel, Button, Link } from "@navikt/ds-react";
import React, { useState } from "react";
import GreetingCard from "../../card/greeting-card/GreetingCard";

export default function RequestStartPage() {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  function onClick() {
    setShowError(!isAgree);
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
        error={showError && "Du må samtykke før du kan fortsette."}
      ></ConfirmationPanel>
      <div className="flex space-x-12">
        <Button onClick={onClick}>Neste</Button>
        {/* TODO: SKAL LEDE TILBAKE TIL OVERSIKTSIDE? */}
        <Button type="button" variant="secondary">
          Avbryt
        </Button>
      </div>
      <Link href="https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad#NAV140507">
        Les om hvordan NAV behandler personopplysningene dine.
      </Link>
    </div>
  );
}
