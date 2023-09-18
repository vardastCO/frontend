import MobileHeader from "@/app/(public)/components/header/MobileHeader"

export default function withMobileHeader(
  Component: React.FC,
  headerProps: { title: string; hasBack?: boolean }
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
