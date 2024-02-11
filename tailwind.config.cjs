module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Fire Code", "monospace"],
      serif: ["Fira Code", "monospace"],
      mono: ["Fira Code", "monospace"],
    },
    extend: {},
  },
  plugins: [require("@catppuccin/tailwindcss")],
};
