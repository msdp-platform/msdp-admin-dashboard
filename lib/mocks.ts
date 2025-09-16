export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: string[];
  total: number;
}

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'merchant',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'admin',
  },
];

export const orders: Order[] = [
  {
    id: '1',
    status: 'pending',
    items: ['Pizza', 'Soda'],
    total: 25.99,
  },
  {
    id: '2',
    status: 'completed',
    items: ['Burger', 'Fries'],
    total: 15.50,
  },
  {
    id: '3',
    status: 'cancelled',
    items: ['Salad'],
    total: 10.00,
  },
];

export const metrics = {
  totalUsers: users.length,
  totalOrders: orders.length,
  totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
};