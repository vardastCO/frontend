import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

export const AttributeSize: any = {
  "2xs": "h4",
  xs: "h3",
  sm: "h2"
}

export type ITextSize = "xs" | "sm" | "2xs"

const PriceTitle = ({
  price,
  size = "sm"
}: {
  price: number
  size?: ITextSize
}) => {
  const Attr = size ? AttributeSize[size] : "h2"
  return (
    <Attr
      className={`flex items-center justify-between gap-x-0.5 text-left font-bold`}
    >
      <span>{digitsEnToFa(addCommas(price))}</span>
      <span className={`text-${size === "sm" ? size : "xs"} font-medium`}>
        تومان
      </span>
    </Attr>
  )
}

export default PriceTitle
