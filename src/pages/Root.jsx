import React from "react";
import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import LoginStateBar from "components/LoginStateBar";
import { ShopApiProvider } from "context/ShopContext";

const queryClient = new QueryClient();
export default function Root() {
  return (
    <>
      <ShopApiProvider>
        <QueryClientProvider client={queryClient}>
          <LoginStateBar />
          <Header />
          <Outlet />
        </QueryClientProvider>
      </ShopApiProvider>
    </>
  );
}
