import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: 'https://vollow.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'slack-dark', // Fairly plain theme somehow seen in VSCode
    },
  },
})
