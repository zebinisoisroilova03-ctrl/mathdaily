import { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
const exercises = [
  { question: '−(−3) − (−3)', answer: 6, options: [7, 5, 6, 8] },
  { question: '−(−3) − (−2)', answer: 5, options: [5, 7, 4, 6] },
  { question: '−(−3) − (−1)', answer: 4, options: [5, 4, 6, 3] },
  { question: '−(−3) − 0', answer: 3, options: [4, 5, 2, 3] },
  { question: '−(−3) − 1', answer: 2, options: [3, 4, 2, 1] },
  { question: '−(−3) − 2', answer: 1, options: [2, 1, 3, 0] },
  { question: '−(−3) − 3', answer: 0, options: [-1, 2, 1, 0] },
  { question: '−(−2) − (−3)', answer: 5, options: [6, 5, 4, 7] },
  { question: '−(−2) − (−2)', answer: 4, options: [3, 6, 5, 4] },
  { question: '−(−2) − (−1)', answer: 3, options: [5, 3, 2, 4] },
  { question: '−(−2) − 0', answer: 2, options: [4, 3, 2, 1] },
  { question: '−(−2) − 1', answer: 1, options: [1, 3, 2, 0] },
  { question: '−(−2) − 2', answer: 0, options: [0, 2, 1, -1] },
  { question: '−(−2) − 3', answer: -1, options: [-2, -1, 1, 0] },
  { question: '−(−1) − (−3)', answer: 4, options: [3, 5, 4, 6] },
  { question: '−(−1) − (−2)', answer: 3, options: [3, 2, 5, 4] },
  { question: '−(−1) − (−1)', answer: 2, options: [3, 2, 4, 1] },
  { question: '−(−1) − 0', answer: 1, options: [2, 1, 0, 3] },
  { question: '−(−1) − 1', answer: 0, options: [0, -1, 2, 1] },
  { question: '−(−1) − 2', answer: -1, options: [0, 1, -2, -1] },
  { question: '−(−1) − 3', answer: -2, options: [0, -1, -2, -3] },
  { question: '−0 − (−3)', answer: 3, options: [2, 3, 5, 4] },
  { question: '−0 − (−2)', answer: 2, options: [3, 2, 4, 1] },
  { question: '−0 − (−1)', answer: 1, options: [3, 1, 0, 2] },
  { question: '−0 − 0', answer: 0, options: [-1, 1, 2, 0] },
  { question: '−0 − 1', answer: -1, options: [1, -1, 0, -2] },
  { question: '−0 − 2', answer: -2, options: [-2, -1, -3, 0] },
  { question: '−0 − 3', answer: -3, options: [-2, -3, -4, -1] },
  { question: '−1 − (−3)', answer: 2, options: [2, 3, 1, 4] },
  { question: '−1 − (−2)', answer: 1, options: [0, 2, 3, 1] },
  { question: '−1 − (−1)', answer: 0, options: [-1, 1, 0, 2] },
  { question: '−1 − 0', answer: -1, options: [0, -1, -2, 1] },
  { question: '−1 − 1', answer: -2, options: [0, -3, -1, -2] },
  { question: '−1 − 2', answer: -3, options: [-2, -3, -4, -1] },
  { question: '−1 − 3', answer: -4, options: [-3, -2, -5, -4] },
  { question: '−2 − (−3)', answer: 1, options: [2, 3, 1, 0] },
  { question: '−2 − (−2)', answer: 0, options: [2, 1, -1, 0] },
  { question: '−2 − (−1)', answer: -1, options: [0, -2, 1, -1] },
  { question: '−2 − 0', answer: -2, options: [-3, 0, -2, -1] },
  { question: '−2 − 1', answer: -3, options: [-3, -2, -1, -4] },
  { question: '−2 − 2', answer: -4, options: [-4, -3, -5, -2] },
  { question: '−2 − 3', answer: -5, options: [-3, -4, -6, -5] },
  { question: '−3 − (−3)', answer: 0, options: [0, 2, -1, 1] },
  { question: '−3 − (−2)', answer: -1, options: [-1, 0, -2, 1] },
  { question: '−3 − (−1)', answer: -2, options: [-3, 0, -2, -1] },
  { question: '−3 − 0', answer: -3, options: [-1, -4, -3, -2] },
  { question: '−3 − 1', answer: -4, options: [-4, -3, -2, -5] },
  { question: '−3 − 2', answer: -5, options: [-4, -3, -6, -5] },
  { question: '−3 − 3', answer: -6, options: [-6, -7, -5, -4] },
]

const VIDEO_LINKS = {
  uz: 'https://t.me/videodarslarmatematika/119',
  ru: 'https://www.youtube.com/watch?v=GERNxLLfwGM',
  en: 'https://youtu.be/C38B33ZywWs',
}

function Exercise({ lang }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  const DAILY_LIMIT_FREE = 5
  const DAILY_LIMIT_PREMIUM = 50

  // Sahifa ochilganda limitni tekshiramiz
  useEffect(() => {
    async function checkLimit() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('today_solved, today_date, is_premium')
        .eq('id', user.id)
        .single()

      if (!profile) return

      setIsPremium(profile.is_premium)

      const today = new Date().toISOString().split('T')[0]
      const limit = profile.is_premium ? DAILY_LIMIT_PREMIUM : DAILY_LIMIT_FREE

      // Agar bugun allaqachon limitga yetgan bo'lsa
      if (profile.today_date === today && profile.today_solved >= limit) {
        setLimitReached(true)
      }
    }
    checkLimit()
  }, [])

  const t = {
    uz: {
      title: 'Butun sonlarni qo\'shish va ayirish',
      question: 'savol',
      correct: "To'g'ri!",
      wrong: "Noto'g'ri.",
      explanation: "To'g'ri javob:",
      watchVideo: "Video darsni ko'rish",
      videoSub: 'Telegram kanalida',
      next: 'Keyingi savol',
      done: 'Barcha savollar tugadi!',
      back: 'Orqaga',
      limitTitle: 'Bugungi limit tugadi!',
      limitText: "Bepul tarifda kuniga 5 ta mashq. Cheksiz mashq uchun Premium oling yoki ertaga qayting.",
      limitPremium: "Premium olish",
      limitBack: 'Bosh sahifa',
    },
    en: {
      title: 'Order of Operations',
      question: 'question',
      correct: 'Correct!',
      wrong: 'Not quite.',
      explanation: 'Correct answer:',
      watchVideo: 'Watch video lesson',
      videoSub: 'Khan Academy',
      next: 'Next question',
      done: 'All questions completed!',
      back: 'Back',
      limitTitle: "Daily limit reached!",
      limitText: 'Free plan includes 5 exercises per day. Get Premium for unlimited practice or come back tomorrow.',
      limitPremium: 'Get Premium',
      limitBack: 'Home',
    },
    ru: {
      title: 'Порядок действий',
      question: 'вопрос',
      correct: 'Правильно!',
      wrong: 'Неверно.',
      explanation: 'Правильный ответ:',
      watchVideo: 'Смотреть видеоурок',
      videoSub: 'Борис Трушин (YouTube)',
      next: 'Следующий вопрос',
      done: 'Все вопросы завершены!',
      back: 'Назад',
      limitTitle: 'Дневной лимит исчерпан!',
      limitText: 'Бесплатный тариф — 5 задач в день. Оформите Premium для безлимита или возвращайтесь завтра.',
      limitPremium: 'Оформить Premium',
      limitBack: 'Главная',
    }
  }

  const text = t[lang] || t.uz

  const ex = exercises[current]

  async function handleAnswer(option) {
    if (answered) return
    setSelected(option)
    setAnswered(true)

    const isRight = option === ex.answer

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Hozirgi profilni olamiz
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_solved, total_correct, current_streak, last_active, today_solved, today_date, is_premium')
      .eq('id', user.id)
      .single()

    if (!profile) return

    // Bugungi sana
    const today = new Date().toISOString().split('T')[0]

    // Kecha sanasi (hisoblash uchun)
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    // --- STREAK mantiqi ---
    let newStreak = profile.current_streak
    if (profile.last_active === today) {
      // Bugun allaqachon mashq qilgan — streak o'zgarmaydi
      newStreak = profile.current_streak
    } else if (profile.last_active === yesterday) {
      // Kecha qilgan, bugun davom etyapti — streak +1
      newStreak = profile.current_streak + 1
    } else {
      // Uzoq tanaffus yoki birinchi marta — streak 1 dan boshlanadi
      newStreak = 1
    }

    // --- BUGUNGI PROGRESS mantiqi ---
    let newTodaySolved = 1
    if (profile.today_date === today) {
      // Bugun avval ham yechgan — davom etadi
      newTodaySolved = profile.today_solved + 1
    }

    // Bazaga yozamiz
    await supabase
      .from('profiles')
      .update({
        total_solved: profile.total_solved + 1,
        total_correct: profile.total_correct + (isRight ? 1 : 0),
        current_streak: newStreak,
        last_active: today,
        today_solved: newTodaySolved,
        today_date: today,
      })
      .eq('id', user.id)

    // Limitga yetdimi tekshiramiz
    const limit = profile.is_premium ? DAILY_LIMIT_PREMIUM : DAILY_LIMIT_FREE
    if (newTodaySolved >= limit) {
      setLimitReached(true)
    }
  }

  function nextQuestion() {
    if (current < exercises.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const isCorrect = selected === ex.answer
  const isLast = current === exercises.length - 1

 // Limit tugagan bo'lsa — limit oynasini ko'rsatamiz
  if (limitReached) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto px-5 py-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#E1F5EE] rounded-full flex items-center justify-center mb-5">
          <span className="text-4xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-[#1a3a2a] mb-3">{text.limitTitle}</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">{text.limitText}</p>
        <button
          onClick={() => navigate('/plans')}
          className="w-full max-w-xs bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition mb-3 flex items-center justify-center gap-2"
        >
          👑 {text.limitPremium}
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full max-w-xs py-3 rounded-2xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 transition"
        >
          {text.limitBack}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto px-5 py-6">
      <button
        onClick={() => navigate('/home')}
        className="text-gray-400 mb-4 flex items-center gap-1 hover:text-gray-600"
      >
        ← {text.back}
      </button>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">
          {current + 1} / {exercises.length} {text.question}
        </span>
        <span className="text-sm font-medium text-[#1a3a2a]">{text.title}</span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
        <div
          className="h-2 bg-[#1D9E75] rounded-full transition-all"
          style={{ width: `${((current + 1) / exercises.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-[#1a3a2a] rounded-3xl px-6 py-10 text-center mb-6">
        <div className="text-4xl font-bold text-white tracking-wide">
          {ex.question} = ?
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {ex.options.map((option, i) => {
          let style = 'bg-white border-gray-200 text-gray-800 hover:border-[#1a3a2a]'
          if (answered) {
            if (option === ex.answer) {
              style = 'bg-[#E1F5EE] border-[#1D9E75] text-[#0F6E56]'
            } else if (option === selected) {
              style = 'bg-red-50 border-red-300 text-red-700'
            } else {
              style = 'bg-white border-gray-200 text-gray-400'
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`py-4 rounded-2xl border-2 text-xl font-semibold transition ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {answered && isCorrect && (
        <div className="bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-4">
          <span className="font-bold text-[#0F6E56]">{text.correct}</span>
        </div>
      )}

      {answered && !isCorrect && (
        <div>
          <div className="bg-red-50 border border-red-300 rounded-2xl px-4 py-3 mb-3">
            <span className="font-bold text-red-700">{text.wrong}</span>
            <span className="text-red-600"> {text.explanation} {ex.answer}</span>
          </div>

          
            <a href={VIDEO_LINKS[lang] || VIDEO_LINKS.uz}
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-3 bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-4 hover:bg-[#9FE1CB] transition"
          >
            <div className="w-10 h-10 bg-[#1a3a2a] rounded-xl flex items-center justify-center text-white font-bold">
              TV
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#0F6E56]">{text.watchVideo}</div>
              <div className="text-xs text-[#0F6E56] opacity-75">{text.videoSub}</div>
            </div>
          </a>
        </div>
      )}

      {answered && !isLast && (
        <button
          onClick={nextQuestion}
          className="w-full bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition"
        >
          {text.next}
        </button>
      )}

      {answered && isLast && (
        <div className="text-center mt-4">
          <div className="font-bold text-[#1a3a2a]">{text.done}</div>
        </div>
      )}

    </div>
  )
}

export default Exercise