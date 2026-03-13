"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  publishDate?: string | null;
  excerpt?: string | null;
  tags?: (string | null)[] | null;
};

const FILTER_TAGS = ["ESI", "EPFO", "Factories Act"] as const;

export function BlogIndexClient({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<(typeof FILTER_TAGS)[number] | "ALL">(
    "ALL"
  );

  const filtered = useMemo(() => {
    if (activeTag === "ALL") return posts;
    return posts.filter((p) => (p.tags ?? []).filter(Boolean).includes(activeTag));
  }, [activeTag, posts]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-cta">BLOG</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-primary">
          News & Articles
        </h1>
        <p className="mt-4 text-text-muted text-lg">
          Explore our latest updates, guides, and practical compliance insights.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <TagChip
          label="All"
          active={activeTag === "ALL"}
          onClick={() => setActiveTag("ALL")}
        />
        {FILTER_TAGS.map((t) => (
          <TagChip
            key={t}
            label={t}
            active={activeTag === t}
            onClick={() => setActiveTag(t)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="text-lg font-semibold text-primary">No posts found</p>
          <p className="mt-2 text-text-muted">
            Try a different filter to see more articles.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => {
            const tag = (post.tags ?? []).filter(Boolean)[0] ?? "";
            const date = post.publishDate
              ? new Date(post.publishDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "";
            const excerpt = post.excerpt?.trim() || "Read the full article →";

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:border-cta"
              >
                <div className="p-7">
                  {tag && (
                    <span className="inline-flex items-center rounded-full bg-cta/15 px-3 py-1 text-xs font-semibold text-cta">
                      {tag}
                    </span>
                  )}
                  <h2 className="mt-4 text-xl font-semibold text-primary group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted">{date}</p>
                  <p className="mt-4 text-text-muted leading-relaxed">{excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold border transition-colors",
        active
          ? "bg-cta text-text-inverse border-cta"
          : "bg-background text-primary border-border hover:border-cta hover:text-cta",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

