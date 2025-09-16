'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

interface Metrics {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  customerName?: string;
  createdAt?: string;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, ordersRes] = await Promise.all([
          fetch('/api/metrics'),
          fetch('/api/orders')
        ]);
        
        const metricsData = await metricsRes.json();
        const ordersData = await ordersRes.json();
        
        setMetrics(metricsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusCounts = orders?.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {}) || {};

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));

  const revenueData = orders?.map(order => ({ date: order.id, revenue: order.total })) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <Link href="/location-service" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Location & Service Enablement
            </Link>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Logout</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-primary">{metrics?.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-secondary">{metrics?.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-600">${metrics?.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders?.slice(0, 3).map(order => (
              <div key={order.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-green-600 font-bold">${order.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;