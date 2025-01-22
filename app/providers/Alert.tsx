"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

// Define the shape of the alert context
interface AlertContextType {
  triggerAlert: (message: string, type: string) => void;
}

// Create a context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// AlertProvider component
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

  const triggerAlert = useCallback((message: string, type: string) => {
    setAlert({ message, type });

    const timeout = setTimeout(() => {
      setAlert(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AlertContext.Provider value={{ triggerAlert }}>
      {children}
      {alert && (
        <div
          className={`fixed max-w-[250px] z-40 top-[3rem] right-[1rem] md:right-[4rem] px-4 py-2 rounded shadow-lg ${
            alert.type === "danger"
              ? "bg-red-500 text-white"
              : alert.type === "info"
              ? "bg-blue-500 text-white"
              : alert.type === "warning"
              ? "bg-yellow-500 text-black"
              : "bg-gray-500 text-white"
          }`}
        >
          <button
            className="absolute top-0 right-1 text-white text-[20px]"
            onClick={() => setAlert(null)}
          >
            &times;
          </button>
          <div className="p-2 py-0">{alert.message}</div>
          <div className="relative mt-2 h-1 bg-gray-200">
            <div className="absolute top-0 left-0 h-full bg-white animate-progress"></div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// Hook to use the alert context
export const useAlert = () => {
  console.log('useAler boom')
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context.triggerAlert;
};

export default AlertProvider;
