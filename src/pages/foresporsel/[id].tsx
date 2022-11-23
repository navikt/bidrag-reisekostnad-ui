import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import SamtykkeConfirmationContainer from "../../components/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../components/samtykke/samtykke-container/SamtykkeContainer";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { calculateAge } from "../../utils/dateUtils";

interface IForesporselIdProps {
  foresporselId?: string;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  return {
    props: {
      foresporselId: params?.id,
    },
  };
}

export default function ForesporselId({ foresporselId }: IForesporselIdProps) {
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
