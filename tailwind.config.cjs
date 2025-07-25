module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Mono', 'monospace'],
      serif: ['IBM Plex Mono', 'monospace'],
      mono: ['IBM Plex Mono', 'monospace'],
    },
    extend: {},
  },
  plugins: [require('@catppuccin/tailwindcss')],
}
