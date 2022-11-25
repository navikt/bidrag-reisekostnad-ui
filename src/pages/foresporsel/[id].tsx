import { useEffect, useState } from "react";
import SamtykkeConfirmationContainer from "../../views/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/stringUtils";
import { IForesporsel } from "../../types/foresporsel";

export default function ForesporselId() {
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);
  const [foresporsel, setForesporsel] = useState<IForesporsel>();
  const { userInformation } = useReisekostnad();

  useEffect(() => {
    if (foresporselId && userInformation) {
      const foresporselSomMotpart = userInformation.forespørslerSomMotpart.find(
        (item) => item.idForespørsel === Number(foresporselId)
      );

      if (foresporselSomMotpart) {
        setForesporsel(foresporselSomMotpart);
        setShowConfirmPage(foresporselSomMotpart.erAlleOver15);
      }
    }
  }, [foresporselId]);

  if (!userInformation || !foresporselId || !foresporsel) {
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
