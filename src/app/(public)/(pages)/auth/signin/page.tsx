import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"

import SigninForm from "./components/SigninForm"

const SigninPage = async () => {
  // const session = await getServerSession(authOptions)
  const isMobileView = CheckIsMobileView()

  // if (
  //   session?.profile.roles.some(
  //     (role) => role?.name === "admin" || role?.name === "seller"
  //   )
  // ) {
  //   redirect("/admin")
  // }

  return <SigninForm isMobileView={isMobileView} />
}

export default withMobileHeader(SigninPage, { hasLogo: true })
