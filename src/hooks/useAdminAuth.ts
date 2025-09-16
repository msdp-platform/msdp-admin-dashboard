"use client";

import { adminApi } from "@/lib/adminApi";
import { useCallback, useEffect, useState } from "react";

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // ✅ Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        // Verify token by calling admin service
        const response = await adminApi.getAdminUsers();
        if (response) {
          // Token is valid, user is authenticated
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          }));
        }
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem("adminToken");
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: "Session expired",
        }));
      }
    };

    checkAuth();
  }, []);

  // ✅ Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await adminApi.login(email, password);

      if (response.success) {
        setAuthState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }, []);

  // ✅ Logout function
  const logout = useCallback(() => {
    adminApi.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // ✅ Check if user has specific permission
  const hasPermission = useCallback(
    (permission: string) => {
      if (!authState.user) return false;
      return (
        authState.user.permissions.includes(permission) ||
        authState.user.permissions.includes("all") ||
        authState.user.role === "super_admin"
      );
    },
    [authState.user]
  );

  // ✅ Check if user has specific role
  const hasRole = useCallback(
    (role: string) => {
      if (!authState.user) return false;
      return authState.user.role === role;
    },
    [authState.user]
  );

  return {
    ...authState,
    login,
    logout,
    hasPermission,
    hasRole,
  };
}
