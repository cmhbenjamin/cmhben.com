// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      lastmod: z.date(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});
const pages = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/pages" }),
    schema: z.object({
      title: z.string(),
      lastmod: z.date(),
      nav:z.boolean(),
      showdate:z.boolean(),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog, pages };