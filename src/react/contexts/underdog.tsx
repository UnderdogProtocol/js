import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactNode } from "react";

type UnderodogProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function UnderdogProvider({ children }: UnderodogProviderProps) {
  return <QueryClientProvider client={queryClient} contextSharing>{children}</QueryClientProvider>;
}
