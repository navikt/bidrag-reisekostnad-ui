import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import SamtykkeKvittering from "../../views/kvittering/samtykke-kvittering/SamtykkeKvittering";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/string.utils";
import { IBrukerinformasjon, IForesporsel } from "../../types/foresporsel";
import useSWRImmutable from "swr/immutable";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import KvitteringMedTrekkTilbake from "../../views/kvittering/kvittering-med-trekktilbake/KvitteringMedTrekkTilbake";
import Spinner from "../../components/spinner/spinner/spinner";
import { formatDate } from "../../utils/date.utils";
import { useTranslation } from "next-i18next";
import { findForesporselById } from "../../utils/foresporsel.utils";
import ForesporselKvittering from "../../views/kvittering/foresporsel-kvittering/ForesporselKvitteringContainer";
import ErrorPage from "next/error";
import { Deaktivator } from "../../enum/deaktivator";
import TrekkTilbakeKvittering from "../../views/kvittering/trekk-tilbake-kvittering/TrekkTilbakeKvittering";
import { GetStaticPropsContext } from "next";

export default function ForesporselId() {
  const router = useRouter();
  const foresporselId = router.query.id as string;
  const [foresporsel, setForesporsel] = useState<IForesporsel>();

  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
  const { userInformation, updateUserInformation } = useReisekostnad();
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  useEffect(() => {
    if (foresporselId && userInformation) {
      const foundForesporsel = findForesporselById(
        [...userInformation.forespørslerSomHovedpart, ...userInformation.forespørslerSomMotpart],
        foresporselId
      );
      setForesporsel(foundForesporsel);
    }
  }, [foresporselId, userInformation]);

  if (!userInformation || !foresporselId) {
    return <Spinner />;
  }

  if (userInformation && foresporselId && !foresporsel) {
    return <ErrorPage statusCode={404} />;
  }

  if (!foresporsel) {
    return null;
  }

  const barnInformation = foresporsel.barn.map((person) => {
    return getBarnInformationText(person, translate("aar"));
  });
  const { erHovedpart, status, opprettet, id, deaktivertAv, barn, samtykket } = foresporsel;

  return (
    <>
      {/* Kvittering med mulighet til å trekke tilbake forespørselen. Kun for hovedpart */}
      {erHovedpart && status === ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN && (
        <KvitteringMedTrekkTilbake
          barnInformation={barnInformation}
          sentDate={opprettet}
          status={status}
          foresporselId={id}
        />
      )}

      {/* En side for å samtykke forespørselen. Kun for motpart */}
      {!erHovedpart && status === ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG && (
        <SamtykkeContainer foresporselId={id} barnInformation={barnInformation} />
      )}

      {/* Kvittering når en forespørsel har blitt opprettet */}
      {erHovedpart && status === ForesporselStatus.UNDER_BEHANDLING && samtykket === null && (
        <ForesporselKvittering barn={barn} sentDate={opprettet ? formatDate(opprettet) : ""} />
      )}

      {/* Kvittering når hovedpart trukket tilbake forespørselen */}
      {status === ForesporselStatus.KANSELLERT &&
        deaktivertAv &&
        deaktivertAv === Deaktivator.HOVEDPART && (
          <TrekkTilbakeKvittering barnInformation={barnInformation} erHovedpart={erHovedpart} />
        )}

      {/*Kvittering på en samtykket og ikke-samtykket forespørsel */}
      {(samtykket !== null || (deaktivertAv && deaktivertAv === Deaktivator.MOTPART)) && (
        <SamtykkeKvittering
          status={status}
          barnInformation={barnInformation}
          erHovedpart={erHovedpart}
        />
      )}
    </>
  );
}

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "nb", ["common", "kvittering", "samtykke"])),
    },
  };
}
