import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import LoginStateBar from "../components/LoginStateBar";

const queryClient = new QueryClient();
export default function Root() {
  return (
    <>
      <LoginStateBar />
      <Header />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
