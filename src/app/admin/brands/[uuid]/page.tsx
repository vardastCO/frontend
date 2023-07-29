import BrandEdit from "@/app/admin/brands/components/BrandEdit"

const BrandEditPage = ({ params: { uuid } }: { params: { uuid: string } }) => {
  return uuid && <BrandEdit uuid={uuid} />
}

export default BrandEditPage
