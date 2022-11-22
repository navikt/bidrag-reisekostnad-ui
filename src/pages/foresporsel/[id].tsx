import { Accordion, BodyShort, Button, ConfirmationPanel } from "@navikt/ds-react";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { MAA_SAMTYKKE } from "../../constants/error";

interface IForesporselIdProps {
  id?: string;
}

interface IForesporselConfirmationProps {
  isAgree: boolean;
  showError: boolean;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  return {
    props: {
      id: params?.id,
    },
  };
}

export default function ForesporselId({ id }: IForesporselIdProps) {
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
      return { isAgree: !current.isAgree, showError: !current.showError };
    });
  }

  function handleAwarenessThatRequestCannotBeWithdrawn() {
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return { isAgree: !current.isAgree, showError: !current.showError };
    });
  }

  function onClick() {
    setHaveReadAndUnderstood((current) => {
      return { ...current, showError: !current.isAgree };
    });
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return { ...current, showError: !current.isAgree };
    });

    if (haveReadAndUnderstood.isAgree && isAwareThatRequestCannotBeWithdrawn.isAgree) {
      // TODO til bekreftelse på innsending
    }
  }

  console.log("ForesporselId", id);
  return (
    <div className="grid gap-14">
      <Accordion>
        <Accordion.Item className="grid gap-5">
          <Accordion.Header>
            Hva innebærer det å samtykke til fordeling av reisekostnader?
          </Accordion.Header>
          <Accordion.Content>TODO</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            Hva hvis jeg ikke er enig om fordeling av reisekostander?
          </Accordion.Header>
          <Accordion.Content>TODO</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <div className="grid gap-7">
        <BodyShort>
          Jeg samtykker at NAV skal behandle fordeling av reisekostnader for barn
        </BodyShort>
        <BodyShort className="font-bold">Barn 3, dd.mm.yyyy, 5 år (med Kari Normann)</BodyShort>
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
        <Button onClick={onClick}>SEND INN</Button>
        <Button type="button" variant="secondary">
          AVBRYT
        </Button>
      </div>
    </div>
  );
}
