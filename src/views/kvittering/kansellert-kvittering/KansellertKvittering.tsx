import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { Deaktivator } from "../../../enum/deaktivator";

interface IKansellertKvitteringProps {
  barnInformation: string[];
  deaktivertAv: Deaktivator;
  isHovedpart: boolean;
}

export default function KansellerKvittering({
  barnInformation,
  deaktivertAv,
  isHovedpart,
}: IKansellertKvitteringProps) {
  const [title, setTitle] = useState<string>();
  const [content1, setContent1] = useState<string>();
  const [content2, setContent2] = useState<string>();

  const { t: kvitteringTranslate } = useTranslation("kvittering");

  useEffect(() => {
    //trukket tilbake av hovedpart
    if (isHovedpart) {
      setTitle(kvitteringTranslate("kanseller.motpart.title") as unknown as string);
      setContent2(kvitteringTranslate("kanseller.motpart.content") as unknown as string);
      if (deaktivertAv === Deaktivator.HOVEDPART) {
        setContent1(kvitteringTranslate("kanseller.for_den_som_kansellert") as unknown as string);
      } else {
        setContent1(kvitteringTranslate("kanseller.for_den_andre_parten") as unknown as string);
      }
    }
    //ikke samtykke av motpart
    if (!isHovedpart) {
      setTitle(kvitteringTranslate("kanseller.hovedpart.title") as unknown as string);
      setContent2(kvitteringTranslate("kanseller.hovedpart.content") as unknown as string);
      if (deaktivertAv === Deaktivator.MOTPART) {
        setContent1(kvitteringTranslate("kanseller.motpart.title") as unknown as string);
      } else {
        setContent1(kvitteringTranslate("kanseller.for_den_andre_parten") as unknown as string);
      }
    }
  }, []);

  if (!title) {
    return null;
  }

  return (
    <ConfirmationLayout title={title}>
      <div className="flex flex-col">
        <p>{content1}</p>
        <ul className="pl-3">
          {barnInformation.map((information, index) => {
            return (
              <li key={index}>
                <strong>{information}</strong>
              </li>
            );
          })}
        </ul>
        <p>{content2}</p>
      </div>
    </ConfirmationLayout>
  );
}
