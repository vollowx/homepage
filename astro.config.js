import { defineConfig } from 'astro/config'

function wrapTables() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrapper'] },
            children: [child],
          }
        }
        visit(child)
        return child
      })
    }
    visit(tree)
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: 'https://tideover.cc',
  markdown: {
    rehypePlugins: [wrapTables],
    shikiConfig: {
      theme: 'slack-dark', // Fairly plain theme somehow seen in VSCode
    },
  },
})
