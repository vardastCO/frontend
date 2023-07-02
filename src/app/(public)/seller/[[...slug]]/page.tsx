import { Metadata, ResolvingMetadata } from "next"

interface SellerIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: SellerIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  return {
    title: slug[1] as string,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/p/123/asdf`
    }
  }
}

const SellerIndex = async ({ params: { slug } }: SellerIndexProps) => {
  return <div className="container mx-auto px-4 py-4 lg:py-8">{slug[0]}</div>
}

export default SellerIndex
