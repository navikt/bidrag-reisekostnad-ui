import { Heading, BodyShort, ConfirmationPanel, Button, Alert } from "@navikt/ds-react";
import Link from "next/link";
import { useState } from "react";
import { SAMTYKKE_COLLAPSE } from "../../../constants/collapse";
import { MAA_SAMTYKKE } from "../../../constants/error";
import { IPerson } from "../../../types/foresporsel";
import Collapse from "../../../components/collapse/Collapse";
import { PageMeta } from "../../../components/page-meta/PageMeta";
import useForesporselApi from "../../../hooks/useForesporselApi";
import { useEffect } from "react";

interface IForesporselConfirmationProps {
  isAgree: boolean;
  showError: boolean;
}

interface ISamtykkeProps {
  foresporselId: number;
  barnInformation: string[];
  hovedpart: IPerson;
  showConfirmation: (sendingIn: boolean) => void;
}

export default function SamtykkeContainer({
  foresporselId,
  barnInformation,
  hovedpart,
  showConfirmation,
}: ISamtykkeProps) {
  const [haveReadAndUnderstood, setHaveReadAndUnderstood] = useState<IForesporselConfirmationProps>(
    {
      isAgree: false,
      showError: false,
    }
  );
  const [isAwareThatRequestCannotBeWithdrawn, setIsAwareThatRequestCannotBeWithdrawn] =
    useState<IForesporselConfirmationProps>({
      isAgree: false,
      showError: false,
    });
  const { submitting, failed, success, samtykkeForesporsel } = useForesporselApi();

  useEffect(() => {
    if (success && !failed) {
      showConfirmation(true);
    }
  }, [success]);

  function handleReadAndUnderstood() {
    setHaveReadAndUnderstood((current) => {
      return {
        isAgree: !current.isAgree,
        showError: !!current.isAgree,
      };
    });
  }

  function handleAwarenessThatRequestCannotBeWithdrawn() {
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return {
        isAgree: !current.isAgree,
        showError: !!current.isAgree,
      };
    });
  }

  function handleSendIn() {
    setHaveReadAndUnderstood((current) => {
      return { ...current, showError: !current.isAgree };
    });
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return { ...current, showError: !current.isAgree };
    });

    if (haveReadAndUnderstood.isAgree && isAwareThatRequestCannotBeWithdrawn.isAgree) {
      samtykkeForesporsel(foresporselId);
    }
  }

  return (
    <>
      <PageMeta title="Samtykke" />
      <div className="grid gap-12">
        {!success && failed && (
          <Alert variant="error">Det skjedde en feil ved samtykke av forespørselen</Alert>
        )}
        <Heading level="1" size="xlarge">
          Samtykke
        </Heading>
        <Collapse data={SAMTYKKE_COLLAPSE} />
        <div className="grid gap-7">
          <BodyShort>
            Jeg samtykker at NAV skal behandle fordeling av reisekostnader for barn
          </BodyShort>
          {barnInformation.map((information, index) => {
            return (
              <BodyShort key={index} className="font-bold">
                {`${information} (med ${hovedpart.fornavn})`}
              </BodyShort>
            );
          })}
        </div>
        <div className="grid gap-7">
          <ConfirmationPanel
            checked={haveReadAndUnderstood.isAgree}
            label="Jeg har lest og fortstått hva fordeling av reisekostander innebærer."
            onChange={handleReadAndUnderstood}
            error={haveReadAndUnderstood.showError && MAA_SAMTYKKE}
          ></ConfirmationPanel>
          <ConfirmationPanel
            checked={isAwareThatRequestCannotBeWithdrawn.isAgree}
            label="Jeg er kjent med at denne bekreftelsen ikke kan trekkes tilbake på et senere tidspunkt."
            onChange={handleAwarenessThatRequestCannotBeWithdrawn}
            error={isAwareThatRequestCannotBeWithdrawn.showError && MAA_SAMTYKKE}
          ></ConfirmationPanel>
        </div>
        <div className="flex space-x-12">
          <Button onClick={handleSendIn} loading={submitting}>
            SEND INN
          </Button>
          <Link href="/" className="no-underline">
            <Button type="button" variant="secondary">
              AVBRYT
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
