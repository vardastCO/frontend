"use client"

import Image from "next/image"
import * as Tabs from "@radix-ui/react-tabs"

const ProductImages = () => {
  return (
    <Tabs.Root defaultValue="tab1" orientation="vertical">
      <Tabs.Content value="tab1">
        <div className="relative h-96">
          <Image
            src="/images/products/2_1672039145415_4312_1672644724357_431233.jpg"
            alt="..."
            fill
            className="object-contain"
          />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="relative h-96">
          <Image
            src="/images/products/1651394793392_431233.png"
            alt="..."
            fill
            className="object-contain"
          />
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="relative h-96">
          <Image
            src="/images/products/5555_1664177146210_431462.jpg"
            alt="..."
            fill
            className="object-contain"
          />
        </div>
      </Tabs.Content>

      <Tabs.List aria-label="tabs example" className="flex items-center gap-2">
        <Tabs.Trigger
          value="tab1"
          asChild
          className="overflow-hidden rounded border-brand-600 bg-gray-50 p-1 data-[state='active']:border"
        >
          <div className="relative h-20 w-20">
            <Image
              src="/images/products/2_1672039145415_4312_1672644724357_431233.jpg"
              alt="..."
              fill
              className="object-contain"
            />
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab2"
          asChild
          className="overflow-hidden rounded border-brand-600 bg-gray-50 p-1 data-[state='active']:border"
        >
          <div className="relative h-20 w-20">
            <Image
              src="/images/products/1651394793392_431233.png"
              alt="..."
              fill
              className="object-contain"
            />
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab3"
          asChild
          className="overflow-hidden rounded border-brand-600 bg-gray-50 p-1 data-[state='active']:border"
        >
          <div className="relative h-20 w-20">
            <Image
              src="/images/products/5555_1664177146210_431462.jpg"
              alt="..."
              fill
              className="object-contain"
            />
          </div>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default ProductImages
