import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import SamtykkeConfirmationContainer from "../../components/samtykke/samtykke-confirmation-container/SamtykkeConfirmationContainer";
import SamtykkeContainer from "../../components/samtykke/samtykke-container/SamtykkeContainer";

interface IForesporselIdProps {
  id?: string;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  return {
    props: {
      id: params?.id,
    },
  };
}

export default function ForesporselId({ id }: IForesporselIdProps) {
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(true);

  return (
    <>
      {showConfirmPage && <SamtykkeConfirmationContainer />}
      {!showConfirmPage && (
        <SamtykkeContainer onClick={(sendingInn) => setShowConfirmPage(sendingInn)} />
      )}
    </>
  );
}
