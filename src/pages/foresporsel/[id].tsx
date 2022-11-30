import { useEffect, useState } from "react";
import SamtykkeKvitteringContainer from "../../views/samtykke/samtykke-kvittering-container/SamtykkeKvitteringContainer";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/stringUtils";
import { IBrukerinformasjon, IForesporsel } from "../../types/foresporsel";
import useSWRImmutable from "swr/immutable";
import { Loader } from "@navikt/ds-react";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { findForesporselById } from "../../utils/foresporselUtils";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import KvitteringMedTrekkTilbake from "../../views/kvittering-med-trekktilbake/KvitteringMedTrekkTilbake";
import ForesporselKvitteringContainer from "../../views/foresporsel/foresporsel-kvittering-container/ForesporselKvitteringContainer";

export default function ForesporselId() {
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);
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
        // show confirmation page if barn is over 15 years old
        setShowConfirmPage(foresporselSomMotpart?.erAlleOver15 ?? false);
      }
    }
  }, [foresporselId, userInformation]);

  if (!userInformation) {
    <div className="w-full flex flex-col items-center">
      <Loader size="3xlarge" title="venter..." variant="interaction" />
    </div>;
  }

  if (!foresporselId || !foresporsel) {
    return null;
  }

  const barnInformation = foresporsel.barn.map((person) => {
    return getBarnInformationText(person);
  });

  return (
    <>
      {/* should be possible to cancel the request if barn is under 15 years old */}
      {isHovedpart &&
        foresporsel.status === ForesporselStatus.VENTER_PAA_SAMTYKKE &&
        !foresporsel.erAlleOver15 && (
          <KvitteringMedTrekkTilbake barnInformation={barnInformation} />
        )}

      {/* should not be possible to cancel the request if barn is over 15 years old */}
      {isHovedpart &&
        foresporsel.status !== ForesporselStatus.VENTER_PAA_SAMTYKKE &&
        foresporsel.erAlleOver15 && <ForesporselKvitteringContainer />}

      {!isHovedpart && showConfirmPage && (
        <SamtykkeKvitteringContainer barnInformation={barnInformation} />
      )}

      {!isHovedpart && !showConfirmPage && (
        <SamtykkeContainer
          onClick={(sendingInn) => setShowConfirmPage(sendingInn)}
          barnInformation={barnInformation}
          hovedpart={foresporsel.hovedpart}
        />
      )}
    </>
  );
}
