import { Heading, BodyShort, ConfirmationPanel, Button, Alert } from "@navikt/ds-react";
import Link from "next/link";
import { useState } from "react";
import { MAA_SAMTYKKE } from "../../../constants/error";
import Collapse from "../../../components/collapse/Collapse";
import { PageMeta } from "../../../components/page-meta/PageMeta";
import useForesporselApi from "../../../hooks/useForesporselApi";
import { useTranslation } from "next-i18next";

interface IForesporselConfirmationProps {
  isAgree: boolean;
  showError: boolean;
}

interface ISamtykkeProps {
  foresporselId: number;
  barnInformation: string[];
}

export default function SamtykkeContainer({ foresporselId, barnInformation }: ISamtykkeProps) {
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
  const { t: translate } = useTranslation();
  const { t: samtykkeTranslate } = useTranslation("samtykke");
  const { t: errorsTranslate } = useTranslation("errors");

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

  async function handleSendIn() {
    setHaveReadAndUnderstood((current) => {
      return { ...current, showError: !current.isAgree };
    });
    setIsAwareThatRequestCannotBeWithdrawn((current) => {
      return { ...current, showError: !current.isAgree };
    });

    if (haveReadAndUnderstood.isAgree && isAwareThatRequestCannotBeWithdrawn.isAgree) {
      await samtykkeForesporsel(foresporselId);
    }
  }

  return (
    <>
      <PageMeta title="Samtykke" />
      <div className="grid gap-12">
        {!success && failed && <Alert variant="error">{errorsTranslate("samtykke_failed")}</Alert>}
        <Heading level="1" size="xlarge">
          {samtykkeTranslate("title")}
        </Heading>
        <Collapse data={samtykkeTranslate("accordion", { returnObjects: true })} />
        <div className="grid gap-7">
          <BodyShort>{samtykkeTranslate("samtykk_message")}</BodyShort>
          {barnInformation.map((information, index) => {
            return (
              <BodyShort key={index} className="font-bold">
                {information}
              </BodyShort>
            );
          })}
        </div>
        <div className="grid gap-7">
          <ConfirmationPanel
            checked={haveReadAndUnderstood.isAgree}
            label={samtykkeTranslate("confirmation_panel.lest_og_forstått")}
            onChange={handleReadAndUnderstood}
            error={haveReadAndUnderstood.showError && MAA_SAMTYKKE}
          ></ConfirmationPanel>
          <ConfirmationPanel
            checked={isAwareThatRequestCannotBeWithdrawn.isAgree}
            label={samtykkeTranslate("confirmation_panel.ikke_kan_trekkes_tilbake")}
            onChange={handleAwarenessThatRequestCannotBeWithdrawn}
            error={isAwareThatRequestCannotBeWithdrawn.showError && MAA_SAMTYKKE}
          ></ConfirmationPanel>
        </div>
        <div className="flex space-x-12">
          <Button onClick={handleSendIn} loading={submitting}>
            {translate("button.send_inn")}
          </Button>
          <Link href="/" className="no-underline">
            <Button type="button" variant="secondary">
              {translate("button.avbryt")}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
