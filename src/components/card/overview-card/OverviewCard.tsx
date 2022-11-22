import { LinkPanel, Tag } from "@navikt/ds-react";
import React from "react";

export default function OverviewCard() {
  return (
    <LinkPanel href="#" border>
      <LinkPanel.Title className="text-medium">Reisekostnader</LinkPanel.Title>
      <LinkPanel.Description>Fra: Kari Nordmann</LinkPanel.Description>
      <Tag variant="warning" className="mt-3">
        Status
      </Tag>
    </LinkPanel>
  );
}
