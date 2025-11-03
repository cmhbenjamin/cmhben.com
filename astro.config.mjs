// @ts-check
import { defineConfig } from 'astro/config';
import remarkPrefixBase from './src/utils/remark-prefix-base.mjs';



import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://cmhbenjamin.github.io/',
  // base: '/cmhben.com/',
  base:'',
  // trailingSlash: 'always',
  markdown: {
    remarkPlugins: [
      [remarkPrefixBase, { base: '/cmhben.com/' }]
    ]
  },

});