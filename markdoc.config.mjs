import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  extends: [
    shiki({ theme: 'github-dark' }),
  ],
  tags: {
    youtube: {
      render: component('./src/components/content/YouTube.astro'),
      attributes: {
        url: { type: String, required: true },
        caption: { type: String },
      },
    },
    figure: {
      render: component('./src/components/content/Figure.astro'),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
        size: { type: String, matches: ['small', 'medium', 'large'] },
      },
    },
  },
});
