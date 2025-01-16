import { render } from "vitest-browser-react";
import Spinner from "../../components/spinner/spinner/spinner";
import { describe, expect, test } from "vitest";


describe("Spinner test", () => {
  test("should render spinner", async () => {
    const result = render(
      <Spinner />
    )
    await expect.element(result.getByTestId("spinner-testid")).toBeInTheDocument();
  });
});