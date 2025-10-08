"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Database, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/particles-background"
import { GlassCard } from "@/components/glass-card"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span className="text-xs text-purple-300 font-mono">Vappautta Liberty's</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight text-balance drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              Explore the world of Touhou Project
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-pretty">
              Discover characters, places, and races from the magical realm of Gensokyo. Your comprehensive database for
              all things Touhou.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 font-medium px-8 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
              >
                <Link href="/characters">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500/30 hover:bg-purple-500/10 font-medium px-8 bg-transparent backdrop-blur-sm text-white hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/characters" className="group">
                <GlassCard>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Characters</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Browse through all Touhou characters from games 6 to 19.5 with detailed information.
                  </p>
                </GlassCard>
              </Link>

              <Link href="/places" className="group">
                <GlassCard>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Places</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Explore the mystical locations and landmarks throughout Gensokyo.
                  </p>
                </GlassCard>
              </Link>

              <Link href="/races" className="group">
                <GlassCard>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Database className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Races</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Learn about the diverse species and beings inhabiting the world.
                  </p>
                </GlassCard>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="grid grid-cols-3 gap-8 py-12 border-t border-purple-500/20 bg-black/20 backdrop-blur-sm rounded-2xl px-8 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  200+
                </div>
                <div className="text-sm text-gray-300">Characters</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  50+
                </div>
                <div className="text-sm text-gray-300">Locations</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  30+
                </div>
                <div className="text-sm text-gray-300">Races</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
