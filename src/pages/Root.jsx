import React from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Headers from "components/Headers";
import { AuthContextProvider } from "context/AuthContext";

const queryClient = new QueryClient();
export default function Root() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Headers />
          <Outlet />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
