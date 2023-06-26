import Image from "next/image"
import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

interface ProductCardProps {
  product: {
    title: string
    image: string
    price: number
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = Math.random() > 0.7 ? true : false
  return (
    <div
      className="relative
        border-b
        transition
        hover:z-10
        hover:shadow-lg
        sm:border-l-0
        lg:border-l
        lg:[&:nth-of-type(3n)]:border-l-0
        xl:[&:nth-of-type(3n)]:border-l
        xl:[&:nth-of-type(4n)]:border-l-0"
    >
      <Link href="#" className="flex h-full w-full px-4 py-2">
        <div className="flex flex-1 sm:flex-row lg:flex-col">
          <div className="relative align-middle sm:w-32 lg:h-48 lg:w-full">
            <Image
              src={`/images/products/${product.image}`}
              alt={product.title}
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div
              title={product.title}
              className="mb-6 mt-4 line-clamp-2 h-12 text-gray-800"
            >
              {product.title}
            </div>
            <div className="flex flex-col items-stretch justify-between text-gray-800">
              <div className="flex items-start gap-2">
                {hasDiscount && (
                  <div className="mt-2 rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white">
                    {digitsEnToFa(15)}%
                  </div>
                )}
                <div>
                  <span className="text-xs leading-none text-gray-600">
                    قیمت هر تن
                  </span>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-lg font-semibold leading-none">
                      {digitsEnToFa(addCommas(product.price))}
                    </span>
                    <span className="text-sm leading-none">تومان</span>
                  </div>

                  <div className="mt-2 flex-1">
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        {digitsEnToFa(addCommas(product.price))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
