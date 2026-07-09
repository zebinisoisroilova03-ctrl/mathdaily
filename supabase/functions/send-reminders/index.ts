import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const MORNING_HOUR = 11
const EVENING_HOUR = 19

const MESSAGES = {
  uz: {
    morning:
      "☀️ Xayrli tong!\n\nBugungi mashqni boshlang — kuniga bir necha masala katta natija beradi.\n\nhttps://mathdaily-gamma.vercel.app",
    morningStreak: (n: number) =>
      `☀️ Xayrli tong!\n\n${n} kunlik seriyangiz davom etyapti — bugun ham davom eting!\n\nhttps://mathdaily-gamma.vercel.app`,
    eveningStreak: (n: number) =>
      `🔥 Ketma-ketligingiz xavf ostida!\n\nBugun mashq qilib, ${n} kunlik seriyangizni saqlang.\n\nhttps://mathdaily-gamma.vercel.app`,
    evening:
      "✏️ Kun tugayapti!\n\nBugungi mashqni hali bajarmadingiz. Bir necha daqiqa yetarli.\n\nhttps://mathdaily-gamma.vercel.app",
  },
  ru: {
    morning:
      "☀️ Доброе утро!\n\nНачните сегодняшнюю тренировку — несколько задач в день дают большой результат.\n\nhttps://mathdaily-gamma.vercel.app",
    morningStreak: (n: number) =>
      `☀️ Доброе утро!\n\nВаша серия из ${n} дней продолжается — не останавливайтесь!\n\nhttps://mathdaily-gamma.vercel.app`,
    eveningStreak: (n: number) =>
      `🔥 Ваша серия под угрозой!\n\nПозанимайтесь сегодня и сохраните серию из ${n} дней.\n\nhttps://mathdaily-gamma.vercel.app`,
    evening:
      "✏️ День подходит к концу!\n\nВы ещё не занимались сегодня. Хватит нескольких минут.\n\nhttps://mathdaily-gamma.vercel.app",
  },
  en: {
    morning:
      "☀️ Good morning!\n\nStart today's practice — a few problems a day go a long way.\n\nhttps://mathdaily-gamma.vercel.app",
    morningStreak: (n: number) =>
      `☀️ Good morning!\n\nYour ${n}-day streak is alive — keep it going today!\n\nhttps://mathdaily-gamma.vercel.app`,
    eveningStreak: (n: number) =>
      `🔥 Your streak is at risk!\n\nPractice today to keep your ${n}-day streak.\n\nhttps://mathdaily-gamma.vercel.app`,
    evening:
      "✏️ The day is ending!\n\nYou haven't practiced today. A few minutes is enough.\n\nhttps://mathdaily-gamma.vercel.app",
  },
}

async function sendMessage(chatId: number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
  return res.ok
}

// Berilgan timezone'da hozirgi soat va sanani aniqlaymiz
function localHourAndDate(timezone: string): { hour: number; date: string } | null {
  try {
    const now = new Date()
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    })
    const parts = fmt.formatToParts(now)
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
    const hour = parseInt(get("hour"), 10)
    const date = `${get("year")}-${get("month")}-${get("day")}`
    if (isNaN(hour)) return null
    return { hour, date }
  } catch {
    return null
  }
}

Deno.serve(async () => {
  try {
    // Eslatma yoqilgan va Telegram ulangan foydalanuvchilar
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, telegram_chat_id, timezone, lang, current_streak, today_solved, today_date, last_active, last_reminder_slot")
      .eq("reminder_enabled", true)
      .not("telegram_chat_id", "is", null)

    if (error) {
      console.error("select error:", error)
      return new Response("error", { status: 500 })
    }

    let sent = 0

    for (const p of profiles ?? []) {
      const tz = p.timezone || "UTC"
      const local = localHourAndDate(tz)
      if (!local) continue

      // Qaysi vaqt oynasi? (ertalab / kechqurun)
      let slot: "morning" | "evening" | null = null
      if (local.hour === MORNING_HOUR) slot = "morning"
      else if (local.hour === EVENING_HOUR) slot = "evening"
      if (!slot) continue

      // Bu slot bugun allaqachon yuborilganmi?
      const slotKey = `${local.date}-${slot}`
      if (p.last_reminder_slot === slotKey) continue

      // Bugun mashq qilganmi? (server UTC bilan yozadi)
      const utcToday = new Date().toISOString().split("T")[0]
      const solvedToday = p.today_date === utcToday && (p.today_solved ?? 0) > 0
      if (solvedToday) continue

      const lang = (p.lang as keyof typeof MESSAGES) || "uz"
      const m = MESSAGES[lang] || MESSAGES.uz

      const utcYesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
      const hasStreak = p.last_active === utcYesterday && (p.current_streak ?? 0) > 0

      let text: string
      if (slot === "morning") {
        text = hasStreak ? m.morningStreak(p.current_streak ?? 0) : m.morning
      } else {
        text = hasStreak ? m.eveningStreak(p.current_streak ?? 0) : m.evening
      }

      const ok = await sendMessage(p.telegram_chat_id as number, text)

      if (ok) {
        await supabase
          .from("profiles")
          .update({ last_reminder_slot: slotKey })
          .eq("id", p.id)
        sent++
      }
    }

    return new Response(JSON.stringify({ sent }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("reminder error:", err)
    return new Response("error", { status: 500 })
  }
})