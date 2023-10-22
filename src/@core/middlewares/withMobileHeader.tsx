import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileHeader, {
  IModalHeader
} from "@/app/(public)/components/header/MobileHeader"

function withMobileHeader<T>(
  Component: React.FC<T>,
  headerProps: IModalHeader
) {
  const isMobileView = CheckIsMobileView()

  return (props: any) => {
    return (
      <>
        {isMobileView && (
          <MobileHeader
            {...headerProps}
            title={props?.searchParams?.title || headerProps.title}
          />
        )}
        <Component {...props} />
      </>
    )
  }
}
export default withMobileHeader
