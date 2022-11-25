import { useState } from "react";
import SamtykkeConfirmationContainer from "../../views/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { calculateAge } from "../../utils/dateUtils";
import { useRouter } from "next/router";

export default function ForesporselId() {
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);
  const { userInformation } = useReisekostnad();

  if (!userInformation || !foresporselId) {
    return null;
  }

  const foresporsel = userInformation.forespørslerSomMotpart.find(
    (item) => item.idForespørsel === Number(foresporselId)
  );

  if (!foresporsel) {
    return null;
  }

  const barnInformation = foresporsel.barn.map((person) => {
    return `${person.fornavn}, ${person.fødselsdato}, ${calculateAge(person.fødselsdato)} år`;
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
