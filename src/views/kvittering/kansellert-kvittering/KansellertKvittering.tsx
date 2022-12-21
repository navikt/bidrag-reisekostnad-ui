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
  const [mainContent, setMainContent] = useState<string>();
  const [subContent, setSubContent] = useState<string>();

  const { t: kvitteringTranslate } = useTranslation("kvittering");

  useEffect(() => {
    //trukket tilbake av hovedpart
    if (isHovedpart) {
      if (deaktivertAv === Deaktivator.HOVEDPART) {
        setTitle(kvitteringTranslate("kanseller.den_som_kansellert.title") as unknown as string);
        setMainContent(
          kvitteringTranslate("kanseller.den_som_kansellert.main_content") as unknown as string
        );
        setSubContent(
          kvitteringTranslate("kanseller.den_som_kansellert.sub_content") as unknown as string
        );
      } else {
        setTitle(kvitteringTranslate("kanseller.den_andre_parten.title") as unknown as string);
        setMainContent(
          kvitteringTranslate("kanseller.den_andre_parten.main_content") as unknown as string
        );
        setSubContent(
          kvitteringTranslate("kanseller.den_andre_parten.sub_content") as unknown as string
        );
      }
    }
    //ikke samtykke av motpart
    if (!isHovedpart) {
      if (deaktivertAv === Deaktivator.MOTPART) {
        setTitle(kvitteringTranslate("kanseller.den_som_kansellert.title") as unknown as string);
        setMainContent(
          kvitteringTranslate("kanseller.den_som_kansellert.main_content") as unknown as string
        );
        setSubContent(
          kvitteringTranslate("kanseller.den_som_kansellert.sub_content") as unknown as string
        );
      } else {
        setTitle(kvitteringTranslate("kanseller.den_andre_parten.title") as unknown as string);
        setMainContent(
          kvitteringTranslate("kanseller.den_andre_parten.main_content") as unknown as string
        );
        setSubContent(
          kvitteringTranslate("kanseller.den_andre_parten.sub_content") as unknown as string
        );
      }
    }
  }, []);

  if (!title) {
    return null;
  }

  return (
    <ConfirmationLayout title={title}>
      <div className="flex flex-col">
        <p>{mainContent}</p>
        <ul className="pl-3">
          {barnInformation.map((information, index) => {
            return (
              <li key={index}>
                <strong>{information}</strong>
              </li>
            );
          })}
        </ul>
        <p>{subContent}</p>
      </div>
    </ConfirmationLayout>
  );
}
