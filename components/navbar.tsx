"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isTouhouOpen, setIsTouhouOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuId = "touhou-mega"
  const joinMenuId = "join-mega"

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsTouhouOpen(true)
    setIsJoinOpen(false)
  }

  function scheduleClose(delay = 120) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setIsTouhouOpen(false), delay)
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 hidden md:block font-mono"
    >
      <div className="mx-auto px-3">
        <div className="w-full h-16 border-b border-border bg-background/80 supports-[backdrop-filter]:backdrop-blur will-change-transform">
          <div className="flex items-center justify-between h-full px-4">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-purple-300 transition-colors"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              Vappautta Liberty's
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {/* Other top-level links */}
              <Link
                href="/"
                className="px-3 py-2 text-xs text-foreground/80 hover:text-foreground transition-[color,background] duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-xs text-foreground/80 hover:text-foreground transition-[color,background] duration-200"
              >
                About
              </Link>

              {/* Touhou (mega menu trigger) */}
              <div
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={() => scheduleClose()}
                onFocus={openMenu}
                onBlur={() => scheduleClose()}
              >
                <button
                  className="px-3 py-2 text-xs font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/[0.04] border border-transparent hover:border-foreground/10 transition-[color,background,border-color] duration-200 inline-flex items-center gap-1 will-change-transform"
                  aria-haspopup="menu"
                  aria-expanded={isTouhouOpen}
                  aria-controls={menuId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setIsTouhouOpen((v) => !v)
                    } else if (e.key === "Escape") {
                      setIsTouhouOpen(false)
                    }
                  }}
                >
                  Touhou
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {isTouhouOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 6, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.985 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 md:left-auto md:right-0 mt-2 w-[640px] max-w-[min(92vw,720px)] rounded-none border border-border bg-background/95 supports-[backdrop-filter]:backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      role="menu"
                      id={menuId}
                      onMouseEnter={openMenu}
                      onMouseLeave={() => scheduleClose()}
                    >
                      {/* Inner border frame */}
                      <div className="m-2 rounded-none border border-border">
                        {/* Grid */}
                        <div className="grid grid-cols-2 gap-6 p-4">
                          {/* Core Features */}
                          <div className="space-y-2">
                            <div className="text-[10px] uppercase tracking-wider text-foreground/40">Core Features</div>

                            <Link
                              href="/characters"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">Characters</div>
                              <div className="text-xs text-foreground/60">Semua karakter Touhou (6–19.5)</div>
                            </Link>

                            <Link
                              href="/places"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">Places</div>
                              <div className="text-xs text-foreground/60">Lokasi penting di Gensokyo</div>
                            </Link>

                            <Link
                              href="/races"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">Races</div>
                              <div className="text-xs text-foreground/60">Klasifikasi ras & spesies</div>
                            </Link>
                          </div>

                          {/* More */}
                          <div className="space-y-2">
                            <div className="text-[10px] uppercase tracking-wider text-foreground/40">More</div>

                            {/* Reimu AI link into More section */}
                            <Link
                              href="/reimu-ai"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">Reimu AI</div>
                              <div className="text-xs text-foreground/60">Chat assistant for Touhou</div>
                            </Link>

                            {/* Coming Soon Entries */}
                            <Link
                              href="/coming-soon?feature=Shanghai%20Alice"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">Shanghai Alice</div>
                              <div className="text-xs text-foreground/60">Coming soon</div>
                            </Link>

                            <Link
                              href="/coming-soon?feature=FAQ"
                              className="block rounded-none p-2 hover:bg-foreground/[0.04] transition-colors"
                              role="menuitem"
                            >
                              <div className="text-sm font-semibold text-foreground">FAQ</div>
                              <div className="text-xs text-foreground/60">Coming soon</div>
                            </Link>
                          </div>
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between border-t border-border px-4 py-3">
                          <div className="text-xs text-foreground/70">
                            <span className="font-medium">New:</span> Issue discussion summaries
                          </div>
                          <a
                            href="#"
                            className="text-xs text-purple-300 hover:text-purple-200 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-colors"
                          >
                            Changelog
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Join Us dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                  setIsJoinOpen(true)
                  setIsTouhouOpen(false)
                }}
                onMouseLeave={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                  closeTimer.current = setTimeout(() => setIsJoinOpen(false), 120)
                }}
                onFocus={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                  setIsJoinOpen(true)
                  setIsTouhouOpen(false)
                }}
                onBlur={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                  closeTimer.current = setTimeout(() => setIsJoinOpen(false), 120)
                }}
              >
                <button
                  className="px-3 py-2 text-xs font-medium text-foreground/90 hover:text-foreground bg-transparent hover:bg-foreground/[0.04] border border-transparent hover:border-foreground/10 transition-[color,background,border-color] duration-200 inline-flex items-center gap-1 will-change-transform"
                  aria-haspopup="menu"
                  aria-expanded={isJoinOpen}
                  aria-controls={joinMenuId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setIsJoinOpen((v) => !v)
                      setIsTouhouOpen(false)
                    } else if (e.key === "Escape") {
                      setIsJoinOpen(false)
                    }
                  }}
                >
                  Join Us
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {isJoinOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 6, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.985 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 mt-2 w-[360px] max-w-[min(92vw,420px)] rounded-none border border-border bg-background/95 supports-[backdrop-filter]:backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      role="menu"
                      id={joinMenuId}
                      onMouseEnter={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current)
                        setIsJoinOpen(true)
                      }}
                      onMouseLeave={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current)
                        closeTimer.current = setTimeout(() => setIsJoinOpen(false), 120)
                      }}
                    >
                      {/* Inner border frame */}
                      <div className="m-2 rounded-none border border-border">
                        <div className="space-y-2 p-4">
                          <div className="text-[10px] uppercase tracking-wider text-foreground/40">
                            Join the community
                          </div>

                          {/* Discord option */}
                          <Link
                            href="/coming-soon?feature=Discord"
                            className="block rounded-none p-3 hover:bg-foreground/[0.04] transition-colors"
                            role="menuitem"
                          >
                            <div className="text-sm font-semibold text-foreground">Discord</div>
                            <div className="text-xs text-foreground/60">
                              Chat with fans, share resources, and get updates.
                            </div>
                          </Link>

                          {/* WhatsApp option */}
                          <a
                            href="https://chat.whatsapp.com/KFSesMsm3zX63yazgo0Yw6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-none p-3 hover:bg-foreground/[0.04] transition-colors"
                            role="menuitem"
                          >
                            <div className="text-sm font-semibold text-foreground">WhatsApp</div>
                            <div className="text-xs text-foreground/60">
                              Quick messages and announcements in a small group.
                            </div>
                          </a>
                        </div>
                        <div className="border-t border-border px-4 py-3 text-xs text-foreground/70">
                          Choose your preferred platform to join us.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right controls */}
              <div className="pl-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile actions left for mobile nav */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
