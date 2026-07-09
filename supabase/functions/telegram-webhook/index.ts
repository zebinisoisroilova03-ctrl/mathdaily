import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const MESSAGES = {
  uz: {
    connected: "✅ Ulandi! Endi har kuni eslatib turamiz.\n\nO'chirish uchun ilovadagi Profil sahifasiga kiring.",
    error: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    other: "MathDaily eslatma boti. Ilovaga kiring: https://mathdaily-gamma.vercel.app",
  },
  ru: {
    connected: "✅ Подключено! Теперь мы будем напоминать вам каждый день.\n\nЧтобы отключить, зайдите в раздел Профиль в приложении.",
    error: "Произошла ошибка. Пожалуйста, попробуйте ещё раз.",
    other: "Бот напоминаний MathDaily. Откройте приложение: https://mathdaily-gamma.vercel.app",
  },
  en: {
    connected: "✅ Connected! We'll remind you every day.\n\nTo disable, go to the Profile page in the app.",
    error: "Something went wrong. Please try again.",
    other: "MathDaily reminder bot. Open the app: https://mathdaily-gamma.vercel.app",
  },
}

// Ilova orqali kelmagan foydalanuvchiga — uch tilda
const NO_PARAM_MESSAGE =
  "Salom! Eslatmalarni yoqish uchun MathDaily ilovasidagi Profil sahifasidan 'Ulash' tugmasini bosing.\n\n" +
  "Привет! Чтобы включить напоминания, нажмите «Подключить» в разделе Профиль в приложении MathDaily.\n\n" +
  "Hi! To enable reminders, tap 'Connect' on the Profile page in the MathDaily app.\n\n" +
  "https://mathdaily-gamma.vercel.app"

async function sendMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

Deno.serve(async (req) => {
  try {
    const update = await req.json()
    const message = update.message
    if (!message || !message.text) {
      return new Response("ok", { status: 200 })
    }

    const chatId = message.chat.id
    const text = message.text.trim()

    if (text.startsWith("/start")) {
      const parts = text.split(" ")
      const userId = parts[1]

      // Parametrsiz /start — kimligini bilmaymiz, uch tilda javob
      if (!userId) {
        await sendMessage(chatId, NO_PARAM_MESSAGE)
        return new Response("ok", { status: 200 })
      }

      // Foydalanuvchi tilini o'qiymiz
      const { data: profile } = await supabase
        .from("profiles")
        .select("lang")
        .eq("id", userId)
        .single()

      const lang = (profile?.lang as keyof typeof MESSAGES) || "uz"
      const m = MESSAGES[lang] || MESSAGES.uz

      const { error } = await supabase
        .from("profiles")
        .update({ telegram_chat_id: chatId, reminder_enabled: true })
        .eq("id", userId)

      if (error) {
        console.error("update error:", error)
        await sendMessage(chatId, m.error)
        return new Response("ok", { status: 200 })
      }

      await sendMessage(chatId, m.connected)
      return new Response("ok", { status: 200 })
    }

    // Boshqa xabarlar — uch tilda
    await sendMessage(chatId, NO_PARAM_MESSAGE)
    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("webhook error:", err)
    return new Response("ok", { status: 200 })
  }
})