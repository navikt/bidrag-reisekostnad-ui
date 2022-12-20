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

  const [isHovedpart, setIsHovedpart] = useState<boolean>(false);

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
      }
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

  return (
    <>
      {isHovedpart && foresporsel.status === ForesporselStatus.VENTER_PAA_SAMTYKKE && (
        <KvitteringMedTrekkTilbake
          barnInformation={barnInformation}
          sentDate={foresporsel.opprettet}
          status={foresporsel.status}
          foresporselId={foresporsel.id}
        />
      )}

      {isHovedpart && foresporsel.status === ForesporselStatus.UNDER_BEHANDLING && (
        <ForesporselKvittering
          barn={foresporsel.barn}
          sentDate={foresporsel.opprettet ? formatDate(foresporsel.opprettet) : ""}
        />
      )}

      {foresporsel.status === ForesporselStatus.KANSELLERT && foresporsel.deaktivertAv && (
        <KansellerKvittering
          barnInformation={barnInformation}
          deaktivertAv={foresporsel.deaktivertAv}
          isHovedpart={isHovedpart}
        />
      )}

      {!isHovedpart && foresporsel.status === ForesporselStatus.UNDER_BEHANDLING && (
        <SamtykkeKvittering
          barnInformation={barnInformation}
          deaktivertAv={foresporsel.deaktivertAv}
        />
      )}

      {!isHovedpart && foresporsel.status === ForesporselStatus.VENTER_PAA_SAMTYKKE && (
        <SamtykkeContainer foresporselId={foresporsel.id} barnInformation={barnInformation} />
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
