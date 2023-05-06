import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import ListingsList from "./ListingsList";
// test change

describe("The ListingsList", () => {
  it("true to be truthy", () => {
    expect(true).toBe(true);
  });
  test("false to be falsy", () => {
    expect(false).toBe(false);
  });
});
