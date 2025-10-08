"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function TopProgressBar() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // trigger on route change
    setActive(true)
    setKey((k) => k + 1)
    const done = setTimeout(() => setActive(false), 700) // keep it visible briefly
    return () => clearTimeout(done)
  }, [pathname])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={key}
          className="pointer-events-none fixed left-0 right-0 top-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] bg-gradient-to-r from-white via-white/70 to-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
