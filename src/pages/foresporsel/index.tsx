import { BodyShort, ConfirmationPanel, Button } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import GreetingCard from "../../components/card/greeting-card/GreetingCard";
import { MAA_SAMTYKKE } from "../../constants/error";
import { PageMeta } from "../../components/page-meta/PageMeta";
import ForesporselVelgBarn from "../../views/foresporsel/foresporsel-velg-barn/ForesporselVelgBarn";
import useSWRImmutable from "swr/immutable";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function Foresporsel() {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showStep2, setShowStep2] = useState<boolean>(false);
  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
  const { userInformation, updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  if (!userInformation || !data) {
    return null;
  }

  function onClick() {
    setShowError(!isAgree);
    if (isAgree) {
      setShowStep2(true);
    } else {
      setShowStep2(false);
    }
  }

  function onConfirm() {
    setIsAgree((current) => {
      setShowError(current);
      return !current;
    });
  }

  return (
    <>
      <PageMeta title="Sende forespørsel" />
      <div className="flex flex-col gap-10 items-center">
        {!showStep2 && (
          <>
            <GreetingCard name={userInformation?.fornavn} gender={userInformation.kjønn} />
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
          </>
        )}

        {showStep2 && <ForesporselVelgBarn />}
      </div>
    </>
  );
}
