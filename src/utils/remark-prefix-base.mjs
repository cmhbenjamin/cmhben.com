// Create a remark plugin that rewrites root-relative URLs in your Markdown to include Astro's base, 
// then register it in astro.config.mjs.


import { visit } from 'unist-util-visit';

export default function remarkPrefixBase(options = {}) {
  const base = (options.base || '/').replace(/\/+$/, '/'); // ensure trailing slash
  return (tree) => {
    visit(tree, (node) => {
      if ((node.type === 'image' || node.type === 'video' || node.type === 'link') && typeof node.url === 'string') {
        const url = node.url;
        // skip protocol-relative URLs and absolute http(s) URLs
        if (url.startsWith('//') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) return;
        if (url.startsWith('/')) {
          // avoid double-prefix if already contains base
          if (!url.startsWith(base)) {
            node.url = (base + url.replace(/^\/+/, '')).replace(/\/{2,}/g, '/');
          }
        }
      }
    });
  };
}