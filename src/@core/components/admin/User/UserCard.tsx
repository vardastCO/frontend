import { User } from "@/generated"

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { fullName, email, cellphone, isEmailVerified, isCellphoneVerified } =
    user
  return (
    <div>
      {fullName}
      {email}
      {cellphone}
    </div>
  )
}

export default UserCard
