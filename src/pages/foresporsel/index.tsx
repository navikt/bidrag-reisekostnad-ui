import { useEffect } from "react";
import ForesporselVelgBarn from "../../views/foresporsel/foresporsel-velg-barn/ForesporselVelgBarn";
import useSWRImmutable from "swr/immutable";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { useReisekostnad } from "../../context/reisekostnadContext";
import Spinner from "../../components/spinner/spinner/spinner";

export default function Foresporsel() {
  const { data } = useSWRImmutable<IBrukerinformasjon>("/api/brukerinformasjon");
  const { userInformation, updateUserInformation } = useReisekostnad();

  useEffect(() => {
    if (data) {
      updateUserInformation(data);
    }
  }, [data]);

  if (!userInformation || !data) {
    return <Spinner />;
  }

  return <ForesporselVelgBarn />;
}
