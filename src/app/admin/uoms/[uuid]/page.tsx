import UOMEdit from "@/app/admin/uoms/components/UOMEdit"

const UOMEditPage = ({ params: { uuid } }: { params: { uuid: string } }) => {
  return uuid && <UOMEdit uuid={uuid} />
}

export default UOMEditPage
