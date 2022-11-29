import { Heading } from "@navikt/ds-react";
import { PropsWithChildren } from "react";

interface IStepper {
  header: string;
  step: string;
}

export default function Stepper({ header, step, children }: PropsWithChildren<IStepper>) {
  return (
    <div className="flex gap-5">
      <div>
        <div className="w-[2rem] h-[2rem] bg-deepblue-500 rounded-full flex justify-center items-center">
          <p className="text-white">{step}</p>
        </div>
      </div>
      <div>
        <Heading size="large" level="1" className="pb-4">
          {header}
        </Heading>
        {children}
      </div>
    </div>
  );
}
