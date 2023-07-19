import { Offer, Uom } from "@/generated"

import ProductOfferItem from "./product-offer-item"

type ProductOffersProps = {
  offers: Offer[]
  uom: Uom
}

const ProductOffers = ({ offers, uom }: ProductOffersProps) => {
  return (
    <div id="sellers" className="border-t-2 border-gray-100 pt-4">
      <h2 className="mb-4 text-lg font-bold text-gray-800">
        فروشندگان این کالا
      </h2>
      <div className="flex flex-col gap-3 even:[&>div]:bg-gray-100">
        {offers.map((offer) => (
          <ProductOfferItem key={offer.id} offer={offer} uom={uom} />
        ))}
      </div>
    </div>
  )
}

export default ProductOffers
