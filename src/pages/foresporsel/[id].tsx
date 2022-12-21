import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import SamtykkeKvittering from "../../views/kvittering/samtykke-kvittering/SamtykkeKvittering";
import SamtykkeContainer from "../../views/samtykke/samtykke-container/SamtykkeContainer";
import { useRouter } from "next/router";
import { getBarnInformationText } from "../../utils/stringUtils";
import { IBrukerinformasjon, IForesporsel } from "../../types/foresporsel";
import useSWRImmutable from "swr/immutable";
import { useReisekostnad } from "../../context/reisekostnadContext";
import { ForesporselStatus } from "../../enum/foresporsel-status";
import KvitteringMedTrekkTilbake from "../../views/kvittering/kvittering-med-trekktilbake/KvitteringMedTrekkTilbake";
import Spinner from "../../components/spinner/spinner/spinner";
import { formatDate } from "../../utils/dateUtils";
import { useTranslation } from "next-i18next";
import { findForesporselById } from "../../utils/foresporselUtils";
import ForesporselKvittering from "../../views/kvittering/foresporsel-kvittering/ForesporselKvitteringContainer";
import KansellerKvittering from "../../views/kvittering/kansellert-kvittering/KansellertKvittering";
import ErrorPage from "next/error";

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
  const { erHovedpart, status, opprettet, id, deaktivertAv, barn } = foresporsel;

  return (
    <>
      {erHovedpart && status === ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEN_ANDRE_FORELDEREN && (
        <KvitteringMedTrekkTilbake
          barnInformation={barnInformation}
          sentDate={opprettet}
          status={status}
          foresporselId={id}
        />
      )}

      {erHovedpart && status === ForesporselStatus.UNDER_BEHANDLING && (
        <ForesporselKvittering barn={barn} sentDate={opprettet ? formatDate(opprettet) : ""} />
      )}

      {status === ForesporselStatus.KANSELLERT && deaktivertAv && (
        <KansellerKvittering
          barnInformation={barnInformation}
          deaktivertAv={deaktivertAv}
          isHovedpart={erHovedpart}
        />
      )}

      {!erHovedpart && status === ForesporselStatus.UNDER_BEHANDLING && <SamtykkeKvittering />}

      {!erHovedpart && status === ForesporselStatus.VENTER_PAA_SAMTYKKE_FRA_DEG && (
        <SamtykkeContainer foresporselId={id} barnInformation={barnInformation} />
      )}
    </>
  );
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "kvittering", "samtykke"])),
    },
  };
}
