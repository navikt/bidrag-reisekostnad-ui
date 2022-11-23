import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import SamtykkeConfirmationContainer from "../../components/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../components/samtykke/samtykke-container/SamtykkeContainer";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { IForesporsel } from "../../types/foresporsel";

interface IForesporselIdProps {
  foresporslerSomMotpart?: IForesporsel;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const { userInformation } = useReisekostnad();
  const foresporsel = userInformation?.foresporslerSomMotpart.find(
    (item) => item.idForesporsel === Number(params?.id)
  );
  return {
    props: {
      foresporslerSomMotpart: foresporsel,
    },
  };
}

export default function ForesporselId({ foresporslerSomMotpart }: IForesporselIdProps) {
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);

  return (
    <>
      {showConfirmPage ? (
        <SamtykkeConfirmationContainer />
      ) : (
        <SamtykkeContainer
          onClick={(sendingInn) => setShowConfirmPage(sendingInn)}
          barn={foresporslerSomMotpart?.barn}
          hovedpart={foresporslerSomMotpart?.hovedpart}
        />
      )}
    </>
  );
}
