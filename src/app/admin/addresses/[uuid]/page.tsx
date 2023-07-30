import AddressEdit from "@/app/admin/addresses/components/AddressEdit"

type AddressEditPageProps = {
  params: { uuid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const AddressEditPage = ({
  params: { uuid },
  searchParams
}: AddressEditPageProps) => {
  return uuid && <AddressEdit uuid={uuid} fallback={searchParams.fallback} />
}

export default AddressEditPage
