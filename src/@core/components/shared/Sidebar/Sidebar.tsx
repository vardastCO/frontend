import { type Icon } from "@tabler/icons-react";
import MenuBar from "./MenuBar";
import SpacesBar from "./SpacesBar";

type Props = {
  menus: {
    title: string;
    path: string;
    icon: Icon;
  }[];
};

const Sidebar = (props: Props) => {
  return (
    <div className="sticky top-0 flex-shrink-0 h-auto">
      <div className="flex h-full">
        <SpacesBar />
        <MenuBar menus={props.menus} />
      </div>
    </div>
  );
};

export default Sidebar;
