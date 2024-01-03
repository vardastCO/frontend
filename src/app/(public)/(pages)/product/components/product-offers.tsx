"use client"

import { Offer, Uom } from "@/generated"

import ProductSectionContainer from "@/app/(public)/(pages)/product/components/ProductSectionContainer"

import ProductOfferItem from "./product-offer-item"

type ProductOffersProps = {
  offers: Offer[]
  uom: Uom
}

const ProductOffers = ({ offers, uom }: ProductOffersProps) => {
  return (
    <ProductSectionContainer title="فروشندگان">
      <div className="flex w-full flex-col gap-5 divide-y">
        {offers.map((offer) => (
          <ProductOfferItem key={offer.id} offer={offer} uom={uom} />
        ))}
      </div>
    </ProductSectionContainer>
  )
}

export default ProductOffers
