import { ReactElement } from "react";

interface PageHeaderProps {
  title: string;
  slot?: ReactElement;
}

function PageHeader({ title, slot }: PageHeaderProps) {
  return (
    <div className="flex items-end mt-8 mb-6">
      <h1 className="text-n-gray-800 text-3xl font-black">{title}</h1>
      {slot && <div className="mr-auto">{slot}</div>}
    </div>
  );
}

export default PageHeader;
