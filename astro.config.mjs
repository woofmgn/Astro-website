import image from "@astrojs/image";
import react from "@astrojs/react";
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'httpls://astro-website.netllfy.app',
  integrations: [react(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), sitemap()]
});