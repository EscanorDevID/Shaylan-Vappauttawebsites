"use client"

import type React from "react"

import { useRef, useState } from "react"

function PopOutText({ text }: { text: string }) {
  // 3D interactive text that "pops" on hover/click with perspective tilt
  const ref = useRef<HTMLDivElement>(null)
  const [popped, setPopped] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "translateZ(0) rotateX(0deg) rotateY(0deg) scale(1)",
  })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateY = ((x - midX) / midX) * 6 // left/right tilt
    const rotateX = -((y - midY) / midY) * 6 // up/down tilt
    setStyle({
      transform: `translateZ(${popped ? 48 : 24}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${popped ? 1.06 : 1.02})`,
    })
  }

  function handleLeave() {
    setStyle({
      transform: `translateZ(${popped ? 48 : 0}px) rotateX(0deg) rotateY(0deg) scale(${popped ? 1.06 : 1})`,
    })
  }

  function togglePop() {
    setPopped((p) => {
      const next = !p
      setStyle({
        transform: `translateZ(${next ? 48 : 0}px) rotateX(0deg) rotateY(0deg) scale(${next ? 1.06 : 1})`,
      })
      return next
    })
  }

  return (
    <div
      ref={ref}
      // perspective wrapper to enable 3D transforms
      style={{ perspective: "1000px" }}
      className="mx-auto w-full max-w-[28rem] select-none"
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={popped}
        onClick={togglePop}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), togglePop())}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative outline-none"
        style={style}
      >
        <span
          className="block text-center text-5xl md:text-6xl font-extrabold tracking-tight
                     bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                     drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)]"
        >
          {text}
        </span>
        {/* Subtle 3D shadow to sell the pop-out effect */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 60%, rgba(255,255,255,0.12) 0%, rgba(168,85,247,0.14) 45%, transparent 70%)",
          }}
        />
      </div>
      <p className="mt-3 text-center text-sm text-white/60">Click or press Enter/Space to pop the title out.</p>
    </div>
  )
}

export default function ComingSoonPage({
  searchParams,
}: {
  searchParams?: { feature?: string }
}) {
  const label = (searchParams?.feature || "This feature").toString()
  const isDiscord = label.toLowerCase() === "discord"

  if (isDiscord) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8">
          <PopOutText text="Coming Soon" />
          <div
            className="h-0.5 w-28 mx-auto bg-gradient-to-r from-white via-white to-purple-500 rounded-full mt-6 mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white text-balance mb-2">Discord server is coming soon</h1>
          <p className="text-gray-300 text-pretty mb-6">
            We’re preparing our community hub. Check back soon or try another platform below.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
            >
              Back to Home
            </a>
            <a
              href="https://chat.whatsapp.com/KFSesMsm3zX63yazgo0Yw6"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:text-white bg-white/0 hover:bg-white/5 border border-white/10 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try WhatsApp
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8">
        <PopOutText text={`${label} Coming Soon`} />
        <div
          className="h-0.5 w-28 mx-auto bg-gradient-to-r from-white via-white to-purple-500 rounded-full mt-6 mb-4"
          aria-hidden="true"
        />
        <p className="text-gray-300 text-pretty mb-6">
          We’re working hard to bring {label.toLowerCase()} to you. Check back later for updates.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
          >
            Back to Home
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:text-white bg-white/0 hover:bg-white/5 border border-white/10 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  )
}
