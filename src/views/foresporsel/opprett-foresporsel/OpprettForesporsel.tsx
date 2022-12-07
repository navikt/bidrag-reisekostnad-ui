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
import {
  getBarnWithNoActiveForesporsler,
  isEveryoneOver15YearsOld,
} from "../../../utils/personUtils";
import FordelingGuideCard from "../../../components/card/fordeling-guide-card/FordelingGuideCard";

export default function OpprettForesporsel() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
  const [foundPersonCouldBe15In30Days, setFoundPersonCouldBe15In30Days] = useState<boolean>(false);
  const [samtykke, setSamtykke] = useState<boolean>(false);
  const [showBarnError, setShowBarnError] = useState<boolean>(false);
  const [showSamtykkeError, setShowSamtykkeError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { userInformation } = useReisekostnad();
  const { submitting, success, createForesporsel, failed } = useForesporselApi();
  const router = useRouter();

  useEffect(() => {
    if (userInformation) {
      const barn = getBarnWithNoActiveForesporsler(userInformation);

      setAllBarn(barn);
      setFoundPersonOver15(isEveryoneOver15YearsOld(barn));
      setFoundPersonCouldBe15In30Days(barn.some((i) => i.er15Om30Dager));
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
          showWarning
        />
      )}
      {!success && failed && (
        <Alert variant="error">Det skjedde en feil ved registrering av forespørsel</Alert>
      )}
      {!success && (
        <>
          <Heading size="xlarge" level="1">
            Fordeling av reisekostnader
          </Heading>
          {allBarn.length === 0 && <Alert variant="info">Du har ingen tilgjengelig barn</Alert>}
          {allBarn.length > 0 && (
            <>
              <FordelingGuideCard />
              {userInformation && userInformation.harSkjulteFamilieenheterMedDiskresjon && (
                <Alert variant="info">
                  TODO: personen har skjulte familieenheter med diskresjon
                </Alert>
              )}
              <BarnContainer
                allBarn={allBarn}
                foundPersonOver15={foundPersonOver15}
                foundPersonCouldBe15In30Days={foundPersonCouldBe15In30Days}
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
        </>
      )}
    </div>
  );
}
