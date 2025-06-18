import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./server/__test__/setup",
    include: ["server/**/*.test.js"], // 👈 only run tests inside server/
  },
});
