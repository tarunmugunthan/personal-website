import { config, fields, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

/* ---------- Content components (the editor's insert menu) ---------- */

const youtube = block({
  label: 'YouTube video',
  description: 'Paste a YouTube URL',
  schema: {
    url: fields.url({
      label: 'YouTube URL',
      validation: { isRequired: true },
    }),
    caption: fields.text({ label: 'Caption' }),
  },
});

const figure = block({
  label: 'Image',
  description: 'Image with alt text and optional caption',
  schema: {
    src: fields.image({
      label: 'Image',
      directory: 'src/assets/images/projects',
      // MUST start with /src/ for content-component images (dynamic import).
      // This differs from frontmatter images below.
      publicPath: '/src/assets/images/projects/',
      validation: { isRequired: true },
    }),
    alt: fields.text({
      label: 'Alt text',
      description: 'Describe the image for screen readers. Leave blank if decorative.',
    }),
    caption: fields.text({ label: 'Caption' }),
  },
});

/* ---------- Config ---------- */

export default config({
  // Phase 6: swap to the github block below to publish from any browser.
  storage: {
    kind: 'local',
  },
  // storage: {
  //   kind: 'github',
  //   repo: { owner: 'tarunmugunthan', name: 'personal-website' },
  // },

  ui: {
    brand: { name: 'Tarun Mugunthan' },
  },

  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date', 'status'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
          slug: {
            label: 'URL slug',
            description: 'Becomes /projects/<slug>. Changing this breaks existing links.',
          },
        }),

        summary: fields.text({
          label: 'Summary',
          description: 'One or two sentences. Shown on the home page card and used as the meta description.',
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } },
        }),

        date: fields.date({
          label: 'Date',
          description: 'Used for sorting and display.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),

        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),

        featured: fields.checkbox({
          label: 'Featured',
          description: 'Featured projects may be treated differently on the home page.',
          defaultValue: false,
        }),

        order: fields.integer({
          label: 'Manual sort order',
          description: 'Lower numbers appear first. Ties fall back to date (newest first).',
          defaultValue: 0,
        }),

        role: fields.text({
          label: 'Role',
          description: 'e.g. "Design & build", "Research". Optional.',
        }),

        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),

        coverImage: fields.image({
          label: 'Cover image',
          description: 'Shown on the home page grid. Required.',
          directory: 'src/assets/images/projects',
          // Frontmatter images use the @assets alias (NOT /src/).
          publicPath: '@assets/images/projects/',
          validation: { isRequired: true },
        }),

        coverAlt: fields.text({
          label: 'Cover image alt text',
          validation: { isRequired: true },
        }),

        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),

        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/projects',
              publicPath: '@assets/images/projects/',
            },
          },
          components: { youtube, figure },
        }),
      },
    }),
  },

  singletons: {
    about: singleton({
      label: 'About page',
      path: 'src/content/about/',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Page title', defaultValue: 'About' }),
        portrait: fields.image({
          label: 'Portrait',
          directory: 'src/assets/images/about',
          publicPath: '@assets/images/about/',
        }),
        portraitAlt: fields.text({ label: 'Portrait alt text' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/about',
              publicPath: '@assets/images/about/',
            },
          },
          components: { youtube, figure },
        }),
      },
    }),

    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings/',
      format: { data: 'yaml' },
      schema: {
        siteName: fields.text({ label: 'Site name', validation: { isRequired: true } }),
        tagline: fields.text({ label: 'Tagline' }),
        heroText: fields.text({
          label: 'Hero text',
          description: 'Short paragraph (2–3 lines) centered over the water animation.',
          multiline: true,
        }),
        metaDescription: fields.text({
          label: 'Default meta description',
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        homeIntro: fields.text({
          label: 'Home page intro',
          description: 'Short blurb above the project grid. The About page is linked right after it.',
          multiline: true,
        }),
        homeOutro: fields.text({
          label: 'Home page closing paragraph',
          description: 'Shown below the project grid, above the footer.',
          multiline: true,
        }),
        email: fields.text({ label: 'Contact email' }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social links', itemLabel: (props) => props.fields.label.value || 'Link' }
        ),
      },
    }),
  },
});
