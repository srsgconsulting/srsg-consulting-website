import Link from "next/link";
import { client } from "@/tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { estimateReadingTimeMinutes, richTextToPlainText } from "@/lib/richText";

export async function generateStaticParams() {
  const posts = await client.queries.postConnection()
  return posts.data.postConnection.edges?.map((post) => ({
    slug: post?.node?.slug ?? '',
  })) ?? []
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  try {
    const [postRes, relatedRes] = await Promise.all([
      client.queries.post({ relativePath: `${resolvedParams.slug}.mdx` }),
      client.queries.postConnection({ sort: "publishDate" }),
    ]);
    const post = postRes.data.post;
    const plain = richTextToPlainText(post.body);
    const readingTime = estimateReadingTimeMinutes(plain);
    const primaryTag = post.tags?.[0] ?? null;
    const related =
      relatedRes.data.postConnection.edges
        ?.map((e) => e?.node)
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .filter((p) => p.slug !== post.slug)
        .filter((p) => (primaryTag ? (p.tags ?? []).includes(primaryTag) : true))
        .slice(0, 2) ?? [];

    const formattedDate = post.publishDate
      ? new Date(post.publishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
    
    return (
      <main className="bg-background min-h-screen">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-cta transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">→</span>
            <Link href="/blog" className="hover:text-cta transition-colors">
              Blog
            </Link>{" "}
            <span className="mx-2">→</span>
            <span className="text-text">{post.title}</span>
          </nav>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="bg-cta/15 text-cta text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-text-muted">
            {formattedDate}
            {formattedDate && post.author ? " · " : ""}
            {post.author ?? ""}
            {" · "}
            {readingTime} min read
          </p>

          <hr className="my-10 border-border" />

          <div className="prose prose-lg max-w-none">
            {post.body && <TinaMarkdown content={post.body} />}
          </div>

          <div className="mt-12">
            <Link href="/blog" className="font-semibold text-cta hover:text-cta-hover transition-colors">
              ← Back to Blog
            </Link>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold text-primary mb-6">Related Posts</h2>
            {related.length === 0 ? (
              <p className="text-text-muted">No related posts found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => {
                  const tag = p.tags?.[0] ?? "";
                  const date = p.publishDate
                    ? new Date(p.publishDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "";
                  const excerpt = p.excerpt?.trim() || "Read the full article →";

                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block rounded-2xl border border-border bg-surface shadow-soft p-6 hover:-translate-y-1 hover:shadow-card hover:border-cta transition-all"
                    >
                      {tag && (
                        <span className="inline-flex items-center rounded-full bg-cta/15 px-3 py-1 text-xs font-semibold text-cta">
                          {tag}
                        </span>
                      )}
                      <h3 className="mt-4 text-lg font-semibold text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-muted">{date}</p>
                      <p className="mt-3 text-text-muted leading-relaxed">{excerpt}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </article>
      </main>
    )
  } catch (e) {
    notFound()
  }
}
