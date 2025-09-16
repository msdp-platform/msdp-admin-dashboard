import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = getPool();
    if (!pool) {
      // Return mock data if no database connection
      return NextResponse.json({
        totalUsers: 1250,
        totalOrders: 3420,
        totalRevenue: 125000,
      });
    }

    // Fetch metrics from database
    const [usersResult, ordersResult, revenueResult] = await Promise.all([
      pool.query("SELECT COUNT(*) as count FROM admin_users"),
      pool.query("SELECT COUNT(*) as count FROM merchants"),
      pool.query(
        "SELECT SUM(metric_value) as total FROM analytics_metrics WHERE metric_name = 'total_revenue'"
      ),
    ]);

    const metrics = {
      totalUsers: parseInt(usersResult.rows[0]?.count || "0"),
      totalOrders: parseInt(ordersResult.rows[0]?.count || "0"),
      totalRevenue: parseFloat(revenueResult.rows[0]?.total || "0"),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
