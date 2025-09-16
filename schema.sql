-- Admin Dashboard Database Schema
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS merchants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    status VARCHAR(50) DEFAULT 'active',
    rating DECIMAL(3,2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    merchant_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10,2) NOT NULL,
    customer_name VARCHAR(255),
    items JSONB,
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    date_recorded DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO admin_users (email, name, role) VALUES 
('admin@msdp.com', 'Admin User', 'admin'),
('manager@msdp.com', 'Manager User', 'manager');

INSERT INTO merchants (name, category, email, phone, address, status, rating) VALUES 
('Urban Bites', 'Food', 'contact@urbanbites.com', '+1234567890', '123 Food St, San Francisco', 'active', 4.6),
('GreenMart', 'Grocery', 'info@greenmart.com', '+0987654321', '456 Grocery Ave, San Francisco', 'active', 4.8),
('MediQuick', 'Pharmacy', 'support@mediquick.com', '+1122334455', '789 Health Blvd, San Francisco', 'active', 4.7);

INSERT INTO orders (user_id, merchant_id, status, total, customer_name, items, delivery_address) VALUES 
(1, 'm1', 'completed', 25.50, 'John Doe', '{"items": [{"name": "Burger", "price": 12.50}, {"name": "Fries", "price": 8.00}, {"name": "Drink", "price": 5.00}]}', '123 Main St, San Francisco, CA'),
(2, 'm2', 'pending', 18.75, 'Jane Smith', '{"items": [{"name": "Pizza", "price": 15.75}, {"name": "Salad", "price": 3.00}]}', '456 Oak Ave, San Francisco, CA'),
(3, 'm3', 'processing', 45.20, 'Bob Johnson', '{"items": [{"name": "Medication", "price": 35.20}, {"name": "Vitamins", "price": 10.00}]}', '789 Pine St, San Francisco, CA');

INSERT INTO analytics_metrics (metric_name, metric_value, date_recorded) VALUES 
('total_users', 1250, CURRENT_DATE),
('total_orders', 3420, CURRENT_DATE),
('total_revenue', 125000, CURRENT_DATE),
('active_merchants', 45, CURRENT_DATE);
