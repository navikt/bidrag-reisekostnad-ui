import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { ReisekostnadProvider } from "../../context/reisekostnadContext";
import { IBrukerinformasjon } from "../../types/foresporsel";
import { fetcher } from "../../utils/api.utils";
import { mockRouter } from "../utils/router.utils";

interface IMockContextProps {
  reisekostnadProviderInitialState?: IBrukerinformasjon | undefined;
  router?: NextRouter;
}

export function MockContext({
  children,
  router,
  reisekostnadProviderInitialState,
}: PropsWithChildren<IMockContextProps>) {
  return (
    <div id="__next">
      <RouterContext.Provider value={router ?? mockRouter}>
        <ReisekostnadProvider initialState={reisekostnadProviderInitialState}>
          <SWRConfig value={{ fetcher, dedupingInterval: 0, provider: () => new Map() }}>
            {children}
          </SWRConfig>
        </ReisekostnadProvider>
      </RouterContext.Provider>
    </div>
  );
}
