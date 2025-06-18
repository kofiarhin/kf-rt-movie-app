import { describe, it, expect } from "vitest";
import { searchActor, fetchTopRatedMoviesByYear } from "../config/services.js";

describe("services", () => {
  it("just a passing test", () => {
    console.log("passing test");
  });

  it("should partially search for actors", async () => {
    const actors = await searchActor("bruce lee");
    expect(actors.length).toBeGreaterThan(0);
  });

  it("should fetch popular movies by year", async () => {
    const result = await fetchTopRatedMoviesByYear();
    expect(result.length).toBeGreaterThan(0);
  });
});
