import { Accordion } from '@navikt/ds-react';
import parse from 'html-react-parser';

export interface ICollapseData {
    header: string;
    content: string;
}

interface ICollapseProps {
    data: ICollapseData[];
    contentClassName?: string;
}

export default function Collapse({ data, contentClassName }: ICollapseProps) {
    return (
        <Accordion>
            {data.map((item, index) => (
                <Accordion.Item key={index}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Content className={contentClassName}>
                        {parse(item.content)}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
