import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { defineCollection, defineConfig, s } from "velite"

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
})

// const docs = defineCollection({
//   name: "Doc",
//   pattern: "docs/**/*.mdx",
//   schema: s
//     .object({
//       slug: s.path(),
//       title: s.string().max(99),
//       description: s.string().max(999).optional(),
//       published: s.boolean().default(true),
//       toc: s.toc(),
//       body: s.mdx(),
//     })
//     .transform(computedFields),
// })

// const guides = defineCollection({
//   name: "Guide",
//   pattern: "guides/**/*.mdx",
//   schema: s
//     .object({
//       slug: s.path(),
//       title: s.string().max(99),
//       description: s.string().max(999).optional(),
//       date: s.isodate(),
//       published: s.boolean().default(true),
//       featured: s.boolean().default(false),
//       toc: s.toc(),
//       body: s.mdx(),
//     })
//     .transform(computedFields),
// })

const projects = defineCollection({ // Renamed from posts
  name: "Project", // Renamed from Post
  pattern: "projects/**/*.mdx", // Updated pattern
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      image: s.string().max(99).optional(), // Made image optional just in case
      authors: s.array(s.string()),
      tags: s.array(s.string()).optional(), // New field for tags
      body: s.mdx(),
    })
    .transform(computedFields),
})

const authors = defineCollection({
  name: "Author",
  pattern: "authors/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      avatar: s.string().max(99),
      body: s.mdx(),
    })
    .transform(computedFields),
})

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { pages, authors, projects }, // Updated to use projects
  mdx: {
    rehypePlugins: [
      rehypeSlug as any,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
