import { Metadata, ResolvingMetadata } from "next"

import Breadcrumb from "@core/components/shared/Breadcrumb"

interface SellersIndexProps {}

export async function generateMetadata(
  params: SellersIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "sellers"
  }
}

const SellersIndex = async () => {
  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div className="mb-4">
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: true }
          ]}
        />
      </div>
    </div>
  )
}

export default SellersIndex
