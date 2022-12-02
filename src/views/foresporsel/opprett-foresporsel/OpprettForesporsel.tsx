import { useEffect } from "react";
import { useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { useReisekostnad } from "../../../context/reisekostnadContext";
import BarnContainer from "./barn-container/BarnContainer";
import OppsummeringContainer from "./oppsummering-container/OppsummeringContainer";
import { Alert, Button, GuidePanel, Heading } from "@navikt/ds-react";
import useForesporselApi from "../../../hooks/useForesporselApi";
import ForesporselKvitteringContainer from "../foresporsel-kvittering-container/ForesporselKvitteringContainer";
import { PageMeta } from "../../../components/page-meta/PageMeta";
import ConfirmModal from "../../../components/modal/confirm-modal/ConfirmModal";
import { useRouter } from "next/router";
import { today } from "../../../utils/dateUtils";

export default function OpprettForesporsel() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
  const [samtykke, setSamtykke] = useState<boolean>(false);
  const [showBarnError, setShowBarnError] = useState<boolean>(false);
  const [showSamtykkeError, setShowSamtykkeError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { userInformation } = useReisekostnad();
  const { submitting, success, createForesporsel, failed } = useForesporselApi();
  const router = useRouter();

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
          sentDate={today()}
        />
      )}
      {!success && failed && (
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
          {userInformation && userInformation.harSkjulteFamilieenheterMedDiskresjon && (
            <Alert variant="info">TODO: personen har skjulte familieenheter med diskresjon</Alert>
          )}
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
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen((current) => !current)}
            >
              AVBRYT
            </Button>
          </div>
          <ConfirmModal
            open={open}
            header="Vil du avbryte forerspørselen?"
            content="Avbryter du nå, skal forerspørselen slettes og 
            du må starte på nytt."
            submitText="Tilbake til søknaden"
            onSubmit={() => setOpen(false)}
            onCancel={() => router.push("/")}
            onClose={() => setOpen(false)}
          />
        </>
      )}
    </div>
  );
}
