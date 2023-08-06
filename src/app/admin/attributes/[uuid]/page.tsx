import AttributeEdit from "@/app/admin/attributes/components/AttributeEdit"

const AttributeEditPage = ({
  params: { uuid }
}: {
  params: { uuid: string }
}) => {
  return uuid && <AttributeEdit uuid={uuid} />
}

export default AttributeEditPage
