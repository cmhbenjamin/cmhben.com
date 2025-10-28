// @ts-check
import { defineConfig } from 'astro/config';


import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(),sanity({
      projectId: '8444qxsb',
      dataset: "production",
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-09-19", 
      studioBasePath: '/studio'// insert the current date to access the latest version of the API
    }),
, react()],

  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://cmhbenjamin.github.io/',
  // base: 'cmhben.com',

});