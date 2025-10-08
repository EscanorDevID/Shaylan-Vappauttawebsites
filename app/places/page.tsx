"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"

const places = [
  {
    name: "Hakurei Shrine (博麗神社)",
    description: "Kuil di perbatasan Gensokyo, tempat tinggal Reimu Hakurei. Titik awal hampir semua kejadian.",
  },
  {
    name: "Human Village (人間の里)",
    description: "Satu-satunya pemukiman besar manusia biasa. Tempat Keine dan Akyuu tinggal.",
  },
  {
    name: "Youkai Mountain (妖怪の山)",
    description: "Gunung besar yang jadi markas para tengu dan kappa. Tempat penting di Touhou 10 dan 12.",
  },
  {
    name: "Scarlet Devil Mansion (紅魔館)",
    description: "Rumah Remilia dan Flandre Scarlet, dikelilingi danau kabut. Muncul di Touhou 6.",
  },
  {
    name: "Forest of Magic (魔法の森)",
    description: "Hutan misterius tempat tinggal Marisa dan Alice. Dipenuhi racun dan kabut.",
  },
  {
    name: "Bamboo Forest of the Lost (迷いの竹林)",
    description: "Hutan bambu yang membingungkan, tempat tinggal Eientei dan Mokou.",
  },
  { name: "Eientei (永遠亭)", description: "Kediaman Kaguya dan Eirin di dalam Bamboo Forest. Muncul di Touhou 8." },
  {
    name: "Hakugyokurou (白玉楼)",
    description: "Istana dunia roh di bawah Netherworld. Tempat Yuyuko dan Youmu tinggal.",
  },
  { name: "Netherworld (冥界)", description: "Dunia arwah di luar batas Gensokyo." },
  {
    name: "Misty Lake (霧の湖)",
    description: "Danau besar yang diselimuti kabut, dekat Scarlet Devil Mansion. Cirno tinggal di sini.",
  },
  {
    name: "Underground Geyser Center / Former Hell (旧地獄)",
    description: "Dunia bawah tanah tempat para oni dan kasha tinggal. Setting utama Touhou 11.",
  },
  {
    name: "Palace of the Earth Spirits (地霊殿)",
    description: "Istana keluarga Komeiji (Satori & Koishi). Pusat bawah tanah di Touhou 11.",
  },
  { name: "Moriya Shrine (守矢神社)", description: "Kuil di atas Gunung Youkai, tempat Kanako, Suwako, dan Sanae." },
  {
    name: "The Great Mausoleum (神霊廟)",
    description: "Makam besar tempat kebangkitan Miko dan Futo. Setting utama Touhou 13.",
  },
  {
    name: "Myouren Temple (命蓮寺)",
    description: "Kuil yang didirikan oleh Byakuren Hijiri di Human Village. Muncul sejak Touhou 12.",
  },
  { name: "Divine Spirit Mausoleum (神霊廟)", description: "Area spiritual terkait Ten Desires." },
  { name: "Dream World (夢の世界)", description: "Alam mimpi yang dikendalikan oleh Doremy Sweet (Touhou 15)." },
  {
    name: "Lunar Capital (月の都)",
    description: "Kota para dewa bulan di bulan. Rumah Sagume dan Eirin (Touhou 8 & 15).",
  },
  {
    name: "Hell of Blazing Fires (灼熱地獄)",
    description: "Neraka panas, tempat Utsuho mengambil kekuatan nuklirnya.",
  },
  {
    name: "Animal Realm (獣の霊界)",
    description: "Dunia roh binatang dari Touhou 17. Dikuasai Yachie, Keiki, dan Saki.",
  },
  { name: "Rainbow Dragon Cave (虹龍洞)", description: "Gua naga pelangi yang menjadi latar Touhou 18." },
  {
    name: "Sunken Fossil World (沈んだ化石世界)",
    description: "Dunia bawah air dengan sumber energi misterius, setting Touhou 19.5.",
  },
  { name: "Hakurei Barrier (博麗大結界)", description: "Penghalang besar yang memisahkan Gensokyo dari dunia luar." },
  {
    name: "Outside World (外の世界)",
    description: "Dunia modern manusia di luar Gensokyo, tempat asal Sanae dan Moriya Gods.",
  },
  {
    name: "Makai (魔界)",
    description: "Dunia iblis, muncul dalam beberapa spin-off (terutama PC-98 dan Touhou 5/12.3).",
  },
  { name: "Heaven (天界 / Celestial Realm)", description: "Tempat para celestial seperti Tenshi Hinanawi tinggal." },
  { name: "Bhavaagra (天界の上層)", description: "Bagian atas surga tempat Tenshi turun dari sana (Touhou 10.5)." },
  { name: "Higan (彼岸)", description: "Tempat jiwa menunggu sebelum penilaian. Komachi bekerja di sini (Touhou 9)." },
  { name: "Shigan (此岸)", description: "Dunia manusia, kebalikan dari Higan." },
  { name: "Muenzuka (無縁塚)", description: "Bukit makam tanpa nama di perbatasan Gensokyo dan dunia luar." },
]

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 text-balance">Touhou Places</h1>
          <p className="text-xl text-gray-300 mb-6 text-pretty">Explore the mystical locations of Gensokyo</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/50"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card/50 backdrop-blur border-purple-500/30 p-4 h-full hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-purple-400 mb-1 text-base">{place.name}</h3>
                    <p className="text-gray-300 text-sm">{place.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No places found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
