"use client";
import React, { useState, useEffect } from "react";

interface AlertProps {
  message: string;
  type: string;
}

const getAlertStyles = (type: string) => {
  switch (type) {
    case "danger":
      return "bg-red-500 text-white";
    case "info":
      return "bg-blue-500 text-white";
    case "warning":
      return "bg-yellow-500 text-black";
    case "success":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

let triggerAlert: (message: string, type: string) => void;

const Alert: React.FC = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  let removeAlert: ReturnType<typeof setTimeout>;
  useEffect(() => {
    triggerAlert = (message: string, type: string) => {
      setAlert({ message, type });
      removeAlert= setTimeout(() => {
        setAlert(null);
      }, 5000);
    };
    return()=>clearTimeout(removeAlert)
  }, []);

  if (!alert) return null;

  const { message, type } = alert;
  const alertStyles = getAlertStyles(type);

  return (
    <div
      className={`fixed max-w-[250px] z-40 top-[3rem] right-[1rem] md:right-[4rem] px-4 py-2 rounded shadow-lg ${alertStyles}`}
    >
      <button
        className="absolute top-0 right-1 text-white text-[20px]"
        onClick={() => setAlert(null)}
      >
        &times;
      </button>
      <div className="p-2 py-0">{message}</div>
      <div className="relative mt-2 h-1 bg-gray-200">
        <div className="absolute top-0 left-0 h-full bg-white animate-progress"></div>
      </div>
    </div>
  );
};

export const useAlert = () => triggerAlert;

export default Alert;
