import { client } from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection()
  return (
    pages.data.pageConnection.edges
      ?.map((edge) => ({
        slug: [edge?.node?._sys.filename ?? ''],
      }))
      .filter((p) => p.slug[0] !== 'home') ?? []
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const filename = slug?.join('/') ?? 'home'
  try {
    const res = await client.queries.page({ relativePath: `${filename}.mdx` })
    return {
      title: res.data.page.seoTitle || res.data.page.title,
      description: res.data.page.seoDescription || '',
    }
  } catch {
    return { title: 'SRSG Consulting' }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const filename = slug?.join('/') ?? 'home'

  try {
    const res = await client.queries.page({ relativePath: `${filename}.mdx` })
    const page = res.data.page

    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-primary mb-8">{page.title}</h1>
        {page.body && (
          <div className="prose prose-lg max-w-none">
            <TinaMarkdown content={page.body} />
          </div>
        )}
      </main>
    )
  } catch {
    notFound()
  }
}
