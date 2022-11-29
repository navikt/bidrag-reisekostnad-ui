import { useEffect, useState } from "react";
import SamtykkeConfirmationContainer from "../../views/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/stringUtils";
import { IBrukerinformasjon, IForesporsel } from "../../types/foresporsel";
import useSWRImmutable from "swr/immutable";
import { Loader } from "@navikt/ds-react";
import { useReisekostnad } from "../../context/reisekostnadContext";

export default function ForesporselId() {
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);
  const [foresporsel, setForesporsel] = useState<IForesporsel>();

  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
  const { userInformation, updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  useEffect(() => {
    if (foresporselId && userInformation) {
      const foresporselSomMotpart = userInformation.forespørslerSomMotpart.find(
        (item) => item.idForespørsel === Number(foresporselId)
      );
      if (foresporselSomMotpart) {
        setForesporsel(foresporselSomMotpart);
        setShowConfirmPage(foresporselSomMotpart.erAlleOver15);
      } else {
        const foresporslerSomHovedpart = userInformation.forespørslerSomHovedpart.find(
          (item) => item.idForespørsel === Number(foresporselId)
        );
        setForesporsel(foresporslerSomHovedpart);
        setShowConfirmPage(!!foresporslerSomHovedpart);
      }
    }
  }, [foresporselId]);

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
      {showConfirmPage ? (
        <SamtykkeConfirmationContainer barnInformation={barnInformation} />
      ) : (
        <SamtykkeContainer
          onClick={(sendingInn) => setShowConfirmPage(sendingInn)}
          barnInformation={barnInformation}
          hovedpart={foresporsel.hovedpart}
        />
      )}
    </>
  );
}
