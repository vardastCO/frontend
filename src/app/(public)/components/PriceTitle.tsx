import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

const PriceTitle = ({
  price,
  size = "sm"
}: {
  price: number
  size?: "xs" | "sm"
}) => {
  const Attr = size === "xs" ? "h3" : "h2"
  return (
    <Attr
      className={`flex h-8 items-center justify-between gap-x-0.5 text-left font-bold`}
    >
      <span>{digitsEnToFa(addCommas(price))}</span>
      <span className={`text-${size} font-medium`}>تومان</span>
    </Attr>
  )
}

export default PriceTitle
