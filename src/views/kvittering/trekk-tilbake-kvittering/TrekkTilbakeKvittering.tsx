import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";

interface ITrekkTilbakeKvitteringProps {
  barnInformation: string[];
  erHovedpart: boolean;
}

export default function TrekkTilbakeKvittering({
  barnInformation,
  erHovedpart,
}: ITrekkTilbakeKvitteringProps) {
  const [title, setTitle] = useState<string>();
  const [mainContent, setMainContent] = useState<string>();
  const [subContent, setSubContent] = useState<string>();

  const { t: kvitteringTranslate } = useTranslation("kvittering");

  useEffect(() => {
    if (erHovedpart) {
      setTitle(kvitteringTranslate("trukket_tilbake.den_som_trukket.title") as unknown as string);
      setMainContent(
        kvitteringTranslate("trukket_tilbake.den_som_trukket.main_content") as unknown as string
      );
      setSubContent(
        kvitteringTranslate("trukket_tilbake.den_som_trukket.sub_content") as unknown as string
      );
    } else {
      setTitle(kvitteringTranslate("trukket_tilbake.den_andre_parten.title") as unknown as string);
      setMainContent(
        kvitteringTranslate("trukket_tilbake.den_andre_parten.main_content") as unknown as string
      );
      setSubContent(
        kvitteringTranslate("trukket_tilbake.den_andre_parten.sub_content") as unknown as string
      );
    }
  }, [erHovedpart]);

  if (!title) {
    return null;
  }

  return (
    <ConfirmationLayout title={title}>
      <div className="flex flex-col">
        <p>{mainContent}</p>
        <ul className="p-0 m-0">
          {barnInformation.map((information, index) => {
            return (
              <li key={index} className="list-none">
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
