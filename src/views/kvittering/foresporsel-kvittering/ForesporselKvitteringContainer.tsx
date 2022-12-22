import { SuccessStroke } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { getBarnInformationText } from "../../../utils/string.utils";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import { IPerson } from "../../../types/person";

interface IForesporselKvitteringProps {
  barn: IPerson[];
  sentDate: string;
}

export default function ForesporselKvittering({ barn, sentDate }: IForesporselKvitteringProps) {
  const [selectedBarn, setSelectedBarn] = useState<IPerson[]>();
  const { t: translate } = useTranslation();
  const { t: kvitteringTranslate } = useTranslation("kvittering");

  const year = translate("aar");

  useEffect(() => {
    setSelectedBarn(barn);
  }, []);

  return (
    <ConfirmationLayout title={kvitteringTranslate("foresporsel.title")}>
      <div className="grid gap-8">
        <div className="grid gap-1">
          <span className="flex items-center">
            <div>
              <SuccessStroke color="green" fontSize="60" />
            </div>
            {kvitteringTranslate("foresporsel.description", { date: sentDate })}
          </span>
          <ul className="flex flex-col gap-3">
            {selectedBarn?.map((person, i) => {
              return (
                <li key={i} className="font-bold">
                  {getBarnInformationText(person, year)}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Heading level="2" size="medium" spacing>
            {kvitteringTranslate("foresporsel.content.title")}
          </Heading>
          <strong>{kvitteringTranslate("foresporsel.content.subtitle_1")}</strong>
          <div>{parse(kvitteringTranslate("foresporsel.content.body_1"))}</div>
          <strong>{kvitteringTranslate("foresporsel.content.subtitle_2")}</strong>
          <div>{parse(kvitteringTranslate("foresporsel.content.body_2"))}</div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
