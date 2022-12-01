import { useEffect } from "react";
import { useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { useReisekostnad } from "../../../context/reisekostnadContext";
import BarnContainer from "./barn-container/BarnContainer";
import OppsummeringContainer from "./oppsummering-container/OppsummeringContainer";
import { Alert, Button, GuidePanel, Heading } from "@navikt/ds-react";
import Link from "next/link";
import useCreateForesporsel from "../../../hooks/useCreateForesporsel";
import ForesporselKvitteringContainer from "../foresporsel-kvittering-container/ForesporselKvitteringContainer";
import { PageMeta } from "../../../components/page-meta/PageMeta";

export default function ForesporselVelgBarn() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
  const [samtykke, setSamtykke] = useState<boolean>(false);
  const [showBarnError, setShowBarnError] = useState<boolean>(false);
  const [showSamtykkeError, setShowSamtykkeError] = useState<boolean>(false);

  const { userInformation } = useReisekostnad();
  const { submitting, success, createForesporsel, failedToPost } = useCreateForesporsel();

  useEffect(() => {
    if (userInformation) {
      const { barnMinstFemtenÅr, motparterMedFellesBarnUnderFemtenÅr } = userInformation;
      const fellesBarnUnder15Aar = motparterMedFellesBarnUnderFemtenÅr.flatMap(
        (barn) => barn.fellesBarnUnder15År
      );

      setAllBarn([...barnMinstFemtenÅr, ...fellesBarnUnder15Aar]);
      setFoundPersonOver15(fellesBarnUnder15Aar.length > 0);
    }
  }, [userInformation]);

  if (!allBarn) {
    return null;
  }

  function onSelectBarn(selectedIdents: string[]) {
    if (showBarnError) {
      setShowBarnError(false);
    }

    setSelectedBarn(selectedIdents);
  }

  async function onSubmit() {
    const hasSelectedBarn = selectedBarn.length !== 0;
    const hasAgreed = samtykke;

    setShowBarnError(!hasSelectedBarn);
    setShowSamtykkeError(!hasAgreed);

    if (hasSelectedBarn && hasAgreed) {
      createForesporsel(selectedBarn);
    }
  }

  function onSamtykke(checked: boolean) {
    if (showSamtykkeError) {
      setShowSamtykkeError(false);
    }

    setSamtykke(checked);
  }

  return (
    <div className="grid gap-10">
      <PageMeta title="Opprett forespørsel" />
      {success && (
        <ForesporselKvitteringContainer
          barn={allBarn.filter((barn) => selectedBarn.includes(barn.ident))}
        />
      )}
      {!success && failedToPost && (
        <Alert variant="error">Det skjedde en feil ved registrering av forespørsel</Alert>
      )}
      {!success && (
        <>
          <Heading size="xlarge" level="1">
            Fordeling av reisekostander
          </Heading>
          <GuidePanel>
            <span>Noe om rettigheter og plikter</span>
            <span>
              Pluss lenke til side om reisekostander og om hvordan NAV behandler personopplysningene
              dine
            </span>
          </GuidePanel>
          <BarnContainer
            allBarn={allBarn}
            foundPersonOver15={foundPersonOver15}
            onSelectBarn={onSelectBarn}
            showError={showBarnError}
          />
          <OppsummeringContainer
            checked={samtykke}
            updateChecked={onSamtykke}
            showError={showSamtykkeError}
          />
          <div className="flex gap-5">
            <Button onClick={onSubmit} loading={submitting}>
              SEND INN
            </Button>
            <Link href="/" className="no-underline" passHref>
              <Button type="button" variant="secondary">
                AVBRYT
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
