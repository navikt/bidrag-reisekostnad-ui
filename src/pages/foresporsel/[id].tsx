import { Accordion, BodyShort, Button, ConfirmationPanel, Heading } from "@navikt/ds-react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Samtykke from "../../components/overview/samtykke/Samtykke";
import { MAA_SAMTYKKE } from "../../constants/error";

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
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);

  return (
    <>
      {showConfirmPage && <p>confirm page</p>}
      {!showConfirmPage && <Samtykke onClick={(sendingInn) => setShowConfirmPage(sendingInn)} />}
    </>
  );
}
