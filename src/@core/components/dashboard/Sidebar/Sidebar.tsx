import MenuBar from "./MenuBar";
import OrganizationsBar from "./OrganizationsBar";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="sticky top-0 flex-shrink-0 h-auto">
      <div className="flex h-full">
        <OrganizationsBar />
        <MenuBar />
      </div>
    </div>
  );
};

export default Sidebar;
