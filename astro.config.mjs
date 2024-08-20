import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

const isProduction = process.env.NODE_ENV === 'production';

const extra = isProduction
  ? {
      vite: {
        ssr: {
          noExternal: true,
        },
      },
    }
  : {};

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
  ...extra,
});