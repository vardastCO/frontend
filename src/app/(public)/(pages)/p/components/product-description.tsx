"use client"

type ProductDescriptionProps = {
  description: string
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="py">معرفی</h4>
      <p className="text-justify text-alpha-500">{description}</p>
    </div>
  )
}

export default ProductDescription
