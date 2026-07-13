import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
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
      },
    },
  },
});
