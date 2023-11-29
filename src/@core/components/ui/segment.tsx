import { PropsWithChildren } from "react"
import Image from "next/image"

import { Category } from "@/generated"

interface ISegment extends PropsWithChildren {
  segments: Category[]
  onTabsChange?: (_arg: string) => void
}

const Segment: React.FC<ISegment> = ({
  segments,
  onTabsChange = (_: string) => {},
  children
}) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        {segments?.map(({ title, id, imageCategory }) => (
          <div
            key={id}
            onClick={() => {
              children && onTabsChange(`${id}`)
            }}
            className={`relative mx-2 inline-block w-auto cursor-pointer overflow-hidden rounded-full`}
          >
            <Image
              src={
                (imageCategory &&
                  (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                "" ??
                `/images/categories/${id}.png`
              }
              alt="category"
              fill
              className="rounded-base z-10 object-cover"
            />
            <h4 className="relative z-20 bg-alpha-black bg-opacity-60 px-6 py-3 text-center font-bold text-alpha-white md:text-base">
              {title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Segment
