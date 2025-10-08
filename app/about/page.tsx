"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import LiveStatsCard from "@/components/live-stats-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            About Vappautta Liberty's
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Your gateway to the magical world of Touhou Project
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-5 md:p-6 hover:bg-card transition-colors">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Vappautta Liberty's is dedicated to bringing the enchanting world of Touhou Project to fans around
                    the globe. We provide comprehensive information about characters, places, and races from the beloved
                    bullet hell game series created by ZUN.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <section className="rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-5 md:p-6 hover:bg-card transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">News</h2>
                <a
                  href="/coming-soon?feature=News"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  See more →
                </a>
              </div>
              <div
                className="h-0.5 w-24 bg-gradient-to-r from-white via-white to-purple-500 rounded-full mb-6"
                aria-hidden="true"
              />

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href="/coming-soon?feature=Bunbunmaru%20News"
                  className="group rounded-xl border border-border hover:bg-accent/40 transition-colors"
                >
                  <div className="p-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <img
                          src="/images/news-coming-soon.png"
                          alt="Coming soon placeholder"
                          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                          <span className="sr-only">Coming soon</span>
                          <span
                            className="opacity-0 group-hover:opacity-100 text-2xl md:text-3xl font-extrabold tracking-tight
                                       bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                                       drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)] transition-opacity duration-300"
                          >
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </AspectRatio>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                      <h3 className="font-semibold text-foreground group-hover:underline">Bunbunmaru News</h3>
                    </div>
                  </div>
                </a>

                <a
                  href="/coming-soon?feature=Touhou%20Birthday"
                  className="group rounded-xl border border-border hover:bg-accent/40 transition-colors"
                >
                  <div className="p-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <img
                          src="/images/news-coming-soon.png"
                          alt="Coming soon placeholder"
                          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                          <span className="sr-only">Coming soon</span>
                          <span
                            className="opacity-0 group-hover:opacity-100 text-2xl md:text-3xl font-extrabold tracking-tight
                                       bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                                       drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)] transition-opacity duration-300"
                          >
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </AspectRatio>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                      <h3 className="font-semibold text-foreground group-hover:underline">Touhou Birthday</h3>
                    </div>
                  </div>
                </a>

                <a
                  href="/coming-soon?feature=Shanghai%20Alice"
                  className="group rounded-xl border border-border hover:bg-accent/40 transition-colors"
                >
                  <div className="p-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <img
                          src="/images/news-coming-soon.png"
                          alt="Coming soon placeholder"
                          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                          <span className="sr-only">Coming soon</span>
                          <span
                            className="opacity-0 group-hover:opacity-100 text-2xl md:text-3xl font-extrabold tracking-tight
                                       bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                                       drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)] transition-opacity duration-300"
                          >
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </AspectRatio>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                      <h3 className="font-semibold text-foreground group-hover:underline">Shanghai Alice</h3>
                    </div>
                  </div>
                </a>

                <a
                  href="/coming-soon?feature=When%20Touhou%2020%20Released"
                  className="group rounded-xl border border-border hover:bg-accent/40 transition-colors"
                >
                  <div className="p-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <img
                          src="/images/news-coming-soon.png"
                          alt="Coming soon placeholder"
                          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                          <span className="sr-only">Coming soon</span>
                          <span
                            className="opacity-0 group-hover:opacity-100 text-2xl md:text-3xl font-extrabold tracking-tight
                                       bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                                       drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)] transition-opacity duration-300"
                          >
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </AspectRatio>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                      <h3 className="font-semibold text-foreground group-hover:underline">When Touhou 20 Released</h3>
                    </div>
                  </div>
                </a>

                <a
                  href="/coming-soon?feature=And%20More!"
                  className="group rounded-xl border border-border hover:bg-accent/40 transition-colors sm:col-span-2 lg:col-span-1"
                >
                  <div className="p-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="relative h-full w-full">
                        <img
                          src="/images/news-coming-soon.png"
                          alt="Coming soon placeholder"
                          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                          <span className="sr-only">Coming soon</span>
                          <span
                            className="opacity-0 group-hover:opacity-100 text-2xl md:text-3xl font-extrabold tracking-tight
                                       bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent
                                       drop-shadow-[0_6px_24px_rgba(168,85,247,0.25)] transition-opacity duration-300"
                          >
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </AspectRatio>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                      <h3 className="font-semibold text-foreground group-hover:underline">And more!</h3>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-5 md:p-6 hover:bg-card transition-colors">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground mb-3">Explore the Library</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dive into curated sections for Characters, Places, and Races from the world of Touhou.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Characters */}
                <div className="rounded-lg border border-border p-4 hover:bg-accent/40 transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Characters</h3>
                  <p className="text-sm text-muted-foreground mb-3">Browse the complete roster from Touhou 6–19.5.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Reimu Hakurei</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Marisa Kirisame</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Sakuya Izayoi</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Remilia Scarlet</span>
                  </div>
                  <Button asChild size="sm" className="font-medium">
                    <Link href="/characters">Browse Characters</Link>
                  </Button>
                </div>

                {/* Places */}
                <div className="rounded-lg border border-border p-4 hover:bg-accent/40 transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Places</h3>
                  <p className="text-sm text-muted-foreground mb-3">Explore iconic locations across Gensokyo.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Hakurei Shrine</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Scarlet Devil Mansion</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Youkai Mountain</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Bamboo Forest</span>
                  </div>
                  <Button asChild size="sm" className="font-medium">
                    <Link href="/places">Browse Places</Link>
                  </Button>
                </div>

                {/* Races */}
                <div className="rounded-lg border border-border p-4 hover:bg-accent/40 transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Races</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn about the beings and species that inhabit the world.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Human</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Youkai</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Tengu</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border">Kappa</span>
                  </div>
                  <Button asChild size="sm" className="font-medium">
                    <Link href="/races">Browse Races</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <div>
            <LiveStatsCard />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-8"
          >
            <p className="text-muted-foreground text-sm">
              This is a fan-made website. Touhou Project is created by ZUN and Team Shanghai Alice.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
