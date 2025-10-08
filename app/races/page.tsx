"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"

const races = [
  {
    category: "Human (人間)",
    icon: "👧",
    description: "Makhluk fana, umur terbatas, tapi punya kekuatan spiritual atau magis tinggi.",
    examples: [
      "Reimu Hakurei",
      "Marisa Kirisame",
      "Sanae Kochiya",
      "Fujiwara no Mokou",
      "Keine Kamishirasawa",
      "Akyuu Hieda",
    ],
    note: 'Sebagian besar manusia biasa tinggal di Human Village, tapi ada manusia "luar biasa" seperti Reimu dan Marisa yang bergaul dengan youkai.',
  },
  {
    category: "Youkai (妖怪)",
    icon: "👹",
    description:
      "Makhluk supranatural yang lahir dari emosi, konsep, atau ketakutan manusia. Jenisnya sangat banyak, dari hewan sampai objek hidup.",
    subcategories: [
      {
        name: "Vampire (吸血鬼)",
        description: "Youkai malam peminum darah, sensitif matahari",
        examples: ["Remilia Scarlet", "Flandre Scarlet"],
      },
      {
        name: "Fairy (妖精)",
        description: "Roh alam, merepresentasikan fenomena alami",
        examples: ["Cirno", "Sunny Milk", "Luna Child", "Star Sapphire"],
      },
      {
        name: "Tengu (天狗)",
        description: "Makhluk bersayap di Gunung Youkai, cepat dan pandai informasi",
        examples: ["Aya Shameimaru", "Megumu Iizunamaru"],
      },
      { name: "Kappa (河童)", description: "Makhluk air jenius teknologi", examples: ["Nitori Kawashiro"] },
      {
        name: "Oni (鬼)",
        description: "Ras kuat dari neraka, menyukai minuman keras dan pertarungan",
        examples: ["Yuugi Hoshiguma", "Suika Ibuki"],
      },
      {
        name: "Kitsune (狐)",
        description: "Rubah pintar dengan kemampuan transformasi",
        examples: ["Ran Yakumo", "Tsukasa Kudamaki"],
      },
    ],
  },
  {
    category: "Gods / Deities (神)",
    icon: "💫",
    description:
      'Entitas spiritual yang memperoleh kekuatan dari kepercayaan manusia. Mereka bisa "mati" jika dilupakan.',
    subcategories: [
      {
        name: "Shinto Gods (Kami)",
        description: "Dewa alam dan kepercayaan Jepang",
        examples: ["Kanako Yasaka", "Suwako Moriya"],
      },
      { name: "Celestials (天人)", description: "Manusia yang mencapai status surgawi", examples: ["Tenshi Hinanawi"] },
      {
        name: "Divine Spirits (神霊)",
        description: "Jiwa suci dari manusia terhormat",
        examples: ["Toyosatomimi no Miko", "Futo", "Tojiko"],
      },
      { name: "Hell Gods", description: "Dewa neraka", examples: ["Hecatia Lapislazuli", "Junko"] },
    ],
  },
  {
    category: "Spirits / Ghosts (霊・亡霊)",
    icon: "👻",
    description: "Jiwa manusia setelah mati, bisa baik atau jahat. Tinggal di Netherworld atau Higan.",
    subcategories: [
      { name: "Ghost (幽霊)", description: "Arwah biasa", examples: ["Prismriver Sisters"] },
      { name: "Half-Ghost (半人半霊)", description: "Setengah manusia, setengah roh", examples: ["Youmu Konpaku"] },
      { name: "Phantom (亡霊)", description: "Arwah kuat dengan bentuk fisik", examples: ["Yuyuko Saigyouji"] },
      {
        name: "Animal Spirit (獣霊)",
        description: "Jiwa binatang dari neraka",
        examples: ["Keiki Haniyasushin", "Yachie Kicchou", "Saki Kurokoma"],
      },
    ],
  },
  {
    category: "Lunarian & Moon Rabbit (月人・月の兎)",
    icon: "🐇",
    description: "Makhluk dari Bulan, murni secara spiritual dan berteknologi tinggi.",
    subcategories: [
      {
        name: "Lunarian (月人)",
        description: "Bangsa ilahi dari Bulan",
        examples: ["Eirin Yagokoro", "Sagume Kishin"],
      },
      {
        name: "Moon Rabbit (月の兎)",
        description: "Prajurit & pekerja Bulan",
        examples: ["Reisen Udongein Inaba", "Seiran", "Ringo"],
      },
    ],
  },
  {
    category: "Hell Beings (地獄の存在)",
    icon: "🔥",
    description: "Makhluk dari neraka — termasuk shinigami dan dewa penghukum.",
    subcategories: [
      { name: "Shinigami (死神)", description: "Pemandu jiwa ke dunia roh", examples: ["Komachi Onozuka"] },
      { name: "Yama (閻魔)", description: "Hakim dunia roh", examples: ["Eiki Shiki, Yamaxanadu"] },
      {
        name: "Hell Raven (地獄鴉)",
        description: "Burung neraka yang membawa kekuatan nuklir",
        examples: ["Utsuho Reiuji"],
      },
      { name: "Kasha (火車)", description: "Pengangkut mayat", examples: ["Rin Kaenbyou"] },
    ],
  },
  {
    category: "Taoist (道士 / Hermit)",
    icon: "🌸",
    description: "Manusia yang mempelajari cara memperpanjang hidup dan menjadi semi-dewa.",
    examples: ["Seiga Kaku", "Mononobe no Futo", "Toyosatomimi no Miko"],
  },
  {
    category: "Dream Beings (夢の存在)",
    icon: "🌀",
    description: "Makhluk dari dunia mimpi, tidak sepenuhnya nyata.",
    examples: ["Doremy Sweet"],
  },
  {
    category: "Artificial & Miscellaneous",
    icon: "💎",
    description: "Makhluk buatan atau yang tidak terklasifikasi.",
    subcategories: [
      {
        name: "Tsukumogami (付喪神)",
        description: "Objek hidup setelah 100 tahun",
        examples: ["Kogasa", "Benben", "Yatsuhashi", "Raiko"],
      },
      {
        name: "Doll (人形)",
        description: "Boneka hidup, bisa dikendalikan atau sadar diri",
        examples: ["Shanghai", "Hourai"],
      },
      { name: "Golem / Haniwa", description: "Patung pelindung spiritual", examples: ["Mayumi Joutouguu"] },
      { name: "Constructed God", description: "Dewa ciptaan dari seni atau patung", examples: ["Keiki Haniyasushin"] },
    ],
  },
]

export default function RacesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRaces = races.filter((race) => {
    const matchesCategory = race.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDescription = race.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExamples = race.examples?.some((ex) => ex.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubcategories = race.subcategories?.some(
      (sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.examples.some((ex) => ex.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    return matchesCategory || matchesDescription || matchesExamples || matchesSubcategories
  })

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 text-balance">Touhou Races</h1>
          <p className="text-xl text-gray-300 mb-6 text-pretty">Learn about the diverse races inhabiting Gensokyo</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search races..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/50"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          {filteredRaces.map((race, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card/50 backdrop-blur border-purple-500/30 p-4 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{race.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-purple-400 mb-2">{race.category}</h2>
                    <p className="text-sm text-gray-300 mb-2">{race.description}</p>
                    {race.note && <p className="text-xs text-gray-400 italic mb-2">📜 Catatan: {race.note}</p>}
                    {race.examples && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-purple-300 mb-1">Perwakilan:</p>
                        <div className="flex flex-wrap gap-2">
                          {race.examples.map((example, i) => (
                            <span key={i} className="text-xs bg-purple-900/30 text-purple-200 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {race.subcategories && (
                      <div className="space-y-2 mt-3">
                        {race.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="bg-background/30 rounded-lg p-3 border border-purple-500/20">
                            <h3 className="font-bold text-purple-300 mb-1 text-sm">{sub.name}</h3>
                            <p className="text-xs text-gray-400 mb-2">{sub.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {sub.examples.map((example, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-purple-900/40 text-purple-200 px-2 py-0.5 rounded"
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No races found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
