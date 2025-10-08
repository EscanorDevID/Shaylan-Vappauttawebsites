import { generateText } from "ai"

function offlineAnswer(input: string) {
  const q = (input || "").toLowerCase()

  // Simple heuristics to keep things helpful while offline
  if (q.includes("reimu")) {
    return "Aku Reimu Hakurei. Saat ini AI online-ku lagi off, tapi aku tetap bisa bantu. Reimu itu shrine maiden dari Hakurei Shrine, sering menyelesaikan incident di Gensokyo. Gaya hidup santai, suka teh, dan kadang sebel kalau youkai bikin ribut. Mau tanya tentang karakter lain, tempat di Gensokyo, atau ras di Touhou?"
  }
  if (q.includes("marisa")) {
    return "Marisa Kirisame itu penyihir manusia yang hobi ngumpulin 'barang pinjaman'. Gaya santai, suka melakukan hal-hal dengan cara frontal. Spesialis sihir bintang dan master spark. Ada yang mau kamu cari tentang Marisa?"
  }
  if (q.includes("tempat") || q.includes("place") || q.includes("lokasi") || q.includes("gensokyo")) {
    return "Gensokyo punya banyak lokasi unik seperti Hakurei Shrine, Human Village, Youkai Mountain, dan Scarlet Devil Mansion. Kamu mau info ringkas tentang salah satunya?"
  }
  if (q.includes("ras") || q.includes("race") || q.includes("youkai") || q.includes("manusia") || q.includes("dewa")) {
    return "Di Touhou ada manusia, youkai (banyak sub-jenis seperti vampire, tengu, kappa), dewa, roh, lunarian, celestial, dan lain-lain. Mau bahas kategori tertentu?"
  }

  return "AI online lagi off karena pembatasan server, tapi aku tetap bisa bantu jelasin hal-hal dasar tentang karakter, tempat, dan ras di Touhou. Tanyain aja spesifik yang kamu butuhin, ya!"
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const lastMessage = messages[messages.length - 1]

    if (!lastMessage?.content || typeof lastMessage.content !== "string") {
      return Response.json({ message: "Masukin pertanyaan ya, biar aku bisa jawab." }, { status: 400 })
    }

    // Optional kill-switch to force offline mode
    if (process.env.AI_DISABLED === "1") {
      const text = offlineAnswer(lastMessage.content)
      return Response.json({ message: text })
    }

    try {
      const { text } = await generateText({
        // Using a small default model; if Gateway is enabled this will work.
        // If the Gateway blocks (403), we fall back below.
        model: "google/gemini-2.5-flash",
        system: `Kamu adalah Reimu Hakurei, shrine maiden dari Hakurei Shrine di Gensokyo (Touhou Project).
Kepribadian: sedikit tsundere tapi baik hati, santai, kadang malas, tidak suka ribet, suka minum teh, kadang kesal dengan youkai.
Bahasa: Indonesia casual, gunakan kata seperti "sih", "kok", "deh", "aku".`,
        prompt: lastMessage.content,
        maxTokens: 500,
      })

      return Response.json({ message: text })
    } catch (err: any) {
      // Handle AI Gateway errors gracefully
      const msg = String(err?.message || err)
      const isBillingIssue =
        msg.includes("customer_verification_required") ||
        msg.includes("403") ||
        msg.toLowerCase().includes("ai gateway")

      const hint = isBillingIssue
        ? "Konfigurasi AI belum aktif. Tambahkan kartu di Vercel AI Gateway atau gunakan penyedia yang tersedia."
        : "Terjadi masalah saat memproses permintaan."

      console.error("[v0] generateText error:", msg)
      return Response.json({ message: `Maaf, aku belum bisa jawab sekarang. ${hint}` }, { status: 502 })
    }
  } catch (error) {
    console.error("[v0] Error in chat API (outer):", error)
    return Response.json({ message: "Maaf, ada masalah teknis. Coba lagi ya!" }, { status: 500 })
  }
}
