module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans:  ['DM Mono', 'monospace'],
      serif: ['DM Mono', 'monospace'],
      mono:  ['DM Mono', 'monospace'],
    },
    extend: {},
  },
  plugins: [require('@catppuccin/tailwindcss')],
}
