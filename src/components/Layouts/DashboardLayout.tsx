import { IconSearch } from "@tabler/icons-react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Sidebar from "../Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        <div className="flex h-full">
          <Sidebar />
          <div className="max-w-7xl relative flex flex-col w-full h-auto px-4 py-6 mx-auto">
            <div className="flex items-center mb-3">
              <Breadcrumb />
              <div className="mr-auto">
                <div className="input-inset">
                  <div className="input-element">
                    <IconSearch className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="جستجو..."
                  />
                  <div className="input-element" dir="ltr">
                    <span className="text-n-gray-500 font-sans text-sm">
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
