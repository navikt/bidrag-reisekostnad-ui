import { LinkPanel, Tag } from "@navikt/ds-react";
import React from "react";

interface IOverviewCardProps {
  name: string;
  status: string;
}

export default function OverviewCard({ name, status }: IOverviewCardProps) {
  return (
    <LinkPanel href="#" border>
      <LinkPanel.Title className="text-medium">Reisekostnader</LinkPanel.Title>
      <LinkPanel.Description>Fra: {name}</LinkPanel.Description>
      <Tag variant="warning" size="small" className="mt-3">
        {status}
      </Tag>
    </LinkPanel>
  );
}
