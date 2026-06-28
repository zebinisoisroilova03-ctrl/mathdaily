import { useState } from 'react'

function Home({ lang, setLang, setStep }) {
  const [showTgWarning, setShowTgWarning] = useState(false)
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
      topicsList: [
        { name: 'Adding & Subtracting Integers', sub: '49 questions', badge: 'New', done: false },
        { name: 'Linear Equations', sub: 'Coming soon', badge: 'Soon', done: true },
      ],
    }
  }
  const text = t[lang] || t.uz

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
        <button onClick={() => setStep('exercise')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">✏️</span>
          <span className="text-xs">{text.nav.practice}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">📚</span>
          <span className="text-xs">{text.nav.topics}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👑</span>
          <span className="text-xs">{text.nav.plans}</span>
        </button>
        <button onClick={() => setStep('profile')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👤</span>
          <span className="text-xs">{text.nav.profile}</span>
        </button>
      </div>

      <div className="px-6 mt-5">

        {/* Streak karta */}
        <div className="bg-[#1a3a2a] rounded-2xl px-5 py-4 text-white flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">7 🔥</div>
            <div className="text-sm opacity-75">{text.streak}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">{text.todayProgress}</div>
            <div className="text-xl font-bold">3/5</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
          <div className="h-2 bg-[#1D9E75] rounded-full" style={{ width: '60%' }}></div>
        </div>

        {/* Statistika */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-[#1a3a2a]">142</div>
            <div className="text-xs text-gray-500">{text.exercisesDone}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-[#1a3a2a]">78%</div>
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
              onClick={() => !topic.done && setStep('exercise')}
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
