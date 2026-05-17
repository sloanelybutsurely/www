import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { rssSchema } from "@astrojs/rss";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.md" }),
  schema: rssSchema,
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { posts, notes };
