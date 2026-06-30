import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Profile({ lang, setLang }) {
  const navigate = useNavigate()
  const t = {
    uz: {
      nav: { home: 'Bosh', practice: 'Mashq', topics: 'Mavzular', plans: 'Tariflar', profile: 'Profil' },
      role: 'Talaba',
      level: '3-daraja',
      premium: 'Premium faol',
      stats: 'Statistika',
      streak: 'Ketma-ket kun',
      solved: 'Yechilgan',
      accuracy: 'Aniqlik',
      settings: 'Sozlamalar',
      language: 'Til',
      dailyGoal: 'Kunlik maqsad',
      goalValue: '5 ta masala',
      notifications: 'Bildirishnomalar',
      account: 'Hisob',
      subscription: 'Obuna',
      logout: 'Chiqish',
    },
    ru: {
      nav: { home: 'Главная', practice: 'Практика', topics: 'Темы', plans: 'Тарифы', profile: 'Профиль' },
      role: 'Студент',
      level: '3-уровень',
      premium: 'Premium активен',
      stats: 'Статистика',
      streak: 'Дней подряд',
      solved: 'Решено',
      accuracy: 'Точность',
      settings: 'Настройки',
      language: 'Язык',
      dailyGoal: 'Цель на день',
      goalValue: '5 задач',
      notifications: 'Уведомления',
      account: 'Аккаунт',
      subscription: 'Подписка',
      logout: 'Выйти',
    },
    en: {
      nav: { home: 'Home', practice: 'Practice', topics: 'Topics', plans: 'Plans', profile: 'Profile' },
      role: 'Student',
      level: 'Level 3',
      premium: 'Premium active',
      stats: 'Statistics',
      streak: 'Day streak',
      solved: 'Solved',
      accuracy: 'Accuracy',
      settings: 'Settings',
      language: 'Language',
      dailyGoal: 'Daily goal',
      goalValue: '5 problems',
      notifications: 'Notifications',
      account: 'Account',
      subscription: 'Subscription',
      logout: 'Log out',
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
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
          <span className="text-lg">📚</span>
          <span className="text-xs">{text.nav.topics}</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-500">
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
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E1F5EE] flex items-center justify-center text-2xl font-bold text-[#0F6E56]">
            Z
          </div>
          <div>
            <div className="text-lg font-bold text-[#1a3a2a]">Zebo</div>
            <div className="text-sm text-gray-500">{text.role} · {text.level}</div>
            <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] mt-1">
              👑 {text.premium}
            </div>
          </div>
        </div>

        {/* Statistika */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">{text.stats.toUpperCase()}</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">7</div>
            <div className="text-xs text-gray-500 mt-1">{text.streak}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">142</div>
            <div className="text-xs text-gray-500 mt-1">{text.solved}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">78%</div>
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

        {/* Bildirishnomalar */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <span className="font-medium text-gray-800">{text.notifications}</span>
          </div>
          <span className="text-sm text-gray-400">9:00</span>
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