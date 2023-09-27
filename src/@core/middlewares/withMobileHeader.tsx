import MobileHeader, {
  IModalHeader
} from "@/app/(public)/components/header/MobileHeader"

const withMobileHeader =
  (Component: React.FC, headerProps: IModalHeader) => (props: any) => {
    return (
      <>
        <MobileHeader {...headerProps} />
        <Component {...props} />
      </>
    )
  }
export default withMobileHeader
