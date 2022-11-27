import React, { createContext, PropsWithChildren, useState, useContext, useEffect } from "react";
import { IBrukerinformasjon, IForesporsel, IPerson } from "../types/foresporsel";
import { calculateAge } from "../utils/dateUtils";
import { isEveryoneOver15YearsOld, isAgeOver15YearsOld } from "../utils/personUtils";

interface IReisekostnadContext {
  userInformation: IBrukerinformasjon | undefined;
  updateUserInformation: (user: IBrukerinformasjon) => void;
}

export const ReisekostnadContext = createContext<IReisekostnadContext | undefined>(undefined);

function ReisekostnadProvider({ children }: PropsWithChildren) {
  const [userInformation, setUserInformation] = useState<IBrukerinformasjon | undefined>(undefined);

  const updateUserInformation = (user: IBrukerinformasjon) => {
    const foresporslerSomMotpart = user.forespørslerSomMotpart;

    const forespørslerSomMotpartMedAlder = foresporslerSomMotpart.map((foresporsel) => ({
      ...foresporsel,
      barn: foresporsel.barn.map((person) => ({
        ...person,
        alder: calculateAge(person.fødselsdato),
        erOver15: isAgeOver15YearsOld(person.fødselsdato),
      })),
      erAlleOver15: isEveryoneOver15YearsOld(foresporsel.barn as IPerson[]),
    })) as unknown as IForesporsel[];

    user = {
      ...user,
      forespørslerSomMotpart: [...forespørslerSomMotpartMedAlder],
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
