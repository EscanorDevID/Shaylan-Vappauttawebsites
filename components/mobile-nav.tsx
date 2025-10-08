"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, MapPin, Users, Bot, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function MobileNav() {
  const pathname = usePathname()
  const lastY = useRef(0)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/characters", icon: BookOpen, label: "Characters" },
    { href: "/places", icon: MapPin, label: "Places" },
    { href: "/races", icon: Users, label: "Races" },
    { href: "/reimu-ai", icon: Bot, label: "AI" },
  ]

  // Show when scrolling up, hide on scroll down
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      const goingDown = y > lastY.current
      // Threshold to avoid jitter
      if (Math.abs(y - lastY.current) > 6) {
        setVisible(!goingDown || y < 24)
        lastY.current = y
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top animated navbar - mobile only */}
      <motion.nav
        className="md:hidden fixed left-0 right-0 top-0 z-50 flex justify-center font-mono"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: visible ? 0 : -64, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.8 }}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-0 mt-0 w-full">
          <div className="flex items-center justify-between border-b border-border bg-background/80 supports-[backdrop-filter]:backdrop-blur px-3 py-2">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
              <span className="sr-only">Logo</span>
              <span className="text-sm font-medium text-white/90">Vappautta Liberty&apos;s</span>
            </Link>

            {/* Current section indicator */}
            <div className="pointer-events-none select-none text-xs text-white/60">
              {navItems.find((n) => n.href === pathname)?.label ?? "Menu"}
            </div>

            <button
              aria-label="Open navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1 border border-foreground/10 bg-transparent px-2 py-1 text-sm text-foreground hover:bg-foreground/[0.04] active:scale-95 transition rounded-none"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open Menu</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-0 right-0 top-0 mt-[calc(env(safe-area-inset-top))] border-b border-border bg-background/95 p-3 rounded-none font-mono"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">Navigation</span>
                <button
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                  className="border border-foreground/10 bg-transparent p-2 text-foreground hover:bg-foreground/[0.04] active:scale-95 transition rounded-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-none border px-3 py-3 transition ${
                        isActive
                          ? "border-foreground/20 bg-foreground/[0.06] text-foreground"
                          : "border-foreground/10 bg-transparent text-foreground hover:bg-foreground/[0.04]"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-none ${isActive ? "bg-foreground/[0.10] text-foreground" : "bg-transparent text-foreground"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-white/60">
                          {item.label === "AI" ? "Reimu AI status: unavailable" : `Go to ${item.label}`}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-3 flex items-center justify-between border border-foreground/10 bg-transparent p-2 text-xs text-foreground/70 rounded-none">
                <span>Vappautta Liberty&apos;s • Touhou Project</span>
                <span>v1.0</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
