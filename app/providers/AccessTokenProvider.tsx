"use client";

import React, { createContext, useEffect, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import HttpService from "../service/Http.service";

interface HttpServiceContextType {
  httpService: HttpService;
  refreshAccessToken: () => Promise<string | null>;
}

const HttpServiceContext = createContext<HttpServiceContextType | null>(null);

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const httpService = new HttpService();
  const router = useRouter();

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const now = Date.now();

      if (!tokenExpiry || now >= parseInt(tokenExpiry, 50)) {
        const response: any = await httpService.post("/api/auth/refresh");
        const { accessToken } = response.data.data;
        const expiry = now + 60 * 60 * 1000; // Set expiry to 1 hour from now
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("tokenExpiry", expiry.toString());
        return accessToken;
      } else {
        return localStorage.getItem("accessToken");
      }
    } catch (error) {
      router.push("/login");
      throw new Error("Failed to refresh token, redirecting to login");
    }
  };

  useEffect(() => {
    refreshAccessToken(); // Try to refresh the token on mount
  }, [httpService]);

  return (
    <HttpServiceContext.Provider value={{ httpService, refreshAccessToken }}>
      {children}
    </HttpServiceContext.Provider>
  );
};

// Hook to access the HttpService instance
export const useHttpService = () => {
  const context = useContext(HttpServiceContext);
  if (!context) {
    throw new Error("useHttpService must be used within AccessTokenProvider");
  }
  return context;
};
