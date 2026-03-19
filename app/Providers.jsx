"use client";

import SessionWrapper from "@/components/sessionWrapper";
import { CookiesProvider } from "react-cookie";
import { ApolloWrapper } from "./_libs/apolloWrapper";
import { ReduxProvider } from "./_redux/provider";
export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <SessionWrapper>
        <ReduxProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ReduxProvider>
      </SessionWrapper>
    </CookiesProvider>
  );
}
