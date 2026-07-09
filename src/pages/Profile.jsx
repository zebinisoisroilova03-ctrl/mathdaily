import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const FREE_LIMIT = 10
const TELEGRAM_BOT = 'mathdaily_reminder_bot'

function Profile({ lang, setLang }) {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [stats, setStats] = useState({ total_solved: 0, total_correct: 0, current_streak: 0 })
  const [loading, setLoading] = useState(true)

  // Telegram eslatma holati
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [togglingReminder, setTogglingReminder] = useState(false)

  // Ism tahrirlash holati
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [saving, setSaving] = useState(false)
  const pollIntervalRef = useRef(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        setUserId(user.id)
        setUserEmail(user.email)

        const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || ''
        setAvatarUrl(googleAvatar)

        const { data: profile } = await supabase
          .from('profiles')
          .select('total_solved, total_correct, current_streak, full_name, is_premium, today_date, last_active, reminder_enabled, telegram_chat_id')
          .eq('id', user.id)
          .single()

        if (profile) {
          const today = new Date().toISOString().split('T')[0]
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

          let streak = profile.current_streak || 0
          if (profile.last_active !== today && profile.last_active !== yesterday) {
            streak = 0
          }

          setStats({ ...profile, current_streak: streak })
          setIsPremium(!!profile.is_premium)
          setReminderEnabled(!!profile.reminder_enabled && !!profile.telegram_chat_id)
          const name = profile.full_name || user.user_metadata?.full_name || user.user_metadata?.name || ''
          setFullName(name)
          setNameInput(name)
        }
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  async function saveName() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: trimmed })
      .eq('id', user.id)

    setSaving(false)
    if (error) {
      console.error('name update error:', error)
      return
    }
    setFullName(trimmed)
    setEditingName(false)
  }

// Komponent yopilganda pollingni to'xtatamiz
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [])

  // Telegram botni ulash — maxsus havola bilan ochamiz
  function connectTelegram() {
    if (!userId) return
    window.open(`https://t.me/${TELEGRAM_BOT}?start=${userId}`, '_blank')
    startPollingForConnection()
  }

  // Ulanishni kutamiz: har 3 soniyada tekshiramiz (2 daqiqagacha)
  function startPollingForConnection() {
    // Avvalgi polling bo'lsa — to'xtatamiz
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)

    let attempts = 0
    const maxAttempts = 40 // 40 x 3s = 2 daqiqa

    pollIntervalRef.current = setInterval(async () => {
      attempts++

      const { data: profile } = await supabase
        .from('profiles')
        .select('telegram_chat_id, reminder_enabled')
        .eq('id', userId)
        .single()

      if (profile?.telegram_chat_id && profile?.reminder_enabled) {
        setReminderEnabled(true)
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
        return
      }

      if (attempts >= maxAttempts) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
    }, 3000)
  }

  // Eslatmani o'chirish
  async function disableReminder() {
    setTogglingReminder(true)
    const { error } = await supabase
      .from('profiles')
      .update({ reminder_enabled: false })
      .eq('id', userId)
    setTogglingReminder(false)
    if (error) {
      console.error('reminder disable error:', error)
      return
    }
    setReminderEnabled(false)
  }

  const accuracy = stats.total_solved > 0
    ? Math.round((stats.total_correct / stats.total_solved) * 100)
    : 0

  const t = {
    uz: {
      nav: { home: 'Bosh', practice: 'Mashq', topics: 'Mavzular', plans: 'Tariflar', profile: 'Profil' },
      premium: 'Premium faol',
      free: 'Bepul tarif',
      upgrade: 'Premium olish',
      stats: 'Statistika',
      streak: 'Ketma-ket kun',
      solved: 'Yechilgan',
      accuracy: 'Aniqlik',
      settings: 'Sozlamalar',
      language: 'Til',
      dailyGoal: 'Kunlik maqsad',
      goalValue: isPremium ? 'Cheksiz' : `${FREE_LIMIT} ta masala`,
      account: 'Hisob',
      logout: 'Chiqish',
      editName: 'Ismni tahrirlash',
      namePlaceholder: 'Ismingizni kiriting',
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      tgReminder: 'Telegram eslatma',
      tgReminderOff: 'Har kuni eslatib turamiz',
      tgReminderOn: 'Ulangan',
      tgConnect: 'Ulash',
      tgDisable: "O'chirish",
    },
    ru: {
      nav: { home: 'Главная', practice: 'Практика', topics: 'Темы', plans: 'Тарифы', profile: 'Профиль' },
      premium: 'Premium активен',
      free: 'Бесплатный тариф',
      upgrade: 'Оформить Premium',
      stats: 'Статистика',
      streak: 'Дней подряд',
      solved: 'Решено',
      accuracy: 'Точность',
      settings: 'Настройки',
      language: 'Язык',
      dailyGoal: 'Цель на день',
      goalValue: isPremium ? 'Безлимит' : `${FREE_LIMIT} задач`,
      account: 'Аккаунт',
      logout: 'Выйти',
      editName: 'Изменить имя',
      namePlaceholder: 'Введите имя',
      save: 'Сохранить',
      cancel: 'Отмена',
      tgReminder: 'Telegram напоминания',
      tgReminderOff: 'Будем напоминать каждый день',
      tgReminderOn: 'Подключено',
      tgConnect: 'Подключить',
      tgDisable: 'Отключить',
    },
    en: {
      nav: { home: 'Home', practice: 'Practice', topics: 'Topics', plans: 'Plans', profile: 'Profile' },
      premium: 'Premium active',
      free: 'Free plan',
      upgrade: 'Get Premium',
      stats: 'Statistics',
      streak: 'Day streak',
      solved: 'Solved',
      accuracy: 'Accuracy',
      settings: 'Settings',
      language: 'Language',
      dailyGoal: 'Daily goal',
      goalValue: isPremium ? 'Unlimited' : `${FREE_LIMIT} problems`,
      account: 'Account',
      logout: 'Log out',
      editName: 'Edit name',
      namePlaceholder: 'Enter your name',
      save: 'Save',
      cancel: 'Cancel',
      tgReminder: 'Telegram reminders',
      tgReminderOff: "We'll remind you every day",
      tgReminderOn: 'Connected',
      tgConnect: 'Connect',
      tgDisable: 'Disable',
    },
  }
  const text = t[lang] || t.uz

  const displayName = fullName || userEmail
  const initial = displayName ? displayName[0].toUpperCase() : '?'

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-10">

      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold">Math<span className="text-[#5DCAA5]">Daily</span></div>
      </div>

      {/* Navigatsiya */}
      <div className="flex border-b border-gray-100">
        <button onClick={() => navigate('/home')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">🏠</span>
          <span className="text-xs">{text.nav.home}</span>
        </button>
        <button onClick={() => navigate('/practice')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">✏️</span>
          <span className="text-xs">{text.nav.practice}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">📚</span>
          <span className="text-xs">{text.nav.topics}</span>
        </button>
        <button onClick={() => navigate('/plans')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👑</span>
          <span className="text-xs">{text.nav.plans}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-[#1a3a2a] border-b-2 border-[#1a3a2a] font-medium">
          <span className="text-lg">👤</span>
          <span className="text-xs">{text.nav.profile}</span>
        </button>
      </div>

      <div className="px-6 mt-5">

        {/* Foydalanuvchi kartasi */}
        <div className="flex items-center gap-4 mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
              onError={() => setAvatarUrl('')}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#E1F5EE] flex items-center justify-center text-2xl font-bold text-[#0F6E56]">
              {loading ? '' : initial}
            </div>
          )}
          <div className="min-w-0 flex-1">
            {editingName ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={text.namePlaceholder}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a2a]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveName}
                    disabled={saving || !nameInput.trim()}
                    className="flex-1 py-2 rounded-xl bg-[#1a3a2a] text-white text-sm font-medium disabled:opacity-50"
                  >
                    {text.save}
                  </button>
                  <button
                    onClick={() => { setEditingName(false); setNameInput(fullName) }}
                    className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium"
                  >
                    {text.cancel}
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-[#1a3a2a] truncate">{fullName || userEmail}</div>
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-gray-400 hover:text-[#1a3a2a] text-sm"
                    title={text.editName}
                  >
                    ✏️
                  </button>
                </div>
                {fullName && <div className="text-xs text-gray-400 truncate">{userEmail}</div>}
                {isPremium ? (
                  <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] mt-1">
                    👑 {text.premium}
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 mt-1">
                    {text.free}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Premium bo'lmasa — upgrade tugmasi */}
        {!loading && !isPremium && !editingName && (
          <button
            onClick={() => navigate('/plans')}
            className="w-full bg-[#1a3a2a] text-white py-3 rounded-2xl font-medium mb-6 hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            👑 {text.upgrade}
          </button>
        )}

        {/* Statistika */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.stats.toUpperCase()}</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{stats.current_streak}</div>
            <div className="text-xs text-gray-500 mt-1">{text.streak}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{stats.total_solved}</div>
            <div className="text-xs text-gray-500 mt-1">{text.solved}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{accuracy}%</div>
            <div className="text-xs text-gray-500 mt-1">{text.accuracy}</div>
          </div>
        </div>

        {/* Sozlamalar */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.settings.toUpperCase()}</div>

        {/* Til tanlash */}
        <div className="bg-gray-50 rounded-2xl px-4 py-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🌐</span>
            <span className="font-medium text-gray-800">{text.language}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLang('uz')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${lang === 'uz' ? 'bg-[#1a3a2a] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >O'zbek</button>
            <button
              onClick={() => setLang('ru')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${lang === 'ru' ? 'bg-[#1a3a2a] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >Русский</button>
            <button
              onClick={() => setLang('en')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${lang === 'en' ? 'bg-[#1a3a2a] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >English</button>
          </div>
        </div>

        {/* Kunlik maqsad */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="font-medium text-gray-800">{text.dailyGoal}</span>
          </div>
          <span className="text-sm text-[#0F6E56] font-medium">{text.goalValue}</span>
        </div>

        {/* Telegram eslatma */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">🔔</span>
            <div className="min-w-0">
              <div className="font-medium text-gray-800">{text.tgReminder}</div>
              <div className="text-xs text-gray-500 truncate">
                {reminderEnabled ? `✓ ${text.tgReminderOn}` : text.tgReminderOff}
              </div>
            </div>
          </div>
          {reminderEnabled ? (
            <button
              onClick={disableReminder}
              disabled={togglingReminder}
              className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-xl hover:bg-white transition disabled:opacity-50 whitespace-nowrap"
            >
              {text.tgDisable}
            </button>
          ) : (
            <button
              onClick={connectTelegram}
              disabled={loading || !userId}
              className="text-sm bg-[#1a3a2a] text-white px-4 py-1.5 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 whitespace-nowrap"
            >
              {text.tgConnect}
            </button>
          )}
        </div>

        {/* Hisob */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.account.toUpperCase()}</div>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
          }}
          className="w-full bg-red-50 text-red-600 py-3 rounded-2xl font-medium hover:bg-red-100 transition"
        >
          {text.logout}
        </button>

      </div>
    </div>
  )
}

export default Profile