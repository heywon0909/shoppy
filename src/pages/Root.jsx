import React from "react";
import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import LoginStateBar from "components/LoginStateBar";
import { LoginApiProvider } from "context/LoginContext";

const queryClient = new QueryClient();
export default function Root() {
  return (
    <>
      <LoginApiProvider>
        <QueryClientProvider client={queryClient}>
          <LoginStateBar />
          <Header />
          <Outlet />
        </QueryClientProvider>
      </LoginApiProvider>
    </>
  );
}
