import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Statistics({ lang }) {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total_solved: 0, total_correct: 0, current_streak: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: profile } = await supabase
          .from('profiles')
          .select('total_solved, total_correct, current_streak, last_active')
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
        }
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

const accuracy = stats.total_solved > 0
  ? Math.min(Math.round((stats.total_correct / stats.total_solved) * 100), 100)
  : 0
  const wrong = stats.total_solved - stats.total_correct

  const t = {
    uz: {
      title: 'Statistikam',
      streak: 'Ketma-ket kun',
      solved: 'Yechilgan masalalar',
      correct: "To'g'ri javoblar",
      wrong: "Noto'g'ri javoblar",
      accuracy: 'Aniqlik darajasi',
      overview: 'Umumiy',
      details: 'Batafsil',
    },
    ru: {
      title: 'Моя статистика',
      streak: 'Дней подряд',
      solved: 'Решено задач',
      correct: 'Правильных ответов',
      wrong: 'Неправильных ответов',
      accuracy: 'Точность',
      overview: 'Обзор',
      details: 'Подробно',
    },
    en: {
      title: 'My Statistics',
      streak: 'Day streak',
      solved: 'Problems solved',
      correct: 'Correct answers',
      wrong: 'Wrong answers',
      accuracy: 'Accuracy rate',
      overview: 'Overview',
      details: 'Details',
    },
  }
  const text = t[lang] || t.uz

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-10">
      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-white/80 hover:text-white text-xl">←</button>
        <div className="text-lg font-bold">{text.title}</div>
      </div>

      <div className="px-6 mt-5">
        {/* Umumiy kartalar */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
          {text.overview.toUpperCase()}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl px-3 py-4 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{loading ? '–' : stats.current_streak}</div>
            <div className="text-xs text-gray-500 mt-1">{text.streak}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-4 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{loading ? '–' : stats.total_solved}</div>
            <div className="text-xs text-gray-500 mt-1">{text.solved}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-3 py-4 text-center">
            <div className="text-2xl font-bold text-[#1a3a2a]">{loading ? '–' : `${accuracy}%`}</div>
            <div className="text-xs text-gray-500 mt-1">{text.accuracy}</div>
          </div>
        </div>

        {/* Batafsil */}
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
          {text.details.toUpperCase()}
        </div>
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <span className="text-gray-700">{text.correct}</span>
            <span className="font-semibold text-[#0F6E56]">{loading ? '–' : stats.total_correct}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <span className="text-gray-700">{text.wrong}</span>
            <span className="font-semibold text-red-600">{loading ? '–' : wrong}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-gray-700">{text.accuracy}</span>
            <span className="font-semibold text-[#1a3a2a]">{loading ? '–' : `${accuracy}%`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics