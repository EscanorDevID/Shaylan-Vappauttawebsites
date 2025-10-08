"use client"

import { useEffect, useState, type PropsWithChildren } from "react"

export default function AppearOnMount({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    // Mark a pre-state to avoid FOUC and trigger transitions only when appropriate
    document.documentElement.classList.add("appear-boot")
    if (!mql.matches) {
      requestAnimationFrame(() => {
        document.documentElement.classList.add("ready")
        setMounted(true)
      })
    } else {
      document.documentElement.classList.add("ready")
      setMounted(true)
    }
    return () => {
      document.documentElement.classList.add("ready")
    }
  }, [])

  // Wrapper element that the CSS targets for the blur→clear entrance
  return <div className="appear-page">{children}</div>
}
