'use client';

import { useQuery } from '@apollo/client';
import { GET_USERS } from '@lib/apollo-client';
import { SearchBar } from '@msdp/ui-components';
import { Button } from '@msdp/ui-components';
import { useAuthStore } from '@lib/store';
import { useState } from 'react';

const Users = () => {
  const { data: usersData } = useQuery(GET_USERS);
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return <div>Please log in to view users.</div>;
  }

  const users = usersData?.users || [];
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (id: string) => {
    // Stub for edit
    console.log('Edit user', id);
  };

  const handleDelete = (id: string) => {
    // Stub for delete
    console.log('Delete user', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <Button onClick={() => useAuthStore.getState().logout()}>Logout</Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <SearchBar onSearch={handleSearch} placeholder="Search users..." />
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" onClick={() => handleEdit(user.id)} className="mr-2">Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;