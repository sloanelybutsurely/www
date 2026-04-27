// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sloanelybutsurely.com",
  build: { assets: "_" },
  devToolbar: { enabled: false },
});
