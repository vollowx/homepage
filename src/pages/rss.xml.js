import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return rss({
    title: "vollow's blog",
    description: "vollow's blog",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  })
}
