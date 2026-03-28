// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hungkaichuang.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh-tw',
    locales: ['zh-tw', 'en', 'jp'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
