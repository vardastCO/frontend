interface IDesktopMobileViewOrganizer {
  isMobileView: boolean
  DesktopSidebar: React.FC
  MobileHeader: React.FC
  DesktopHeader: React.FC
  Content: React.FC
}

const DesktopMobileViewOrganizer: React.FC<IDesktopMobileViewOrganizer> = ({
  isMobileView,
  DesktopSidebar,
  MobileHeader,
  DesktopHeader,
  Content
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 pb md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
      {!isMobileView && <DesktopSidebar />}
      <div className="flex flex-col">
        {isMobileView ? <MobileHeader /> : <DesktopHeader />}
        <Content />
      </div>
    </div>
  )
}

export default DesktopMobileViewOrganizer
