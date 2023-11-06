"use client"

import { Offer, Uom } from "@/generated"

import ProductOfferItem from "./product-offer-item"

type ProductOffersProps = {
  offers: Offer[]
  uom: Uom
}

const ProductOffers = ({ offers, uom }: ProductOffersProps) => {
  return (
    <div id="attributes" className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="py">سایر فروشندگان</h4>
      <div className="flex flex-col gap-3 even:[&>div]:bg-alpha-100">
        {offers.map((offer) => (
          <ProductOfferItem key={offer.id} offer={offer} uom={uom} />
        ))}
      </div>
    </div>
  )
}

export default ProductOffers
