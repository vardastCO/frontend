import { IconFoldUp, type Icon } from "@tabler/icons-react";
import { useState } from "react";
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
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    const current = open;
    setOpen(!current);
  };
  return (
    <div className="sticky top-0 flex-shrink-0">
      <div className="relative flex h-full">
        <button
          className="btn btn-secondary btn-xs mt-8 z-20 absolute top-0 left-0 w-5 h-5 p-0 -ml-2.5 rounded-full"
          onClick={toggleMenu}
        >
          <IconFoldUp
            className={`icon text-gray-500 w-4 h-4 ${
              open ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button>
        <SpacesBar />
        <MenuBar menus={props.menus} open={open} />
      </div>
    </div>
  );
};

export default Sidebar;
