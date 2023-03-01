import { IconSmartHome } from "@tabler/icons-react";

type Props = {};

const Breadcrumb = (props: Props) => {
  return (
    <div className="flex items-center">
      <IconSmartHome className="text-n-gray-400 w-4 h-4" />
    </div>
  );
};

export default Breadcrumb;
