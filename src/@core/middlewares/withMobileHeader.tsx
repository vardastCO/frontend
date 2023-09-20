import MobileHeader, {
  IModalHeader
} from "@/app/(public)/components/header/MobileHeader"

export default function withMobileHeader(
  Component: React.FC,
  headerProps: IModalHeader
) {
  return (props: any) => {
    return (
      <>
        <MobileHeader {...headerProps} />
        <Component {...props} />
      </>
    )
  }
}
