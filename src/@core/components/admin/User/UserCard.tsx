import { User } from "@/generated"

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { fullName, email, cellphone, isEmailVerified, isCellphoneVerified } =
    user
  return (
    <div className="card rounded p-2">
      {fullName}
      {email}
      {cellphone}
    </div>
  )
}

export default UserCard
