import UserEdit from "./components/UserEdit"

const UserEditPage = ({ params: { uuid } }: { params: { uuid: string } }) => {
  return <UserEdit uuid={uuid} />
}

export default UserEditPage
