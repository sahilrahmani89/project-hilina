"use client";

import React, { createContext, useEffect, ReactNode, useContext } from 'react';
import HttpService from '../service/Http.service';
import { useRouter } from "next/navigation";


const HttpServiceContext = createContext<HttpService | null>(null);

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const httpService = new HttpService();
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      try {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const now = Date.now();

        if (!tokenExpiry || now >= parseInt(tokenExpiry, 10)) {
          const response:any = await httpService.get('/api/auth/refresh');
          const { accessToken } = response.data;

          const expiry = now + 10 * 60 * 1000; // 
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('tokenExpiry', expiry.toString());
        }else{
            return true
        }
      } catch (error) {
            router.push('/login')
      }
    };

    initAuth();
  }, [httpService]);

  return (
    <HttpServiceContext.Provider value={httpService}>
      {children}
    </HttpServiceContext.Provider>
  );
};

// Hook to access the HttpService instance
export const useHttpService = () => {
  const context = useContext(HttpServiceContext);
  if (!context) {
    throw new Error('useHttpService must be used within AccessTokenProvider');
  }
  return context;
};
