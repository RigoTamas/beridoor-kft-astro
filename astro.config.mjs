import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  vite: {
    assetsInclude: ['**/*.jpg', '**/*.JPG'],
  },
  site: "https://beridoor.hu",
  integrations: [tailwind({ config: { applyBaseStyles: false } }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), mdx(), sitemap(), svelte()]
});