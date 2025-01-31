"use client";
import { useHttpService } from "@/app/providers/AccessTokenProvider";
import React, { useEffect, useState } from "react";

const About = () => {
  const { httpService, refreshAccessToken } = useHttpService();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      console.log("getProfile called");
      const res: any = await httpService.get("/api/profile");
      console.log("response", res);
      
      const responseData = res.data;
      const { statusCode } = responseData || {};

      // If we receive a 401 Unauthorized, attempt to refresh the token once
      if (statusCode === 401 && retryCount < 1) {
        console.log("Token expired, refreshing...");
        setRetryCount(prev => prev + 1); // Increment retry count
        await refreshAccessToken(); // Refresh the token
        getProfile(); // Retry the API call
      }
    } catch (err) {
      console.log("err", err);
      // Handle error (e.g., token refresh failed)
    }
  };

  return <div>{/* Your JSX content */}</div>;
};

export default About;
