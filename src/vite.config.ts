import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  test: {
    coverage: {
      include: ["src/**"],
    },
  },
});
