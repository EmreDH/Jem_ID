import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("App rendert zonder fouten", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(true).toBe(true);
});
