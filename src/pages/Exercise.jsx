import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const FREE_LIMIT = 10
const STREAK_TO_ADVANCE = 3

// Hozircha bitta bo'lim. Kelajakda Topics'dan uzatiladi.
const DEFAULT_TOPIC = 'integers'

const UZ_VIDEO = 'https://www.youtube.com/watch?v=8y4A2evS1hk'
const RU_VIDEO = 'https://www.youtube.com/watch?v=GERNxLLfwGM'
const EN_VIDEO = 'https://youtu.be/C38B33ZywWs'

const CIS_TIMEZONES = [
  'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd', 'Europe/Saratov', 'Europe/Astrakhan', 'Europe/Ulyanovsk', 'Europe/Kirov',
  'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Tomsk', 'Asia/Novokuznetsk', 'Asia/Krasnoyarsk',
  'Asia/Irkutsk', 'Asia/Chita', 'Asia/Yakutsk', 'Asia/Khandyga', 'Asia/Vladivostok', 'Asia/Ust-Nera', 'Asia/Magadan', 'Asia/Sakhalin', 'Asia/Srednekolymsk', 'Asia/Kamchatka', 'Asia/Anadyr',
  'Asia/Almaty', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Oral', 'Asia/Qostanay', 'Asia/Qyzylorda',
  'Asia/Bishkek', 'Asia/Dushanbe', 'Asia/Ashgabat',
  'Europe/Minsk', 'Europe/Kyiv', 'Europe/Simferopol', 'Europe/Zaporozhye', 'Europe/Uzhgorod',
  'Asia/Baku', 'Asia/Yerevan', 'Asia/Tbilisi', 'Europe/Chisinau',
]

const UZ_TIMEZONES = ['Asia/Tashkent', 'Asia/Samarkand']

function getVideoLink() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (UZ_TIMEZONES.includes(tz)) return UZ_VIDEO
    if (CIS_TIMEZONES.includes(tz)) return RU_VIDEO
    return EN_VIDEO
  } catch {
    return EN_VIDEO
  }
}

function Exercise({ lang, mode = 'practice' }) {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])   // bazadan keladi
  const [maxType, setMaxType] = useState(1)         // bo'limning tur soni
  const [currentType, setCurrentType] = useState(1)
  const [ex, setEx] = useState(null)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)
  const [seenInType, setSeenInType] = useState([])

  // Masala tanlash: Practice — o'tilgan turlar aralash, Topics — faqat joriy tur
  function pickQuestion(type, seen, pool) {
    let filtered
    if (mode === 'practice') {
      filtered = pool.filter((e) => e.type <= type)
    } else {
      filtered = pool.filter((e) => e.type === type)
    }
    const unseen = filtered.filter((e) => !seen.includes(e.question))
    const source = unseen.length > 0 ? unseen : filtered
    if (source.length === 0) return null
    return source[Math.floor(Math.random() * source.length)]
  }

  function computeNextType(newConsecutive, newSeen, pool, type, max) {
    const poolSize = pool.filter((e) => e.type === type).length
    const advanceByStreak = newConsecutive >= STREAK_TO_ADVANCE
    const advanceBySeen = newSeen.length >= poolSize
    if (advanceByStreak || advanceBySeen) {
      if (type >= max) return 'completed'
      return type + 1
    }
    return type
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      // Profil (limit + current_type)
      const { data: profile } = await supabase
        .from('profiles')
        .select('current_type, today_solved, today_date, is_premium')
        .eq('id', user.id)
        .single()

      if (!profile) { setLoading(false); return }

      // Limit tekshiruvi
      const today = new Date().toISOString().split('T')[0]
      if (!profile.is_premium && profile.today_date === today && profile.today_solved >= FREE_LIMIT) {
        setLimitReached(true)
        setLoading(false)
        return
      }

      // Bo'lim ma'lumoti (max_type)
      const { data: topic } = await supabase
        .from('topics')
        .select('max_type')
        .eq('id', DEFAULT_TOPIC)
        .single()

      const topicMaxType = topic?.max_type || 1

      // Masalalarni bazadan yuklaymiz
      const { data: rows, error } = await supabase
        .from('exercises')
        .select('type, question, answer, options')
        .eq('topic_id', DEFAULT_TOPIC)
        .order('order_index', { ascending: true })

      if (error || !rows || rows.length === 0) {
        console.error('exercises load error:', error)
        setLoading(false)
        return
      }

      const type = profile.current_type || 1
      // current_type bo'limning max_type'idan oshmasin (himoya)
      const safeType = Math.min(type, topicMaxType)

      setExercises(rows)
      setMaxType(topicMaxType)
      setCurrentType(safeType)
      setEx(pickQuestion(safeType, [], rows))
      setLoading(false)
    }
    init()
  }, [])

  const t = {
    uz: {
      title: "Butun sonlarni qo'shish va ayirish",
      correct: "To'g'ri!", wrong: "Noto'g'ri.", explanation: "To'g'ri javob:",
      watchVideo: "Video darsni ko'rish",
      videoSub: 'Video dars',
      next: 'Keyingi savol', back: 'Orqaga',
      typeLabel: 'daraja', practiceLabel: 'Mashq',
      limitTitle: 'Bugungi limit tugadi!',
      limitText: `Bepul tarifda kuniga ${FREE_LIMIT} ta mashq. Cheksiz mashq uchun Premium oling yoki ertaga qayting.`,
      limitPremium: 'Premium olish', limitBack: 'Bosh sahifa',
      congratsTitle: 'Tabriklaymiz! 🎉',
      congratsText: 'Siz bu bo\'lim misollarini muvaffaqiyatli tugatdingiz!',
      congratsBack: 'Bosh sahifa',
      skip: 'Bilaman, o\'tkazib yuborish',
      skipHint: 'Javobini aniq bilsangiz — o\'tkazing. Limitingizni bilmagan masalalaringizga saqlang.',
    },
    en: {
      title: 'Adding & Subtracting Integers',
      correct: 'Correct!', wrong: 'Not quite.', explanation: 'Correct answer:',
      watchVideo: 'Watch video lesson',
      videoSub: 'Video lesson',
      next: 'Next question', back: 'Back',
      typeLabel: 'level', practiceLabel: 'Practice',
      limitTitle: 'Daily limit reached!',
      limitText: `Free plan includes ${FREE_LIMIT} exercises per day. Get Premium for unlimited practice or come back tomorrow.`,
      limitPremium: 'Get Premium', limitBack: 'Home',
      congratsTitle: 'Congratulations! 🎉',
      congratsText: 'You have successfully completed this topic!',
      congratsBack: 'Home',
      skip: 'I know this, skip',
      skipHint: 'If you know the answer — skip it. Save your limit for problems you don\'t know.',
    },
    ru: {
      title: 'Сложение и вычитание целых чисел',
      correct: 'Правильно!', wrong: 'Неверно.', explanation: 'Правильный ответ:',
      watchVideo: 'Смотреть видеоурок',
      videoSub: 'Видеоурок',
      next: 'Следующий вопрос', back: 'Назад',
      typeLabel: 'уровень', practiceLabel: 'Практика',
      limitTitle: 'Дневной лимит исчерпан!',
      limitText: `Бесплатный тариф — ${FREE_LIMIT} задач в день. Оформите Premium для безлимита или возвращайтесь завтра.`,
      limitPremium: 'Оформить Premium', limitBack: 'Главная',
      congratsTitle: 'Поздравляем! 🎉',
      congratsText: 'Вы успешно завершили этот раздел!',
      congratsBack: 'Главная',
      skip: 'Знаю, пропустить',
      skipHint: 'Если знаете ответ — пропустите. Сохраните лимит для задач, которые не знаете.',
    },
  }
  const text = t[lang] || t.uz

  async function handleAnswer(option) {
    if (answered || submitting || !ex) return
    setSubmitting(true)
    setSelected(option)
    setAnswered(true)

    const isRight = option === ex.answer

    const newConsecutive = isRight ? consecutiveCorrect + 1 : 0
    const newSeen = seenInType.includes(ex.question) ? seenInType : [...seenInType, ex.question]

    // Topics: turni hisoblaymiz. Practice: progressga tegmaymiz (null).
    let result = currentType
    let nextTypeForServer = null

    if (mode === 'topic') {
      result = computeNextType(newConsecutive, newSeen, exercises, currentType, maxType)
      nextTypeForServer = result === 'completed' ? currentType : result
    }

    const { data, error } = await supabase.rpc('record_answer', {
      is_correct: isRight,
      new_type: nextTypeForServer,
    })

    setSubmitting(false)

    if (error) {
      console.error('record_answer error:', error)
      setAnswered(false)
      setSelected(null)
      return
    }

    if (data?.limit_reached) {
      setLimitReached(true)
    }

    setConsecutiveCorrect(newConsecutive)
    setSeenInType(newSeen)

    if (mode === 'topic') {
      if (result === 'completed') {
        setCompleted('pending')
      } else if (result !== currentType) {
        setCurrentType(result)
        setConsecutiveCorrect(0)
        setSeenInType([])
      }
    }
  }

  function nextQuestion() {
    if (limitReached) {
      setAnswered(false)
      setSelected(null)
      return
    }
    if (completed === 'pending') {
      setCompleted(true)
      return
    }
    setEx(pickQuestion(currentType, seenInType, exercises))
    setSelected(null)
    setAnswered(false)
  }

  const isCorrect = ex && selected === ex.answer

  if (loading) {
    return <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center"><div className="text-gray-400">...</div></div>
  }

  if (completed === true) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto px-5 py-6 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-5">🎉</div>
        <h2 className="text-2xl font-bold text-[#1a3a2a] mb-3">{text.congratsTitle}</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">{text.congratsText}</p>
        <button onClick={() => navigate('/home')}
          className="w-full max-w-xs bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition">
          {text.congratsBack}
        </button>
      </div>
    )
  }

  if (limitReached && !answered) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto px-5 py-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#E1F5EE] rounded-full flex items-center justify-center mb-5"><span className="text-4xl">🎯</span></div>
        <h2 className="text-2xl font-bold text-[#1a3a2a] mb-3">{text.limitTitle}</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">{text.limitText}</p>
        <button onClick={() => navigate('/plans')}
          className="w-full max-w-xs bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition mb-3 flex items-center justify-center gap-2">
          👑 {text.limitPremium}
        </button>
        <button onClick={() => navigate('/home')}
          className="w-full max-w-xs py-3 rounded-2xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 transition">
          {text.limitBack}
        </button>
      </div>
    )
  }

  if (!ex) {
    return <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center"><div className="text-gray-400">...</div></div>
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto px-5 py-6">
      <button onClick={() => navigate('/home')} className="text-gray-400 mb-4 flex items-center gap-1 hover:text-gray-600">← {text.back}</button>

      <div className="flex items-center justify-between mb-2">
        {mode === 'topic' ? (
          <span className="text-sm text-gray-500">{text.typeLabel} {currentType}/{maxType}</span>
        ) : (
          <span className="text-sm text-gray-500">{text.practiceLabel}</span>
        )}
        <span className="text-sm font-medium text-[#1a3a2a]">{text.title}</span>
      </div>

      {mode === 'topic' ? (
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
          <div className="h-2 bg-[#1D9E75] rounded-full transition-all" style={{ width: `${(currentType / maxType) * 100}%` }}></div>
        </div>
      ) : (
        <div className="mb-6"></div>
      )}

      <div className="bg-[#1a3a2a] rounded-3xl px-6 py-10 text-center mb-6">
        <div className="text-4xl font-bold text-white tracking-wide">{ex.question} = ?</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {ex.options.map((option, i) => {
          let style = 'bg-white border-gray-200 text-gray-800 hover:border-[#1a3a2a]'
          if (answered) {
            if (option === ex.answer) style = 'bg-[#E1F5EE] border-[#1D9E75] text-[#0F6E56]'
            else if (option === selected) style = 'bg-red-50 border-red-300 text-red-700'
            else style = 'bg-white border-gray-200 text-gray-400'
          }
          return (
            <button key={i} onClick={() => handleAnswer(option)} disabled={answered || submitting}
              className={`py-4 rounded-2xl border-2 text-xl font-semibold transition ${style}`}>
              {option}
            </button>
          )
        })}
      </div>

      {!answered && (
        <div className="mb-4">
          <button onClick={nextQuestion}
            className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700 cursor-pointer transition active:scale-[0.99]">
            {text.skip}
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center px-2">{text.skipHint}</p>
        </div>
      )}

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
          <a href={getVideoLink()} rel="noopener noreferrer" target="_blank"
            className="flex items-center gap-3 bg-[#E1F5EE] border border-[#1D9E75] rounded-2xl px-4 py-3 mb-4 hover:bg-[#9FE1CB] transition">
            <div className="w-10 h-10 bg-[#1a3a2a] rounded-xl flex items-center justify-center text-white font-bold">TV</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#0F6E56]">{text.watchVideo}</div>
              <div className="text-xs text-[#0F6E56] opacity-75">{text.videoSub}</div>
            </div>
          </a>
        </div>
      )}

      {answered && (
        <button onClick={nextQuestion}
          className="w-full bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition">
          {text.next}
        </button>
      )}
    </div>
  )
}

export default Exercise