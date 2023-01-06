import { Heading, ConfirmationPanel, Button, Alert, RadioGroup, Radio } from "@navikt/ds-react";
import Link from "next/link";
import { useState } from "react";
import { PageMeta } from "../../../components/page-meta/PageMeta";
import { useForesporselApi } from "../../../hooks/useForesporselApi";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

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
  const [isSamtykke, setIsSamtykke] = useState<boolean>();
  const [showRadioError, setShowRadioError] = useState<boolean>(false);
  const { submitting, failed, success, samtykkeForesporsel, trekkeForesporsel } =
    useForesporselApi();
  const { t: translate } = useTranslation();
  const { t: samtykkeTranslate } = useTranslation("samtykke");

  function handleReadAndUnderstood() {
    setHaveReadAndUnderstood((current) => {
      return {
        isAgree: !current.isAgree,
        showError: !!current.isAgree,
      };
    });
  }

  async function handleSendIn() {
    if (isSamtykke === undefined) {
      setShowRadioError(true);
    } else {
      setHaveReadAndUnderstood((current) => {
        return { ...current, showError: !current.isAgree };
      });

      if (haveReadAndUnderstood.isAgree) {
        if (isSamtykke) {
          await samtykkeForesporsel(foresporselId);
        } else {
          await trekkeForesporsel(foresporselId);
        }
      }
    }
  }

  function handleRadioGroup(value: boolean) {
    setShowRadioError(false);
    setIsSamtykke(value);
  }

  return (
    <>
      <PageMeta title={samtykkeTranslate("page_title")} />
      <div className="grid gap-12">
        {!success && failed && <Alert variant="error">{translate("errors.tekniskfeil")}</Alert>}
        <Heading level="1" size="xlarge">
          {samtykkeTranslate("title")}
        </Heading>
        <div className="grid gap-7">
          <div className="leading-relaxed">{parse(samtykkeTranslate("description"))}</div>
          <RadioGroup
            legend={
              <>
                {samtykkeTranslate("radio.legend")}
                <ul className="flex flex-col gap-1 list-none pl-0">
                  {barnInformation.map((information, index) => {
                    return (
                      <li key={index} className="font-bold">
                        {information}
                      </li>
                    );
                  })}
                </ul>
              </>
            }
            onChange={handleRadioGroup}
            error={showRadioError && translate("errors.maa_velge")}
          >
            <Radio value={true}>{samtykkeTranslate("radio.ja")}</Radio>
            <Radio value={false}>{samtykkeTranslate("radio.nei")}</Radio>
          </RadioGroup>
        </div>
        <div className="grid gap-7">
          <ConfirmationPanel
            checked={haveReadAndUnderstood.isAgree}
            label={parse(samtykkeTranslate("confirmation_panel.lest_og_forstaatt"))}
            onChange={handleReadAndUnderstood}
            error={haveReadAndUnderstood.showError && translate("errors.maa_samtykke")}
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
