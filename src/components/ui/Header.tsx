'use client';

import { User, LogOut } from 'lucide-react';
import { Button } from '@msdp/ui-components';
import { useAuthStore } from '@lib/store';

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">MSDP Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span className="text-sm font-medium">{user?.name || 'User'}</span>
            </div>
            <Button variant="ghost" onClick={logout} size="sm">
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;