// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // TODO: change to your custom domain once you have one
  site: 'https://tarunmugunthan.netlify.app',
  output: 'static',
  adapter: netlify(),
  integrations: [react(), markdoc(), keystatic(), sitemap()],
});
