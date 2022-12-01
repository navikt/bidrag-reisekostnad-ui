import { Loader } from "@navikt/ds-react";

export default function Spinner() {
  return (
    <div className="w-full flex flex-col items-center">
      <Loader size="3xlarge" title="venter..." variant="interaction" />
    </div>
  );
}
