import MobileHeader from "@/app/(public)/components/header/MobileHeader"

export default function withTitle(
  Component: React.FC,
  { title }: { title: string }
) {
  return (props: any) => {
    return (
      <>
        <MobileHeader title={title} />
        <Component {...props} />
      </>
    )
  }
}
