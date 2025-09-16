import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = getPool();
    if (!pool) {
      // Return mock data if no database connection
      return NextResponse.json([
        { id: "1", status: "completed", total: 150.0 },
        { id: "2", status: "pending", total: 75.5 },
        { id: "3", status: "processing", total: 200.0 },
        { id: "4", status: "completed", total: 89.99 },
        { id: "5", status: "cancelled", total: 45.0 },
      ]);
    }

    // Fetch orders from database
    const result = await pool.query(`
      SELECT 
        o.id,
        o.status,
        o.total,
        o.created_at,
        u.name as customer_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);

    const orders = result.rows.map((row) => ({
      id: row.id.toString(),
      status: row.status,
      total: parseFloat(row.total),
      customerName: row.customer_name,
      createdAt: row.created_at,
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
