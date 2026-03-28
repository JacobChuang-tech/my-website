import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    series: z.string().optional(),
    seriesNumber: z.number().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.string(),
  }),
});

export const collections = { writing };
