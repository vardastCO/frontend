import SigninForm from "./components/SigninForm"

const SigninPage = async () => {
  // const session = await getServerSession(authOptions)

  // if (
  //   session?.profile.roles.some(
  //     (role) => role?.name === "admin" || role?.name === "seller"
  //   )
  // ) {
  //   redirect("/admin")
  // }

  return <SigninForm />
}

export default SigninPage
