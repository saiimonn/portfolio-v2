"use client"

import type { ReactNode } from "react"
import SmoothScroll from "./components/smooth-scroll"

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {children}
    </>
  )
}
