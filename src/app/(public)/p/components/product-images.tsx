"use client"

import Image from "next/image"
import * as Tabs from "@radix-ui/react-tabs"

import { Image as ProductImage } from "@/generated"

interface ProductImagesProps {
  images: ProductImage[]
}

const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <Tabs.Root orientation="vertical" defaultValue={`${images.at(1)?.id}`}>
      {images.map((image) => (
        <Tabs.Content key={image.id} value={`${image.id}`}>
          <div className="relative h-96">
            <Image
              src={image.file.presignedUrl.url}
              alt={image.file.name}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain"
            />
          </div>
        </Tabs.Content>
      ))}

      <Tabs.List
        aria-label="tabs example"
        className="flex items-center justify-center gap-2"
      >
        {images.map((image) => (
          <Tabs.Trigger
            key={image.id}
            value={`${image.id}`}
            asChild
            className="overflow-hidden rounded border border-transparent bg-gray-50 text-gray-300 data-[state='active']:text-brand-600 md:p-1 md:data-[state='active']:border-brand-600"
          >
            <div>
              <div className="h-2 w-2 rounded-full bg-current md:hidden md:bg-gray-300"></div>
              <div className="relative hidden h-20 w-20 md:block">
                <Image
                  src={image.file.presignedUrl.url}
                  alt={image.file.name}
                  fill
                  sizes="10vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default ProductImages
