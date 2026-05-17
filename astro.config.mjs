// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkWikiLink from "@braindb/remark-wiki-link";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: "https://sloanelybutsurely.com",
  build: { assets: "_" },
  devToolbar: { enabled: false },

  markdown: {
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
    },
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          linkResolver: (path) => `/notes/${path}`,
        },
      ],
    ],
  },
});
