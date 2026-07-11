import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Plans({ lang }) {
  const navigate = useNavigate()

 // Foydalanuvchi joylashuvini IP orqali aniqlash
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // Avval xotiradan tekshiramiz — oldin aniqlanganmi?
    const savedCountry = localStorage.getItem('country')
    if (savedCountry) {
      setCountry(savedCountry)
      return
    }
    // Birinchi marta — IP orqali aniqlaymiz va saqlaymiz
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        setCountry(data.country_code)
        localStorage.setItem('country', data.country_code)
      })
      .catch(() => setCountry('US'))
  }, [])

  // Faqat O'zbekiston uchun so'm, qolgan dunyo uchun $1
  const premiumPrice = country === null ? '...' : (country === 'UZ' ? "10 000 so'm" : '$1')

  const t = {
    uz: {
      nav: { home: 'Bosh', practice: 'Mashq', topics: 'Mavzular', plans: 'Tariflar', profile: 'Profil' },
      title: 'Tarifni tanlang',
      subtitle: "Bilimingizni yuqori darajaga ko'taring",
      free: 'Bepul',
      freePrice: '0',
      perMonth: '/oy',
      premium: 'Premium',
      currentPlan: 'Joriy tarif',
      choosePlan: 'Tanlash',
      freeFeatures: [
        'Kuniga 5 ta mashq',
        'Gamifikatsiya (streak, medallar)',
        'Video darslar',
        'Ota-ona paneli',
      ],
      premiumFeatures: [
        'Kuniga 50 ta mashq',
        'Barcha mavzular ochiq',
        'Reklamasiz',
        'Ustuvor qo\'llab-quvvatlash',
        'Barcha bepul imkoniyatlar',
      ],
      popular: 'Ommabop',
    },
    ru: {
      nav: { home: 'Главная', practice: 'Практика', topics: 'Темы', plans: 'Тарифы', profile: 'Профиль' },
      title: 'Выберите тариф',
      subtitle: 'Поднимите знания на новый уровень',
      free: 'Бесплатно',
      freePrice: '0',
      perMonth: '/мес',
      premium: 'Премиум',
      currentPlan: 'Текущий тариф',
      choosePlan: 'Выбрать',
      freeFeatures: [
        '5 задач в день',
        'Геймификация (стрик, медали)',
        'Видеоуроки',
        'Родительская панель',
      ],
      premiumFeatures: [
        '50 задач в день',
        'Все темы открыты',
        'Без рекламы',
        'Приоритетная поддержка',
        'Все бесплатные функции',
      ],
      popular: 'Популярный',
    },
    en: {
      nav: { home: 'Home', practice: 'Practice', topics: 'Topics', plans: 'Plans', profile: 'Profile' },
      title: 'Choose your plan',
      subtitle: 'Take your knowledge to the next level',
      free: 'Free',
      freePrice: '0',
      perMonth: '/mo',
      premium: 'Premium',
      currentPlan: 'Current plan',
      choosePlan: 'Choose',
      freeFeatures: [
        '5 exercises per day',
        'Gamification (streak, medals)',
        'Video lessons',
        'Parent panel',
      ],
      premiumFeatures: [
        '50 exercises per day',
        'All topics unlocked',
        'Ad-free',
        'Priority support',
        'All free features',
      ],
      popular: 'Popular',
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
        <button onClick={() => navigate('/home')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">🏠</span>
          <span className="text-xs">{text.nav.home}</span>
        </button>
        <button onClick={() => navigate('/practice')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">✏️</span>
          <span className="text-xs">{text.nav.practice}</span>
        </button>
        <button onClick={() => navigate('/topics')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">📚</span>
          <span className="text-xs">{text.nav.topics}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-[#1a3a2a] border-b-2 border-[#1a3a2a] font-medium">
          <span className="text-lg">👑</span>
          <span className="text-xs">{text.nav.plans}</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">👤</span>
          <span className="text-xs">{text.nav.profile}</span>
        </button>
      </div>

      <div className="px-6 mt-6">
        <h1 className="text-2xl font-bold text-[#1a3a2a] text-center mb-1">{text.title}</h1>
        <p className="text-gray-500 text-center text-sm mb-6">{text.subtitle}</p>

        {/* Bepul tarif */}
        <div className="border border-gray-200 rounded-3xl p-6 mb-4">
          <div className="text-lg font-bold text-[#1a3a2a] mb-1">{text.free}</div>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-[#1a3a2a]">{text.freePrice}</span>
            <span className="text-gray-400 text-sm mb-1">{text.perMonth}</span>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            {text.freeFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#1D9E75]">✓</span> {f}
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 font-medium">
            {text.currentPlan}
          </button>
        </div>

        {/* Premium tarif */}
        <div className="border-2 border-[#1a3a2a] rounded-3xl p-6 relative">
          {/* Ommabop belgisi */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a3a2a] text-white text-xs px-4 py-1 rounded-full font-medium">
            {text.popular}
          </div>
          <div className="text-lg font-bold text-[#1a3a2a] mb-1 flex items-center gap-2">
            👑 {text.premium}
          </div>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-[#1a3a2a]">{premiumPrice}</span>
            <span className="text-gray-400 text-sm mb-1">{text.perMonth}</span>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            {text.premiumFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-[#1D9E75]">✓</span> {f}
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-2xl bg-[#1a3a2a] text-white font-medium hover:opacity-90 transition">
            {text.choosePlan}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Plans