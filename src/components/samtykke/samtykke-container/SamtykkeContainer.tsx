import { Heading, BodyShort, ConfirmationPanel, Button } from "@navikt/ds-react";
import Link from "next/link";
import { useState } from "react";
import { SAMTYKKE_COLLAPSE } from "../../../constants/collapse";
import { MAA_SAMTYKKE } from "../../../constants/error";
import { IPerson } from "../../../types/foresporsel";
import Collapse from "../../collapse/Collapse";

interface IForesporselConfirmationProps {
  isAgree: boolean;
  showError: boolean;
}

interface ISamtykkeProps {
  barn?: IPerson[];
  hovedpart?: IPerson;
  onClick: (sendingIn: boolean) => void;
}

export default function SamtykkeContainer({ barn, hovedpart, onClick }: ISamtykkeProps) {
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

  function handleReadAndUnderstood() {
    setHaveReadAndUnderstood((current) => {
      return { isAgree: !current.isAgree, showError: current.showError ? false : true };
    });
  }

  function handleAwarenessThatRequestCannotBeWithdrawn() {
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return { isAgree: !current.isAgree, showError: current.showError ? false : true };
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
      onClick(true);
    }
  }

  return (
    <div className="grid gap-12">
      <Heading level="1" size="xlarge">
        Samtykke
      </Heading>
      <Collapse data={SAMTYKKE_COLLAPSE} />
      <div className="grid gap-7">
        <BodyShort>
          Jeg samtykker at NAV skal behandle fordeling av reisekostnader for barn
        </BodyShort>
        {barn &&
          hovedpart &&
          barn.map((person) => {
            return (
              <BodyShort className="font-bold">
                {person.fornavn} {person.foedselsdato} {hovedpart.fornavn}
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
        <Button onClick={handleSendIn}>SEND INN</Button>
        <Link href="/" className="no-underline">
          <Button type="button" variant="secondary">
            AVBRYT
          </Button>
        </Link>
      </div>
    </div>
  );
}
