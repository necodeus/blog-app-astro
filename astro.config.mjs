import { defineConfig, envField } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";
const isProduction = process.env.NODE_ENV === 'production';
const extra = isProduction ? {
  vite: {
    ssr: {
      noExternal: true
    }
  }
} : {};


// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind({
    nesting: true,
    applyBaseStyles: true
  }), react()],
  adapter: node({
    mode: "standalone"
  }),
  experimental: {
    env: {
      schema: {
        API_BASE_URL: envField.string({
          context: "server",
          access: "secret",
          optional: false
        })
      }
    }
  },
  ...extra
});