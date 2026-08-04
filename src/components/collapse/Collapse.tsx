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
        <Accordion>
            {data.map((item, index) => (
                <Accordion.Item key={index}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Content className={contentClassNames}>
                        {parse(item.content)}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
