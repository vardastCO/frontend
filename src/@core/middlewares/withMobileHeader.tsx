import MobileHeader, {
  IModalHeader
} from "@/app/(public)/components/header/MobileHeader"

function withMobileHeader<T>(
  Component: React.FC<T>,
  headerProps: IModalHeader
) {
  return (props: any) => {
    return (
      <>
        <MobileHeader
          {...headerProps}
          title={props?.searchParams?.title || headerProps.title}
        />
        <Component {...props} />
      </>
    )
  }
}
export default withMobileHeader
