'use client';

import { Button, SearchBar } from '@msdp/ui-components';
import { useState } from 'react';

// Temporarily disable Apollo Client to fix the build
// import { useQuery } from '@apollo/client';
// import { GET_USERS } from '@lib/apollo-client';

interface Merchant {
  id: string;
  name: string;
  email: string;
  catalogStatus: string;
  category: string;
  rating: number;
}

const Merchants = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock merchant data for now
  const merchants: Merchant[] = [
    { id: '1', name: 'Urban Bites', email: 'contact@urbanbites.com', catalogStatus: 'approved', category: 'Food', rating: 4.6 },
    { id: '2', name: 'GreenMart', email: 'info@greenmart.com', catalogStatus: 'pending', category: 'Grocery', rating: 4.8 },
    { id: '3', name: 'MediQuick', email: 'support@mediquick.com', catalogStatus: 'approved', category: 'Pharmacy', rating: 4.7 },
    { id: '4', name: 'FastFix Services', email: 'hello@fastfix.com', catalogStatus: 'pending', category: 'Services', rating: 4.5 },
  ];
  const filteredMerchants = merchants.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleApprove = (id: string) => {
    // Stub for approve
    console.log('Approve merchant', id);
  };

  const handleReject = (id: string) => {
    // Stub for reject
    console.log('Reject merchant', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Merchants</h1>
          <Button onClick={() => useAuthStore.getState().logout()}>Logout</Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <SearchBar onSearch={handleSearch} placeholder="Search merchants..." />
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catalog Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{merchant.catalogStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" onClick={() => handleApprove(merchant.id)} className="mr-2">Approve</Button>
                      <Button size="sm" variant="secondary" onClick={() => handleReject(merchant.id)}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredMerchants.length === 0 && (
            <div className="text-center py-8 text-gray-500">No merchants found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Merchants;