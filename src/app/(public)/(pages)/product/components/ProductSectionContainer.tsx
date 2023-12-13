import { PropsWithChildren } from "react"

const ProductSectionContainer: React.FC<
  PropsWithChildren<{
    title?: string
    spaceless?: boolean
    bgTransparent?: boolean
  }>
> = ({ title = "", spaceless, bgTransparent, children }) => {
  return (
    <div
      className={`${spaceless ? "" : "p"} ${
        bgTransparent ? "" : "bg-alpha-white"
      } flex flex-col gap-y py-8`}
    >
      {title && (
        <h4 className={`${spaceless ? "p" : "pb"} font-medium`}>{title}</h4>
      )}
      {children}
    </div>
  )
}

export default ProductSectionContainer
