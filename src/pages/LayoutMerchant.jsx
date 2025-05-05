import SidebarMerchant from './SidebarMerchant';

export default function LayoutMerchant({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <SidebarMerchant />
      <main className="flex-1 p-6 md:ml-64">{children}</main>
    </div>
  );
}
