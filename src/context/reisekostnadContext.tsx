import React, { createContext, PropsWithChildren, useState, useContext } from "react";

interface IReisekostnadContext {
  isAgree: boolean;
  updateIsAgree: (isAgree: boolean) => void;
}

export const ReisekostnadContext = createContext<IReisekostnadContext | undefined>(undefined);

function ReisekostnadProvider({ children }: PropsWithChildren) {
  const [isAgree, setIsAgreed] = useState<boolean>(false);

  const updateIsAgree = (isAgree: boolean) => {
    setIsAgreed(isAgree);
  };

  return (
    <ReisekostnadContext.Provider value={{ isAgree, updateIsAgree }}>
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
