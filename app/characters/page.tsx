"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"
import { Search, ExternalLink } from "lucide-react"

// Touhou Characters Data
const touhouGames = [
  {
    id: 6,
    title: "Embodiment of Scarlet Devil (紅魔郷)",
    theme: "Scarlet Devil Mansion & Vampir",
    characters: [
      { name: "Reimu Hakurei", description: "Shrine Maiden of Paradise, protagonis utama." },
      { name: "Marisa Kirisame", description: "Penyihir manusia yang suka mencuri." },
      { name: "Rumia", description: "Youkai kegelapan (Stage 1 Boss)." },
      { name: "Cirno", description: "Peri es (Stage 2 Boss)." },
      { name: "Hong Meiling", description: "Penjaga gerbang Scarlet Devil Mansion (Stage 3)." },
      { name: "Patchouli Knowledge", description: "Penyihir buku, sahabat Remilia (Stage 4)." },
      { name: "Sakuya Izayoi", description: "Maid yang bisa menghentikan waktu (Stage 5)." },
      { name: "Remilia Scarlet", description: "Vampir bangsawan, pemilik mansion (Final Boss)." },
      { name: "Flandre Scarlet", description: "Adik Remilia yang tidak stabil (Extra Boss)." },
    ],
  },
  {
    id: 7,
    title: "Perfect Cherry Blossom (妖々夢)",
    theme: "Musim dingin abadi & dunia roh",
    characters: [
      { name: "Letty Whiterock", description: "Youkai musim dingin (Stage 1)." },
      { name: "Chen", description: "Kucing youkai, shikigami Ran (Stage 2)." },
      { name: "Alice Margatroid", description: "Penyihir boneka (Stage 3)." },
      { name: "Lily White", description: "Pembawa musim semi (midboss)." },
      { name: "Prismriver Sisters", description: "Trio musisi hantu (Stage 4)." },
      { name: "Youmu Konpaku", description: "Setengah manusia, setengah hantu (Stage 5)." },
      { name: "Yuyuko Saigyouji", description: "Putri hantu Hakugyokurou (Final Boss)." },
      { name: "Ran Yakumo", description: "Shikigami dari Yukari (Extra Boss)." },
      { name: "Yukari Yakumo", description: "Youkai gap, pengendali batas (Extra Stage)." },
    ],
  },
  {
    id: 8,
    title: "Imperishable Night (永夜抄)",
    theme: "Bulan palsu dan kelinci bulan",
    characters: [
      { name: "Wriggle Nightbug", description: "Youkai serangga (Stage 1)." },
      { name: "Mystia Lorelei", description: "Burung malam (Stage 2)." },
      { name: "Keine Kamishirasawa", description: "Guru yang bisa menyembunyikan sejarah (Stage 3)." },
      { name: "Tewi Inaba", description: "Kelinci pembawa keberuntungan (Stage 5)." },
      { name: "Reisen Udongein Inaba", description: "Kelinci dari bulan (Stage 5)." },
      { name: "Eirin Yagokoro", description: "Dokter bulan, pembuat elixir keabadian (Final Boss A)." },
      { name: "Kaguya Houraisan", description: "Putri abadi dari bulan (Final Boss B)." },
      { name: "Fujiwara no Mokou", description: "Manusia abadi, rival Kaguya (Extra Boss)." },
    ],
  },
  {
    id: 9,
    title: "Phantasmagoria of Flower View (花映塚)",
    theme: "Mekar bunga di dunia roh",
    characters: [
      { name: "Aya Shameimaru", description: "Reporter tengu cepat." },
      { name: "Medicine Melancholy", description: "Boneka beracun." },
      { name: "Komachi Onozuka", description: "Shinigami malas." },
      { name: "Eiki Shiki, Yamaxanadu", description: "Hakim dunia roh." },
    ],
  },
  {
    id: 10,
    title: "Mountain of Faith (風神録)",
    theme: "Dewa dan gunung suci",
    characters: [
      { name: "Aki Sisters", description: "Dewi musim gugur." },
      { name: "Hina Kagiyama", description: "Dewa kutukan." },
      { name: "Nitori Kawashiro", description: "Kappa ahli teknologi." },
      { name: "Sanae Kochiya", description: "Shrine maiden baru dari dunia luar." },
      { name: "Kanako Yasaka", description: "Dewa angin dan perang." },
      { name: "Suwako Moriya", description: "Dewa asli Moriya Shrine (Extra Boss)." },
    ],
  },
  {
    id: 11,
    title: "Subterranean Animism (地霊殿)",
    theme: "Dunia bawah tanah & kekuatan nuklir",
    characters: [
      { name: "Kisume", description: "Gadis ember." },
      { name: "Yamame Kurodani", description: "Jentik laba-laba tanah." },
      { name: "Parsee Mizuhashi", description: "Youkai iri hati." },
      { name: "Yuugi Hoshiguma", description: "Oni kuat." },
      { name: "Satori Komeiji", description: "Pembaca pikiran." },
      { name: "Rin Kaenbyou (Orin)", description: "Kucing neraka pengangkut mayat." },
      { name: "Utsuho Reiuji (Okuu)", description: "Burung neraka bertenaga nuklir." },
      { name: "Koishi Komeiji", description: "Adik Satori, menutup hatinya (Extra Boss)." },
    ],
  },
  {
    id: 12,
    title: "Undefined Fantastic Object (星蓮船)",
    theme: "Kapal terbang dan Buddhisme",
    characters: [
      { name: "Nazrin", description: "Tikus pencari harta." },
      { name: "Kogasa Tatara", description: "Payung karakasa." },
      { name: "Ichirin Kumoi & Unzan", description: "Biksu perempuan dan awan penjaga." },
      { name: "Minamitsu Murasa", description: "Hantu pelaut." },
      { name: "Shou Toramaru", description: "Harimau pengikut Bishamonten." },
      { name: "Byakuren Hijiri", description: "Biksu wanita yang diasingkan." },
      { name: "Nue Houjuu", description: "Youkai misteri (Extra Boss)." },
    ],
  },
  {
    id: 13,
    title: "Ten Desires (神霊廟)",
    theme: "Roh suci & kebangkitan Taoisme",
    characters: [
      { name: "Yoshika Miyako", description: "Jiangshi (mayat hidup)." },
      { name: "Seiga Kaku", description: "Taois jahat." },
      { name: "Soga no Tojiko", description: "Arwah bangsawan." },
      { name: "Mononobe no Futo", description: "Taois pelayan Miko." },
      { name: "Toyosatomimi no Miko", description: "Pangeran legendaris (Shotoku Taishi)." },
      { name: "Mamizou Futatsuiwa", description: "Tanuki penipu (Extra Boss)." },
    ],
  },
  {
    id: 14,
    title: "Double Dealing Character (輝針城)",
    theme: "Senjata hidup",
    characters: [
      { name: "Wakasagihime", description: "Putri duyung." },
      { name: "Sekibanki", description: "Rokurokubi (leher panjang)." },
      { name: "Kagerou Imaizumi", description: "Serigala werewolf." },
      { name: "Benben & Yatsuhashi Tsukumo", description: "Tsukumogami alat musik." },
      { name: "Seija Kijin", description: "Amanojaku pembalik dunia." },
      { name: "Shinmyoumaru Sukuna", description: "Kobito dengan palu ajaib." },
      { name: "Raiko Horikawa", description: "Tsukumogami drum (Extra Boss)." },
    ],
  },
  {
    id: 15,
    title: "Legacy of Lunatic Kingdom (紺珠伝)",
    theme: "Bulan dan proyek pelarian",
    characters: [
      { name: "Seiran & Ringo", description: "Kelinci bulan." },
      { name: "Doremy Sweet", description: "Penguasa mimpi." },
      { name: "Sagume Kishin", description: "Dewa bulan." },
      { name: "Clownpiece", description: "Peri dari neraka." },
      { name: "Junko", description: "Dewa dendam murni (Final Boss)." },
      { name: "Hecatia Lapislazuli", description: "Dewa dunia, bulan, dan neraka (Extra Boss)." },
    ],
  },
  {
    id: 16,
    title: "Hidden Star in Four Seasons (天空璋)",
    theme: "Musim kacau",
    characters: [
      { name: "Etarnity Larva", description: "Peri kupu-kupu." },
      { name: "Nemuno Sakata", description: "Youkai gunung penyendiri." },
      { name: "Aunn Komano", description: "Komainu penjaga kuil." },
      { name: "Narumi Yatadera", description: "Jizo hidup." },
      { name: "Mai Teireida & Satono Nishida", description: "Penari roh." },
      { name: "Okina Matara", description: "Dewa rahasia (Final Boss)." },
    ],
  },
  {
    id: 17,
    title: "Wily Beast and Weakest Creature (鬼形獣)",
    theme: "Insting binatang dan dunia neraka bawah tanah",
    characters: [
      { name: "Eika Ebisu", description: "Roh batu nisan." },
      { name: "Urumi Ushizaki", description: "Youkai lembu air." },
      { name: "Kutaka Niwatari", description: "Dewa ayam jago." },
      { name: "Yachie Kicchou", description: "Dewa kura-kura naga." },
      { name: "Mayumi Joutouguu", description: "Golem haniwa." },
      { name: "Keiki Haniyasushin", description: "Dewa pemahat (Final Boss)." },
      { name: "Saki Kurokoma", description: "Kuda iblis (Extra Boss)." },
    ],
  },
  {
    id: 19.5,
    title: "Sunken Fossil World (水没した沈む化石世界)",
    theme: "Air suci & dunia bawah tanah",
    characters: [
      { name: "Reimu Hakurei", description: "Protagonis utama." },
      { name: "Marisa Kirisame", description: "Penyihir manusia." },
      { name: "Kanako Yasaka", description: "Dewa angin." },
      { name: "Nitori Kawashiro", description: "Kappa ahli teknologi." },
      { name: "Suwako Moriya", description: "Dewa asli." },
      { name: "Utsuho Reiuji (Okuu)", description: "Burung neraka nuklir." },
      { name: "Sanae Kochiya", description: "Shrine maiden." },
      { name: "Yuugi Hoshiguma", description: "Oni kuat." },
      { name: "Hinoko", description: "Dewa air panas misterius (Boss baru)." },
    ],
  },
]

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [linksMap, setLinksMap] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/data/touhou-character-links.txt", { cache: "force-cache" })
        if (!res.ok) return
        const text = await res.text()
        const lines = text.split("\n")
        const map: Record<string, string> = {}
        for (const ln of lines) {
          // expect table rows like: | Touhou X | Character Name | https://... |
          if (ln.startsWith("|")) {
            const cols = ln.split("|").map((c) => c.trim())
            // columns: ["", "Touhou ...", "Char Name", "URL", ""]
            const name = cols[2]
            const url = cols[3]
            if (name && url && url.startsWith("http")) {
              map[name.toLowerCase()] = url
            }
          }
        }
        if (!cancelled) setLinksMap(map)
      } catch (e) {
        console.log("[v0] Failed to load character links:", e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredGames = useMemo(() => {
    return touhouGames
      .map((game) => ({
        ...game,
        characters: game.characters.filter(
          (char) =>
            char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            char.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((game) => game.characters.length > 0)
  }, [searchQuery])

  const getWikiUrl = (name: string) => {
    // If we have a curated link, prefer it
    const mapped = linksMap[name.toLowerCase()]
    if (mapped) return mapped

    // Fallback: create a direct page URL like https://touhou.fandom.com/wiki/Reimu_Hakurei
    // - remove anything in parentheses (aliases)
    // - replace "&" with "and"
    // - replace spaces with underscores
    const cleaned = name
      .replace(/\s*$$.*?$$\s*/g, "") // remove aliases in parentheses
      .replace(/\s*&\s*/g, " and ")
      .trim()
      .replace(/\s+/g, "_")

    return `https://touhou.fandom.com/wiki/${encodeURIComponent(cleaned)}`
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 text-balance">Touhou Characters</h1>
          <p className="text-xl text-gray-300 mb-6 text-pretty">Explore all characters from Touhou 6 to 19.5</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/50"
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur border-purple-500/30 p-4 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                <h2 className="text-xl font-bold text-purple-400 mb-2">
                  🏮 Touhou {game.id}: {game.title}
                </h2>
                <p className="text-gray-400 mb-3">Tema: {game.theme}</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {game.characters.map((character, charIndex) => (
                    <motion.div
                      key={charIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: charIndex * 0.05 }}
                      className="group relative bg-background/50 rounded-lg p-3 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all overflow-hidden"
                    >
                      <h3 className="font-bold text-white mb-1 text-sm">{character.name}</h3>
                      <p className="text-xs text-gray-400">{character.description}</p>

                      <div className="pointer-events-none absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={getWikiUrl(character.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Learn more about ${character.name}`}
                          className="pointer-events-auto inline-flex items-center gap-2 px-3 py-2 rounded-md bg-purple-600/80 hover:bg-purple-700 text-white text-sm font-medium border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                        >
                          Learn More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No characters found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
