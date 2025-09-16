'use client';

import {
    BuildingOfficeIcon,
    CogIcon,
    GlobeAltIcon,
    HomeIcon,
    MapPinIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function LocationServicePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: GlobeAltIcon },
    { id: 'countries', name: 'Countries', icon: MapPinIcon },
    { id: 'regions', name: 'Regions', icon: BuildingOfficeIcon },
    { id: 'cities', name: 'Cities', icon: HomeIcon },
    { id: 'services', name: 'Service Categories', icon: CogIcon },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Location & Service Enablement</h1>
            <p className="mt-2 text-gray-600">
              Manage geographic expansion and service category enablement across your platform
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusIcon className="h-4 w-4 mr-2" />
            Enable New Location
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Countries</dt>
                  <dd className="text-lg font-medium text-gray-900">2</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Regions</dt>
                  <dd className="text-lg font-medium text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HomeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Cities</dt>
                  <dd className="text-lg font-medium text-gray-900">4</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CogIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Service Categories</dt>
                  <dd className="text-lg font-medium text-gray-900">5</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon
                    className={`mr-2 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'countries' && <CountriesTab />}
          {activeTab === 'regions' && <RegionsTab />}
          {activeTab === 'cities' && <CitiesTab />}
          {activeTab === 'services' && <ServicesTab />}
        </div>
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Coverage</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">United States</h4>
              <p className="text-sm text-gray-600">California, New York</p>
              <p className="text-sm text-gray-500">2 regions, 3 cities active</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Singapore</h4>
              <p className="text-sm text-gray-600">Singapore</p>
              <p className="text-sm text-gray-500">1 region, 1 city active</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Enablement Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🍔</span>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Food & Dining</h4>
                <p className="text-sm text-green-700">Enabled in 4 cities</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🛒</span>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Grocery & Retail</h4>
                <p className="text-sm text-green-700">Enabled in 4 cities</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🔧</span>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-yellow-900">Local Services</h4>
                <p className="text-sm text-yellow-700">Enabled in 2 cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountriesTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Countries</h3>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Country
        </button>
      </div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">United States</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">USD</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">Singapore</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SGD</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RegionsTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Regions</h3>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Region
        </button>
      </div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">California</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">United States</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">State</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">New York</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">United States</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">State</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Singapore</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Singapore</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">City-State</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CitiesTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Cities</h3>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add City
        </button>
      </div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">San Francisco</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">California</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">873,965</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 enabled</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Los Angeles</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">California</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,971,883</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 enabled</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">New York City</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New York</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,336,817</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 enabled</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Singapore</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Singapore</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,453,600</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 enabled</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Service Categories</h3>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Service Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🍔</span>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Food & Dining</h4>
              <p className="text-sm text-gray-500">Restaurants, cafes, street food</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Enabled Cities:</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Commission:</span>
              <span className="font-medium">4.75%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
              Configure
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🛒</span>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Grocery & Retail</h4>
              <p className="text-sm text-gray-500">Supermarkets, convenience stores</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Enabled Cities:</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Commission:</span>
              <span className="font-medium">3.75%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
              Configure
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🔧</span>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Local Services</h4>
              <p className="text-sm text-gray-500">Laundry, cleaning, repairs</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Enabled Cities:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Commission:</span>
              <span className="font-medium">5.75%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Partial
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
              Configure
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
