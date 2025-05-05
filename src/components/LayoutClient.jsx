import SidebarClient from './SidebarClient';
import ThemeToggle from './ThemeToggle';

export default function LayoutClient({ children }) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6 md:ml-64">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
