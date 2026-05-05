// @ts-check
import { defineConfig } from "astro/config";
import remarkWikiLink from "@braindb/remark-wiki-link";

// https://astro.build/config
export default defineConfig({
  site: "https://sloanelybutsurely.com",
  build: { assets: "_" },
  devToolbar: { enabled: false },
  markdown: {
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
