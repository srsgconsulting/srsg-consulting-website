import { client } from "@/tina/__generated__/client";
import { BlogIndexClient } from "./BlogIndexClient";

export default async function BlogPage() {
  const res = await client.queries.postConnection({ sort: "publishDate" });
  const posts =
    res.data.postConnection.edges
      ?.map((e) => e?.node)
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        publishDate: p.publishDate,
        excerpt: p.excerpt,
        tags: p.tags,
      })) ?? [];

  return (
    <main className="bg-surface min-h-screen">
      <BlogIndexClient posts={posts} />
    </main>
  );
}
