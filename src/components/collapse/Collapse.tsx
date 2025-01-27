import { Accordion } from '@navikt/ds-react';
import parse from 'html-react-parser';

export interface ICollapseData {
    header: string;
    content: string;
}

interface ICollapseProps {
    data: ICollapseData[];
    contentClassNames?: string;
}

export default function Collapse({ data, contentClassNames }: ICollapseProps) {
    return (
        <Accordion className="w-full flex flex-col gap-5">
            {data.map((item, index) => {
                return (
                    <Accordion.Item key={index} className="border border-lightblue-400">
                        <Accordion.Header>{item.header}</Accordion.Header>
                        <Accordion.Content className={contentClassNames}>
                            {parse(item.content)}
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
