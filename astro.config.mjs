import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind({
    nesting: true,
    applyBaseStyles: true
  })],
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    ssr: {
      noExternal: true,
    }
  },
});