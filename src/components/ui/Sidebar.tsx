'use client';

import Link from 'next/link';
import { Home, Users, ShoppingBag, BarChart3, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Merchants', href: '/merchants', icon: ShoppingBag },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-500 bg-white shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-center h-16 bg-primary text-white">
          <h1 className="text-lg font-semibold">MSDP Admin</h1>
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;