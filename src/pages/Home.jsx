import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

// Bepul tarif kunlik limiti — server (record_answer) bilan bir xil bo'lishi shart
const FREE_LIMIT = 10

function Home({ lang }) {
  const navigate = useNavigate()
  const [showTgWarning, setShowTgWarning] = useState(false)
  const [stats, setStats] = useState({
    total_solved: 0,
    total_correct: 0,
    current_streak: 0,
    today_solved: 0,
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadStats() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoaded(true); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('total_solved, total_correct, current_streak, today_solved, today_date, last_active')
        .eq('id', user.id)
        .single()

      if (!profile) { setLoaded(true); return }

      // Server UTC ishlatadi — Home ham UTC bilan solishtiradi (mos bo'lishi uchun)
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

      let todaySolved = profile.today_solved || 0
      let streak = profile.current_streak || 0

      // Bugun hali mashq qilinmagan bo'lsa — bugungi progress 0 ko'rinadi
      if (profile.today_date !== today) {
        todaySolved = 0
      }

      // Oxirgi faollik na bugun, na kecha bo'lsa — ketma-ketlik uzilgan
      if (profile.last_active !== today && profile.last_active !== yesterday) {
        streak = 0
      }

      // Streak xavf ostidami: kecha faol bo'lgan, bugun hali mashq qilmagan
      const streakAtRisk = profile.last_active === yesterday && todaySolved === 0

      setStats({
        ...profile,
        today_solved: todaySolved,
        current_streak: streak,
        streakAtRisk,
      })
      setLoaded(true)
    }
    loadStats()
  }, [])

  const accuracy = stats.total_solved > 0
    ? Math.round((stats.total_correct / stats.total_solved) * 100)
    : 0

  const t = {
    uz: {
      greeting: 'Xush kelibsiz!',
      nav: { home: 'Bosh', practice: 'Mashq', topics: 'Mavzular', plans: 'Tariflar', profile: 'Profil' },
      streak: 'Ketma-ket kun',
      todayProgress: 'Bugungi natija',
      exercisesDone: 'Bajarilgan mashqlar',
      accuracy: "To'g'rilik darajasi",
      tgChannel: 'Bizning Telegram kanalimiz',
      continueLearning: 'DAVOM ETING',
      // Eslatma bannerlari
      reminderRiskTitle: 'Ketma-ketligingiz xavf ostida!',
      reminderRiskText: (n) => `Bugun mashq qilib, ${n} kunlik seriyangizni saqlang 🔥`,
      reminderStartTitle: 'Bugungi mashqni boshlang!',
      reminderStartText: `Kuniga ${FREE_LIMIT} ta masala — bugun 0 tadan boshladingiz`,
      reminderGoTitle: 'Zo\'r ketyapsiz!',
      reminderGoText: (x) => `Bugun ${x}/${FREE_LIMIT} — davom eting!`,
      reminderCta: 'Boshlash →',
      topicsList: [
        { name: "Butun sonlarni qo'shish va ayirish", sub: '49 ta savol', badge: 'Yangi', done: false },
        { name: 'Chiziqli tenglamalar', sub: 'Tez orada', badge: 'Tez orada', done: true },
      ],
    },
    ru: {
      greeting: 'Добро пожаловать!',
      nav: { home: 'Главная', practice: 'Практика', topics: 'Темы', plans: 'Тарифы', profile: 'Профиль' },
      streak: 'Дней подряд',
      todayProgress: 'Прогресс',
      exercisesDone: 'Решено задач',
      accuracy: 'Точность',
      tgChannel: 'Наш Telegram канал',
      continueLearning: 'ПРОДОЛЖИТЬ',
      tgWarningTitle: 'Внимание!',
      tgWarningText: 'Эта платформа создана для Узбекистана. Все видеоуроки в нашем Telegram канале только на узбекском языке. Продолжить?',
      tgCancel: 'Отмена',
      tgContinue: 'Продолжить',
      reminderRiskTitle: 'Ваша серия под угрозой!',
      reminderRiskText: (n) => `Позанимайтесь сегодня и сохраните серию из ${n} дней 🔥`,
      reminderStartTitle: 'Начните сегодняшнюю тренировку!',
      reminderStartText: `${FREE_LIMIT} задач в день — вы ещё не начинали`,
      reminderGoTitle: 'Отличный темп!',
      reminderGoText: (x) => `Сегодня ${x}/${FREE_LIMIT} — продолжайте!`,
      reminderCta: 'Начать →',
      topicsList: [
        { name: 'Сложение и вычитание целых чисел', sub: '49 вопросов', badge: 'Новое', done: false },
        { name: 'Линейные уравнения', sub: 'Скоро', badge: 'Скоро', done: true },
      ],
    },
    en: {
      greeting: 'Welcome!',
      nav: { home: 'Home', practice: 'Practice', topics: 'Topics', plans: 'Plans', profile: 'Profile' },
      streak: 'Day streak',
      todayProgress: "Today's progress",
      exercisesDone: 'Exercises done',
      accuracy: 'Accuracy rate',
      tgChannel: 'Our Telegram channel',
      continueLearning: 'CONTINUE LEARNING',
      tgWarningTitle: 'Notice!',
      tgWarningText: 'This platform is made for Uzbekistan. All video lessons in our Telegram channel are only in Uzbek. Continue?',
      tgCancel: 'Cancel',
      tgContinue: 'Continue',
      reminderRiskTitle: 'Your streak is at risk!',
      reminderRiskText: (n) => `Practice today to keep your ${n}-day streak 🔥`,
      reminderStartTitle: "Start today's practice!",
      reminderStartText: `${FREE_LIMIT} problems a day — you haven't started yet`,
      reminderGoTitle: 'Great pace!',
      reminderGoText: (x) => `Today ${x}/${FREE_LIMIT} — keep going!`,
      reminderCta: 'Start →',
      topicsList: [
        { name: 'Adding & Subtracting Integers', sub: '49 questions', badge: 'New', done: false },
        { name: 'Linear Equations', sub: 'Coming soon', badge: 'Soon', done: true },
      ],
    },
  }
  const text = t[lang] || t.uz

  const todaySolved = Math.min(stats.today_solved || 0, FREE_LIMIT)

  // Qaysi banner ko'rsatilsin: 'risk' | 'start' | 'go' | null
  let reminderType = null
  if (loaded) {
    if (todaySolved >= FREE_LIMIT) {
      reminderType = null // limit to'ldi — bezovta qilmaymiz
    } else if (stats.streakAtRisk) {
      reminderType = 'risk'
    } else if (todaySolved === 0) {
      reminderType = 'start'
    } else {
      reminderType = 'go'
    }
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-10">

      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold">Math<span className="text-[#5DCAA5]">Daily</span></div>
      </div>

      {/* Navigatsiya */}
      <div className="flex border-b border-gray-100">
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-[#1a3a2a] border-b-2 border-[#1a3a2a] font-medium">
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
        <button onClick={() => navigate('/profile')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👤</span>
          <span className="text-xs">{text.nav.profile}</span>
        </button>
      </div>

      <div className="px-6 mt-5">

        {/* Eslatma banneri */}
        {reminderType === 'risk' && (
          <button
            onClick={() => navigate('/practice')}
            className="w-full flex items-center gap-3 bg-amber-50 border border-amber-300 rounded-2xl px-4 py-3 mb-4 hover:bg-amber-100 transition text-left"
          >
            <span className="text-2xl">🔥</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-amber-800">{text.reminderRiskTitle}</div>
              <div className="text-xs text-amber-700">{text.reminderRiskText(stats.current_streak)}</div>
            </div>
            <span className="text-amber-700 text-sm font-medium whitespace-nowrap">{text.reminderCta}</span>
          </button>
        )}

        {reminderType === 'start' && (
          <button
            onClick={() => navigate('/practice')}
            className="w-full flex items-center gap-3 bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-4 hover:bg-[#9FE1CB] transition text-left"
          >
            <span className="text-2xl">✏️</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-[#0F6E56]">{text.reminderStartTitle}</div>
              <div className="text-xs text-[#0F6E56] opacity-80">{text.reminderStartText}</div>
            </div>
            <span className="text-[#0F6E56] text-sm font-medium whitespace-nowrap">{text.reminderCta}</span>
          </button>
        )}

        {reminderType === 'go' && (
          <button
            onClick={() => navigate('/practice')}
            className="w-full flex items-center gap-3 bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-4 hover:bg-[#9FE1CB] transition text-left"
          >
            <span className="text-2xl">💪</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-[#0F6E56]">{text.reminderGoTitle}</div>
              <div className="text-xs text-[#0F6E56] opacity-80">{text.reminderGoText(todaySolved)}</div>
            </div>
            <span className="text-[#0F6E56] text-sm font-medium whitespace-nowrap">{text.reminderCta}</span>
          </button>
        )}

        {/* Streak karta */}
        <div className="bg-[#1a3a2a] rounded-2xl px-5 py-4 text-white flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{stats.current_streak} 🔥</div>
            <div className="text-sm opacity-75">{text.streak}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">{text.todayProgress}</div>
            <div className="text-xl font-bold">{todaySolved}/{FREE_LIMIT}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
          <div
            className="h-2 bg-[#1D9E75] rounded-full transition-all"
            style={{ width: `${Math.min((todaySolved / FREE_LIMIT) * 100, 100)}%` }}
          ></div>
        </div>

        {/* Statistika */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-[#1a3a2a]">{stats.total_solved}</div>
            <div className="text-xs text-gray-500">{text.exercisesDone}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-[#1a3a2a]">{accuracy}%</div>
            <div className="text-xs text-gray-500">{text.accuracy}</div>
          </div>
        </div>

        {/* Telegram banner */}
        <button
          onClick={() => {
            if (lang === 'uz') {
              window.open('https://t.me/videodarslarmatematika', '_blank')
            } else {
              setShowTgWarning(true)
            }
          }}
          className="w-full flex items-center gap-3 bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-6 hover:bg-[#9FE1CB] transition text-left"
        >
          <div className="w-10 h-10 bg-[#1a3a2a] rounded-xl flex items-center justify-center text-white font-bold">TG</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#0F6E56]">{text.tgChannel}</div>
            <div className="text-xs text-[#0F6E56] opacity-75">@videodarslarmatematika</div>
          </div>
          <span className="text-[#0F6E56]">→</span>
        </button>

        {/* Continue learning */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.continueLearning}</div>
        <div className="flex flex-col gap-3">
          {text.topicsList.map((topic, i) => (
            <button
              key={i}
              onClick={() => !topic.done && navigate('/practice')}
              className="bg-white border border-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${topic.done ? 'bg-gray-100' : 'bg-[#E1F5EE]'}`}>
                  <span className="text-lg">{topic.done ? '✅' : '➕'}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{topic.name}</div>
                  <div className="text-xs text-gray-500">{topic.sub}</div>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${topic.done ? 'bg-gray-100 text-gray-500' : 'bg-[#E1F5EE] text-[#0F6E56]'}`}>
                {topic.badge}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Telegram ogohlantirish oynasi */}
      {showTgWarning && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-3xl px-6 py-6 max-w-sm w-full">
            <div className="text-center mb-2">
              <div className="w-12 h-12 bg-[#E1F5EE] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📢</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a3a2a] mb-2">{text.tgWarningTitle}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{text.tgWarningText}</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowTgWarning(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
              >
                {text.tgCancel}
              </button>
              <button
                onClick={() => {
                  window.open('https://t.me/videodarslarmatematika', '_blank')
                  setShowTgWarning(false)
                }}
                className="flex-1 py-3 rounded-2xl bg-[#1a3a2a] text-white font-medium hover:opacity-90 transition"
              >
                {text.tgContinue}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home