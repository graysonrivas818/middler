"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider 
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
