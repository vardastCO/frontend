import SellerEdit from "@/app/admin/sellers/components/SellerEdit"

const BrandEditPage = ({ params: { uuid } }: { params: { uuid: string } }) => {
  return uuid && <SellerEdit uuid={uuid} />
}

export default BrandEditPage
