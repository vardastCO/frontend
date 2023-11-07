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
    <Attr className={`h-8 text-left font-bold`}>
      {digitsEnToFa(addCommas(price))}{" "}
      <span className={`text-${size} font-medium`}>تومان</span>
    </Attr>
  )
}

export default PriceTitle
