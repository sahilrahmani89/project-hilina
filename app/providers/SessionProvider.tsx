"use client"
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';



export const SessionProviders = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

