import React from "react";
import {ReactElement} from "react";
import {useState} from "react";
import {Button} from "@navikt/ds-react";
import {Close} from "@navikt/ds-icons";


export default function TokenInput(): ReactElement | null {
  const [idToken, setIdToken] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isDevelopment = process.env.IS_DEVELOPMENT
  if (!isDevelopment || !isOpen) {
    return null;
  }

  function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.cookie = `token=${idToken}`
  }

  return (
      <div
          style={{
            padding: "0 10px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            position: "fixed",
            bottom: 0,
            zIndex: 100000,
            border: "1px solid red",
            width: "100%",
            gap: "5px",
          }}
      >
        <div>Idporten token:</div>
        <form onSubmit={onFormSubmit}>
          <input style={{width: "50vw"}} onChange={(e) => setIdToken(e.target.value)}/>
          <button>submit</button>
        </form>
        <div>
          Running in dev mode. Security is disabled, provide id token manually. You can get id token by visiting{" "}
          <a href="https://bidrag-reisekostnad.dev.nav.no/api/dev/session">https://bidrag-reisekostnad.dev.nav.no/api/dev/session</a>{" "}
        </div>
        <Button type={"button"} size={"xsmall"} style={{alignSelf: "flex-end"}} variant={"tertiary"} icon={<Close/>}
                onClick={() => setIsOpen(false)}/>
      </div>
  )

}
