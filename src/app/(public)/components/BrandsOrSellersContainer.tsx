import { PropsWithChildren } from "react"

const BrandsOrSellersContainer: React.FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <div className="grid grid-cols-3 gap p pb-5 xl:grid-cols-5">{children}</div>
  )
}

export default BrandsOrSellersContainer
