import React, { createContext, PropsWithChildren, useState, useContext, useEffect } from "react";
import { IBrukerinformasjon } from "../types/foresporsel";
import { mapToForesporselWithStatusAndPersonsAge } from "../utils/foresporselUtils";
import { mapToPersonWithAge } from "../utils/personUtils";

interface IReisekostnadContext {
  userInformation: IBrukerinformasjon | undefined;
  updateUserInformation: (user: IBrukerinformasjon) => void;
}
interface IProps {
  initialState?: IBrukerinformasjon | undefined;
}

export const ReisekostnadContext = createContext<IReisekostnadContext | undefined>(undefined);

function ReisekostnadProvider({ initialState, children }: PropsWithChildren<IProps>) {
  const [userInformation, setUserInformation] = useState<IBrukerinformasjon | undefined>(undefined);

  useEffect(() => {
    if (initialState) {
      setUserInformation(mapToUiData(initialState));
    }
  }, []);

  function mapToUiData(user: IBrukerinformasjon): IBrukerinformasjon {
    const {
      forespørslerSomMotpart,
      forespørslerSomHovedpart,
      barnMinstFemtenÅr,
      motparterMedFellesBarnUnderFemtenÅr,
    } = user;

    const forespørslerSomMotpartMedAlder = mapToForesporselWithStatusAndPersonsAge(
      forespørslerSomMotpart,
      false
    );
    const forespørslerSomHovedpartMedAlder = mapToForesporselWithStatusAndPersonsAge(
      forespørslerSomHovedpart,
      true
    );
    const barnMinstFemtenÅrMedAlder = mapToPersonWithAge(barnMinstFemtenÅr);
    const motparterMedFellesBarnUnderFemtenÅrMedAlder = motparterMedFellesBarnUnderFemtenÅr.map(
      (motpart) => {
        return { ...motpart, fellesBarnUnder15År: mapToPersonWithAge(motpart.fellesBarnUnder15År) };
      }
    );

    return {
      ...user,
      forespørslerSomMotpart: [...forespørslerSomMotpartMedAlder],
      forespørslerSomHovedpart: [...forespørslerSomHovedpartMedAlder],
      barnMinstFemtenÅr: [...barnMinstFemtenÅrMedAlder],
      motparterMedFellesBarnUnderFemtenÅr: motparterMedFellesBarnUnderFemtenÅrMedAlder,
    };
  }

  function updateUserInformation(user: IBrukerinformasjon): void {
    setUserInformation(mapToUiData(user));
  }

  return (
    <ReisekostnadContext.Provider
      value={{
        userInformation,
        updateUserInformation,
      }}
    >
      {children}
    </ReisekostnadContext.Provider>
  );
}

function useReisekostnad() {
  const context = useContext(ReisekostnadContext);
  if (context === undefined) {
    throw new Error("useReisekostnad must be used within a ReisekostnadProvider");
  }
  return context;
}

export { ReisekostnadProvider, useReisekostnad };
