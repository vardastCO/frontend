import { PropsWithChildren } from "react"

const ProductSectionContainer: React.FC<
  PropsWithChildren<{ title?: string; spaceless?: boolean }>
> = ({ title = "", spaceless, children }) => {
  return (
    <div
      className={`${
        spaceless ? "" : "p"
      } flex flex-col gap-y  bg-alpha-white py-8`}
    >
      {title && (
        <h4 className={`${spaceless ? "p" : "pb"} font-medium`}>{title}</h4>
      )}
      {children}
    </div>
  )
}

export default ProductSectionContainer
