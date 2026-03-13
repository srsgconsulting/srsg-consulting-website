import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId:
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID ??
    "a42ffdb3-2845-4448-8513-51edfe116a74",
  token:
    process.env.TINA_TOKEN ??
    "d117ac162e3ca754e748f618199a621547044e80",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title (shown in Google — max 60 chars)",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description (shown in Google — max 160 chars)",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            if (document._sys.filename === "contact") return "/contact";
            if (document._sys.filename === "about") return "/about";
            return `/${document._sys.filename}`;
          },
        },
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug (no spaces, use hyphens)",
            required: true,
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt (max 160 chars — used for SEO and blog card)",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
          },
          {
            type: "string",
            name: "siteTagline",
            label: "Tagline",
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
          },
          {
            type: "string",
            name: "contactPhone",
            label: "Contact Phone",
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Media Links",
            fields: [
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "instagram", label: "Instagram URL" },
            ],
          },
        ],
      },
    ],
  },
});
