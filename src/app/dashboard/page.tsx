'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { adminApi } from '@/lib/adminApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardMetrics {
  locations: {
    totalCountries: number;
    totalCities: number;
    enabledServices: number;
  };
  merchants: {
    total: number;
    active: number;
    pending: number;
  };
  platform: {
    uptime: number;
    timestamp: string;
  };
}

interface ServiceHealth {
  [serviceName: string]: {
    status: 'healthy' | 'unhealthy';
    responseTime?: number;
    error?: string;
  };
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user, logout } = useAdminAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [serviceHealth, setServiceHealth] = useState<ServiceHealth>({});
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setDataLoading(true);
      
      // ✅ Fetch data via Admin Service API (microservice communication)
      const [metricsData, healthData] = await Promise.all([
        adminApi.getDashboardMetrics(),
        adminApi.getServiceHealth(),
      ]);

      setMetrics(metricsData);
      setServiceHealth(healthData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MSDP Admin Dashboard</h1>
              <p className="text-gray-600">Platform Management & Service Orchestration</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {dataLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading metrics...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Location Services
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {metrics?.locations.totalCountries || 0} Countries
                        </dd>
                        <dd className="text-sm text-gray-500">
                          {metrics?.locations.totalCities || 0} Cities
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">🏪</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Merchants
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {metrics?.merchants.active || 0} Active
                        </dd>
                        <dd className="text-sm text-gray-500">
                          {metrics?.merchants.pending || 0} Pending Approval
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Platform Uptime
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {formatUptime(metrics?.platform.uptime || 0)}
                        </dd>
                        <dd className="text-sm text-gray-500">
                          Last checked: {new Date(metrics?.platform.timestamp || '').toLocaleTimeString()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Health */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Service Health</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(serviceHealth).map(([serviceName, health]) => (
                    <div key={serviceName} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {serviceName.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        {health.responseTime && (
                          <p className="text-sm text-gray-500">{health.responseTime}ms</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            health.status === 'healthy' ? 'bg-green-400' : 'bg-red-400'
                          }`}
                        />
                        <span className={`ml-2 text-sm font-medium ${
                          health.status === 'healthy' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {health.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="text-2xl mb-2">👥</div>
                    <h4 className="font-medium text-gray-900">Manage Admin Users</h4>
                    <p className="text-sm text-gray-500">Add, edit, or remove admin users</p>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="text-2xl mb-2">🏪</div>
                    <h4 className="font-medium text-gray-900">Approve Merchants</h4>
                    <p className="text-sm text-gray-500">Review pending merchant applications</p>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="text-2xl mb-2">🌍</div>
                    <h4 className="font-medium text-gray-900">Enable Locations</h4>
                    <p className="text-sm text-gray-500">Expand to new geographic areas</p>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-medium text-gray-900">View Analytics</h4>
                    <p className="text-sm text-gray-500">Platform performance metrics</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}