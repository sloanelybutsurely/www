import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { rssSchema } from "@astrojs/rss";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.md" }),
  schema: rssSchema,
});

export const collections = { posts };
