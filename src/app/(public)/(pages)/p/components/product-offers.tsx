"use client"

import { Offer, Uom } from "@/generated"

import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"

import ProductOfferItem from "./product-offer-item"

type ProductOffersProps = {
  offers: Offer[]
  uom: Uom
}

const ProductOffers = ({ offers, uom }: ProductOffersProps) => {
  return (
    <ProductSectionContainer title="سایر فروشندگان">
      <div className="flex w-full flex-col gap-3">
        {offers.map((offer) => (
          <ProductOfferItem key={offer.id} offer={offer} uom={uom} />
        ))}
      </div>
    </ProductSectionContainer>
  )
}

export default ProductOffers
