import React, { createContext, PropsWithChildren, useState, useContext } from "react";
import { IBrukerinformasjon } from "../types/foresporsel";
import { mapToForesporselWithPersonsAge } from "../utils/foresporselUtils";
import { mapToPersonWithAge } from "../utils/personUtils";

interface IReisekostnadContext {
  userInformation: IBrukerinformasjon | undefined;
  updateUserInformation: (user: IBrukerinformasjon) => void;
}

export const ReisekostnadContext = createContext<IReisekostnadContext | undefined>(undefined);

function ReisekostnadProvider({ children }: PropsWithChildren) {
  const [userInformation, setUserInformation] = useState<IBrukerinformasjon | undefined>(undefined);

  const updateUserInformation = (user: IBrukerinformasjon) => {
    const {
      forespørslerSomMotpart,
      forespørslerSomHovedpart,
      barnMinstFemtenÅr,
      motparterMedFellesBarnUnderFemtenÅr,
    } = user;

    const forespørslerSomMotpartMedAlder = mapToForesporselWithPersonsAge(forespørslerSomMotpart);
    const forespørslerSomHovedpartMedAlder =
      mapToForesporselWithPersonsAge(forespørslerSomHovedpart);
    const barnMinstFemtenÅrMedAlder = mapToPersonWithAge(barnMinstFemtenÅr);
    const motparterMedFellesBarnUnderFemtenÅrMedAlder = motparterMedFellesBarnUnderFemtenÅr.map(
      (motpart) => {
        return { ...motpart, fellesBarnUnder15År: mapToPersonWithAge(motpart.fellesBarnUnder15År) };
      }
    );

    user = {
      ...user,
      forespørslerSomMotpart: [...forespørslerSomMotpartMedAlder],
      forespørslerSomHovedpart: [...forespørslerSomHovedpartMedAlder],
      barnMinstFemtenÅr: [...barnMinstFemtenÅrMedAlder],
      motparterMedFellesBarnUnderFemtenÅr: motparterMedFellesBarnUnderFemtenÅrMedAlder,
    };
    console.log(user);
    setUserInformation(user);
  };

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
