import AdminMenus from "@/@core/components/admin/Sidebar/Menus";

type Props = {};

const AdminSidebar = (props: Props) => {
  return (
    <div className="sticky top-0 flex-shrink-0 h-auto">
      <div className="flex h-full">
        <AdminMenus />
      </div>
    </div>
  );
};

export default AdminSidebar;
