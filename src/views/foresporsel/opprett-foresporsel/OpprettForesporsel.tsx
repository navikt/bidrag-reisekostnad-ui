import { useEffect } from "react";
import { useState } from "react";
import { IPerson } from "../../../types/foresporsel";
import { useReisekostnad } from "../../../context/reisekostnadContext";
import BarnContainer from "./barn-container/BarnContainer";
import { Alert, Button, Heading } from "@navikt/ds-react";
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
import Link from "next/link";
import { Left } from "@navikt/ds-icons";
import Collapse from "../../../components/collapse/Collapse";
import { useTranslation } from "next-i18next";

export default function OpprettForesporsel() {
  const [allBarn, setAllBarn] = useState<IPerson[]>();
  const [selectedBarn, setSelectedBarn] = useState<string[]>([]);
  const [foundPersonOver15, setFoundPersonOver15] = useState<boolean>(false);
  const [foundPersonCouldBe15In30Days, setFoundPersonCouldBe15In30Days] = useState<boolean>(false);
  const [showBarnError, setShowBarnError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { userInformation } = useReisekostnad();
  const { submitting, success, createForesporsel, failed } = useForesporselApi();
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { t: foresporselTranslate } = useTranslation("opprettForesporsel");

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

    setShowBarnError(!hasSelectedBarn);

    if (hasSelectedBarn) {
      createForesporsel(selectedBarn);
    }
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
          {allBarn.length === 0 && (
            <>
              <Alert variant="info">Du har ingen tilgjengelig barn</Alert>
              <Link
                href="/"
                className="no-underline flex gap-2 items-center hover:underline"
                passHref
              >
                <Left aria-hidden />
                {translate("button.til_oversikten")}
              </Link>
            </>
          )}
          {allBarn.length > 0 && (
            <>
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
              <div className="flex gap-5">
                <Button onClick={onSubmit} loading={submitting}>
                  {translate("button.send_inn")}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen((current) => !current)}
                >
                  {translate("button.avbryt")}
                </Button>
              </div>
              <Collapse
                data={foresporselTranslate("accordion.behandling_av_personligopplysning", {
                  returnObjects: true,
                })}
              />
              <ConfirmModal
                open={open}
                header="Vil du avbryte forerspørselen?"
                content="Avbryter du nå, skal forerspørselen slettes og du må starte på nytt."
                submitText={translate("button.tilbake_til_soknad")}
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
