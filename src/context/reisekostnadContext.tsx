import React, { createContext, PropsWithChildren, useState, useContext, useEffect } from "react";
import { IBrukerinformasjon } from "../types/foresporsel";
import brukerTestData from "../test-data/brukerinformasjon.json";
interface IReisekostnadContext {
  userInformation: IBrukerinformasjon | undefined;
  updateUserInformation: (user: IBrukerinformasjon) => void;
}

export const ReisekostnadContext = createContext<IReisekostnadContext | undefined>(undefined);

function ReisekostnadProvider({ children }: PropsWithChildren) {
  const [userInformation, setUserInformation] = useState<IBrukerinformasjon | undefined>(undefined);

  useEffect(() => {
    setUserInformation(brukerTestData as unknown as IBrukerinformasjon);
  }, []);

  const updateUserInformation = (user: IBrukerinformasjon) => {
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
