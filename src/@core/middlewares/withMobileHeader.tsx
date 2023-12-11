import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileHeader, {
  IModalHeader
} from "@/app/(public)/components/header/MobileHeader"

function withMobileHeader<T>(
  Component: React.FC<T>,
  headerProps: IModalHeader
) {
  return (props: any) => {
    const isMobileView = CheckIsMobileView()
    const title =
      headerProps.title ||
      ((Object.values(props.params)?.at(0) as any)?.at(1) &&
        decodeURI((Object.values(props.params)?.at(0) as any)?.at(1)))

    return (
      <>
        {isMobileView && <MobileHeader {...{ ...headerProps, title }} />}
        <Component {...props} />
      </>
    )
  }
}
export default withMobileHeader
