import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Loader } from "@navikt/ds-react";

describe("Loader test", () => {
  test("should render loader", async () => {
    render(
      <Loader
        data-testid="spinner-testid"
        size="3xlarge"
        title="venter..."
        variant="interaction"
      />,
    );

    const loader = await screen.getByTestId("spinner-testid");
    expect(loader).toBeInTheDocument();
  });
});
