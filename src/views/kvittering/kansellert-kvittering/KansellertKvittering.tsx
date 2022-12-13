import { useTranslation } from "react-i18next";
import ConfirmationLayout from "../../../components/layout/confirmation-layout/ConfirmationLayout";
import { Deaktivator } from "../../../enum/deaktivator";

interface IKansellertKvitteringProps {
  barnInformation: string[];
  deaktivertAv: Deaktivator;
}

export default function KansellerKvittering({
  barnInformation,
  deaktivertAv,
}: IKansellertKvitteringProps) {
  const { t: kvitteringTranslate } = useTranslation("kvittering");
  const deaktivertAvHovedPart = deaktivertAv === Deaktivator.HOVEDPART;
  const title = deaktivertAvHovedPart
    ? kvitteringTranslate("kanseller.hovedpart.title")
    : kvitteringTranslate("kanseller.motpart.title");
  const content1 = deaktivertAvHovedPart
    ? kvitteringTranslate("kanseller.hovedpart.content_1")
    : kvitteringTranslate("kanseller.motpart.content_1");
  const content2 = deaktivertAvHovedPart
    ? kvitteringTranslate("kanseller.hovedpart.content_2")
    : kvitteringTranslate("kanseller.motpart.content_2");

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
