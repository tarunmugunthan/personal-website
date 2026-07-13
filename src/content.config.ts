import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      status: z.enum(['draft', 'published']).default('draft'),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      role: z.string().optional(),
      tags: z.array(z.string()).default([]),
      coverImage: image(),
      coverAlt: z.string(),
      links: z
        .array(z.object({ label: z.string(), url: z.string() }))
        .default([]),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: 'index.mdoc', base: './src/content/about' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default('About'),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
    }),
});

export const collections = { projects, about };
