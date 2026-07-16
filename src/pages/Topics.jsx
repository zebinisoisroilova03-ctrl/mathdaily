import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Topics({ lang }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const t = {
    uz: {
      nav: { home: 'Bosh', practice: 'Mashq', topics: 'Mavzular', plans: 'Tariflar', profile: 'Profil' },
      title: 'Algebra mavzulari',
      filters: { all: 'Barchasi', beginner: 'Boshlang\'ich', intermediate: "O'rta", advanced: 'Yuqori' },
      soon: 'Tez orada',
      newBadge: 'Yangi',
      levels: { beginner: "Boshlang'ich", intermediate: "O'rta", advanced: 'Yuqori' },
    },
    ru: {
      nav: { home: 'Главная', practice: 'Практика', topics: 'Темы', plans: 'Тарифы', profile: 'Профиль' },
      title: 'Темы по алгебре',
      filters: { all: 'Все', beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' },
      soon: 'Скоро',
      newBadge: 'Новое',
      levels: { beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' },
    },
    en: {
      nav: { home: 'Home', practice: 'Practice', topics: 'Topics', plans: 'Plans', profile: 'Profile' },
      title: 'Algebra Topics',
      filters: { all: 'All', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
      soon: 'Soon',
      newBadge: 'New',
      levels: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    },
  }
  const text = t[lang] || t.uz

  // Mavzular ro'yxati
  const topics = [
    {
      id: 'integers',
      icon: '➕',
      level: 'beginner',
      available: true,
      name: { uz: "Butun sonlarni qo'shish va ayirish", ru: 'Сложение и вычитание целых чисел', en: 'Adding & Subtracting Integers' },
    },
    {
      id: 'linear',
      icon: '📐',
      level: 'beginner',
      available: false,
      name: { uz: 'Chiziqli tenglamalar', ru: 'Линейные уравнения', en: 'Linear Equations' },
    },
    {
      id: 'inequalities',
      icon: '⚖️',
      level: 'intermediate',
      available: false,
      name: { uz: 'Tengsizliklar', ru: 'Неравенства', en: 'Inequalities' },
    },
    {
      id: 'quadratic',
      icon: '📊',
      level: 'advanced',
      available: false,
      name: { uz: 'Kvadrat tenglamalar', ru: 'Квадратные уравнения', en: 'Quadratic Equations' },
    },
  ]

  const filtered = filter === 'all' ? topics : topics.filter((tp) => tp.level === filter)

  const filterKeys = ['all', 'beginner', 'intermediate', 'advanced']

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-10">

      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold">Math<span className="text-[#5DCAA5]">Daily</span></div>
      </div>

      {/* Navigatsiya */}
      <div className="flex border-b border-gray-100">
        <button onClick={() => navigate('/home')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">🏠</span><span className="text-xs">{text.nav.home}</span>
        </button>
        <button onClick={() => navigate('/practice')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">✏️</span><span className="text-xs">{text.nav.practice}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-[#1a3a2a] border-b-2 border-[#1a3a2a] font-medium">
          <span className="text-lg">📚</span><span className="text-xs">{text.nav.topics}</span>
        </button>
        <button onClick={() => navigate('/plans')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👑</span><span className="text-xs">{text.nav.plans}</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👤</span><span className="text-xs">{text.nav.profile}</span>
        </button>
      </div>

      <div className="px-6 mt-5">
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.title.toUpperCase()}</div>

        {/* Filter chiplari */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === key
                  ? 'bg-[#E1F5EE] text-[#0F6E56] border border-[#1D9E75]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {text.filters[key]}
            </button>
          ))}
        </div>

        {/* Mavzular — bo'lim o'rganish (topic rejimi) */}
        <div className="flex flex-col gap-3">
          {filtered.map((tp) => (
            <button
              key={tp.id}
              onClick={() => tp.available && navigate('/topic')}
              disabled={!tp.available}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-4 border text-left transition ${
                tp.available
                  ? 'bg-white border-gray-200 hover:border-[#1a3a2a] hover:bg-gray-50'
                  : 'bg-gray-50 border-gray-100 cursor-default'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                tp.available ? 'bg-[#E1F5EE]' : 'bg-gray-100'
              }`}>
                {tp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${tp.available ? 'text-gray-800' : 'text-gray-400'}`}>
                  {tp.name[lang] || tp.name.uz}
                </div>
                <div className="text-xs text-gray-500">{text.levels[tp.level]}</div>
              </div>
              {tp.available ? (
                <span className="text-xs px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] whitespace-nowrap">
                  {text.newBadge}
                </span>
              ) : (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-400 whitespace-nowrap">
                  {text.soon}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Topics