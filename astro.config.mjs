// @ts-check
import { defineConfig } from 'astro/config';
// import remarkPrefixBase from './src/utils/remark-prefix-base.mjs';
import sitemap from '@astrojs/sitemap';


import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(),sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },
  // site: 'https://cmhbenjamin.github.io/',
  // base: '/cmhben.com/',
  site: 'https://cmhben.com',
  base:'',
  trailingSlash: 'always',
  // markdown: {
  //   remarkPlugins: [
  //     [remarkPrefixBase, { base: '/cmhben.com/' }]
  //   ]
  // },

});