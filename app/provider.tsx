"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import SmoothScroll from "./components/smooth-scroll"

export default function AppProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client = {queryClient}>
      <SmoothScroll />
      {children}
    </QueryClientProvider>
  )
}