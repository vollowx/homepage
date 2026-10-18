import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: 'https://tideover.cc',
  markdown: {
    shikiConfig: {
      theme: 'slack-dark', // Fairly plain theme somehow seen in VSCode
    },
  },
})
