// ✅ Admin Service API Client (Microservice Communication)
// This is the ONLY way the frontend communicates with backend services

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  created_at: string;
}

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
    status: "healthy" | "unhealthy";
    responseTime?: number;
    error?: string;
  };
}

class AdminApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL || "http://localhost:3005";

    // Try to get token from localStorage
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("adminToken");
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Admin API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ✅ Authentication Functions
  async login(email: string, password: string) {
    try {
      const response = await this.request("/api/admin/users/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.data.token) {
        this.token = response.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("adminToken", this.token);
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
  }

  // ✅ Dashboard Data Functions (Orchestrated by Admin Service)
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await this.request(
      "/api/admin/orchestration/dashboard-metrics"
    );
    return response.data;
  }

  async getServiceHealth(): Promise<ServiceHealth> {
    const response = await this.request(
      "/api/admin/orchestration/service-health"
    );
    return response.services;
  }

  async getPlatformAnalytics(period: string = "7d") {
    const response = await this.request(
      `/api/admin/orchestration/analytics?period=${period}`
    );
    return response.data;
  }

  // ✅ Admin User Management Functions
  async getAdminUsers(): Promise<AdminUser[]> {
    const response = await this.request("/api/admin/users");
    return response.data;
  }

  async createAdminUser(userData: Partial<AdminUser>) {
    const response = await this.request("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return response;
  }

  async updateAdminRole(userId: number, role: string, permissions: string[]) {
    const response = await this.request(`/api/admin/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role, permissions }),
    });
    return response;
  }

  async deleteAdminUser(userId: number) {
    const response = await this.request(`/api/admin/users/${userId}`, {
      method: "DELETE",
    });
    return response;
  }

  // ✅ Platform Management Functions
  async getPlatformSettings() {
    const response = await this.request("/api/admin/platform/settings");
    return response.data;
  }

  async updatePlatformSetting(key: string, value: any, description?: string) {
    const response = await this.request(`/api/admin/platform/settings/${key}`, {
      method: "PUT",
      body: JSON.stringify({ value, description }),
    });
    return response;
  }

  // ✅ Merchant Orchestration Functions (via Admin Service)
  async approveMerchant(merchantId: string, notes?: string) {
    const response = await this.request(
      `/api/admin/orchestration/merchants/${merchantId}/approve`,
      {
        method: "POST",
        body: JSON.stringify({ notes }),
      }
    );
    return response;
  }

  // ✅ Location Orchestration Functions (via Admin Service)
  async enableLocationService(
    locationId: string,
    serviceType: string,
    configuration?: any
  ) {
    const response = await this.request(
      `/api/admin/orchestration/locations/${locationId}/enable-service`,
      {
        method: "POST",
        body: JSON.stringify({ serviceType, configuration }),
      }
    );
    return response;
  }

  // ✅ Audit Functions
  async getAuditLogs(filters: any = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await this.request(`/api/admin/audit/logs?${queryString}`);
    return response.data;
  }

  // ✅ Health Check
  async checkHealth() {
    const response = await this.request("/health");
    return response;
  }
}

// Export singleton instance
export const adminApi = new AdminApiClient();
export default adminApi;
