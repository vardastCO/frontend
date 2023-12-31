interface IDesktopMobileViewOrganizer {
  isMobileView: boolean
  DesktopSidebar: JSX.Element
  MobileHeader: JSX.Element
  DesktopHeader: JSX.Element
  Content: JSX.Element
}

const DesktopMobileViewOrganizer: React.FC<IDesktopMobileViewOrganizer> = ({
  isMobileView,
  DesktopSidebar,
  MobileHeader,
  DesktopHeader,
  Content
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] md:pb lg:grid-cols-[3fr_9fr]">
      {!isMobileView && DesktopSidebar}
      <div className="flex flex-col">
        {isMobileView ? MobileHeader : DesktopHeader}
        {Content}
      </div>
    </div>
  )
}

export default DesktopMobileViewOrganizer
