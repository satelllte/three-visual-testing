// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/three-visual-testing",
  build: {
    assets: "_compiled",
  },
  integrations: [react()],
});
