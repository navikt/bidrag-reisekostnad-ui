import { Accordion } from "@navikt/ds-react";
import { ReactNode } from "react";

export interface ICollapseData {
  header: string;
  content: ReactNode;
}

interface ICollapseProps {
  data: ICollapseData[];
}

export default function Collapse({ data }: ICollapseProps) {
  return (
    <Accordion className="w-full flex flex-col gap-5">
      {data.map((item, index) => {
        return (
          <Accordion.Item key={index} className="border border-lightblue-400">
            <Accordion.Header>{item.header}</Accordion.Header>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
