import { describe, it, expect } from "vitest";
import { searchActor } from "../config/services";

describe("services", () => {
  it("just a pssing test", () => {
    console.log("passing test");
  });

  it("should partially search for actors", async () => {
    const actors = await searchActor("bruce lee");
    expect(actors.length).toBeGreaterThan(0);
  });
});
