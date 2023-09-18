import withMobileHeader from "@core/middlewares/withMobileHeader"
import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

export default withMobileHeader(MobileBaseLayout, {
  title: "تماس با ما",
  hasBack: true
})
