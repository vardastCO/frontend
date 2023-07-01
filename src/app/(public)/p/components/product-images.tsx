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
            sizes="(max-width: 640px) 100vw, 33vw"
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
            sizes="(max-width: 640px) 100vw, 33vw"
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
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-contain"
          />
        </div>
      </Tabs.Content>

      <Tabs.List
        aria-label="tabs example"
        className="flex items-center justify-center gap-2"
      >
        <Tabs.Trigger
          value="tab1"
          asChild
          className="overflow-hidden rounded border border-transparent bg-gray-50 text-gray-300 data-[state='active']:text-brand-600 md:p-1 md:data-[state='active']:border-brand-600"
        >
          <div>
            <div className="h-2 w-2 rounded-full bg-current md:hidden md:bg-gray-300"></div>
            <div className="relative hidden h-20 w-20 md:block">
              <Image
                src="/images/products/2_1672039145415_4312_1672644724357_431233.jpg"
                alt="..."
                fill
                sizes="10vw"
                className="object-contain"
              />
            </div>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab2"
          asChild
          className="overflow-hidden rounded border border-transparent bg-gray-50 text-gray-300 data-[state='active']:text-brand-600 md:p-1 md:data-[state='active']:border-brand-600"
        >
          <div>
            <div className="h-2 w-2 rounded-full bg-current md:hidden md:bg-gray-300"></div>
            <div className="relative hidden h-20 w-20 md:block">
              <Image
                src="/images/products/1651394793392_431233.png"
                alt="..."
                fill
                sizes="10vw"
                className="object-contain"
              />
            </div>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab3"
          asChild
          className="overflow-hidden rounded border border-transparent bg-gray-50 text-gray-300 data-[state='active']:text-brand-600 md:p-1 md:data-[state='active']:border-brand-600"
        >
          <div>
            <div className="h-2 w-2 rounded-full bg-current md:hidden md:bg-gray-300"></div>
            <div className="relative hidden h-20 w-20 md:block">
              <Image
                src="/images/products/5555_1664177146210_431462.jpg"
                alt="..."
                fill
                sizes="10vw"
                className="object-contain"
              />
            </div>
          </div>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default ProductImages
