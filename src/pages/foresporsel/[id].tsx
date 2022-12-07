import { useEffect, useState } from "react";
import SamtykkeKvitteringContainer from "../../views/samtykke/samtykke-kvittering-container/SamtykkeKvitteringContainer";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/stringUtils";
import { IBrukerinformasjon, IForesporsel } from "../../types/foresporsel";
import useSWRImmutable from "swr/immutable";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { findForesporselById } from "../../utils/foresporselUtils";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import KvitteringMedTrekkTilbake from "../../views/kvittering-med-trekktilbake/KvitteringMedTrekkTilbake";
import ForesporselKvitteringContainer from "../../views/foresporsel/foresporsel-kvittering-container/ForesporselKvitteringContainer";
import Spinner from "../../components/spinner/spinner/spinner";
import { formatDate } from "../../utils/dateUtils";

export default function ForesporselId() {
  const STATUS_TO_RENDER_CONFIRMATION = [
    ForesporselStatus.UNDER_BEHANDLING,
    ForesporselStatus.VENTER_PAA_OVERFORING,
    ForesporselStatus.TREKKET_TILBAKE,
  ];
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [foresporsel, setForesporsel] = useState<IForesporsel>();

  const [isHovedpart, setIsHovedpart] = useState<boolean>(false);

  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
  const { userInformation, updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  useEffect(() => {
    if (foresporselId && userInformation) {
      const foresporselSomHovedpart = findForesporselById(
        userInformation.forespørslerSomHovedpart,
        foresporselId
      );
      const hovedpart = userInformation.fornavn === foresporselSomHovedpart?.hovedpart.fornavn;
      setIsHovedpart(hovedpart);

      if (hovedpart) {
        setForesporsel(foresporselSomHovedpart);
      } else {
        const foresporselSomMotpart = findForesporselById(
          userInformation.forespørslerSomMotpart,
          foresporselId
        );
        setForesporsel(foresporselSomMotpart);
      }
    }
  }, [foresporselId, userInformation, isHovedpart]);

  if (!userInformation || !foresporselId || !foresporsel) {
    return <Spinner />;
  }

  const barnInformation = foresporsel.barn.map((person) => {
    return getBarnInformationText(person);
  });

  return (
    <>
      {isHovedpart && foresporsel.status === ForesporselStatus.VENTER_PAA_SAMTYKKE && (
        <KvitteringMedTrekkTilbake
          barnInformation={barnInformation}
          sentDate={foresporsel.opprettet}
          status={foresporsel.status}
          foresporselId={foresporsel.id}
        />
      )}

      {isHovedpart && STATUS_TO_RENDER_CONFIRMATION.includes(foresporsel.status) && (
        <ForesporselKvitteringContainer
          barn={foresporsel.barn}
          sentDate={foresporsel.opprettet ? formatDate(foresporsel.opprettet) : ""}
        />
      )}

      {!isHovedpart && STATUS_TO_RENDER_CONFIRMATION.includes(foresporsel.status) && (
        <SamtykkeKvitteringContainer barnInformation={barnInformation} />
      )}

      {!isHovedpart && foresporsel.status === ForesporselStatus.VENTER_PAA_SAMTYKKE && (
        <SamtykkeContainer
          foresporselId={foresporsel.id}
          barnInformation={barnInformation}
          hovedpart={foresporsel.hovedpart}
        />
      )}
    </>
  );
}
