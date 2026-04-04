"use client";

import BrowserHistoryReload from "@/components/ui/BrowserHistoryReload";
import SessionWrapper from "@/components/sessionWrapper";
import { CookiesProvider } from "react-cookie";
import { ApolloWrapper } from "./_libs/apolloWrapper";
import { ReduxProvider } from "./_redux/provider";
export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <BrowserHistoryReload />
      <SessionWrapper>
        <ReduxProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ReduxProvider>
      </SessionWrapper>
    </CookiesProvider>
  );
}
