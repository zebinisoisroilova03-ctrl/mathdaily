import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Home from './pages/Home'
import Exercise from './pages/Exercise'
import Profile from './pages/Profile'
import Plans from './pages/Plans'
import Language from './pages/Language'
import Statistics from './pages/Statistics'
import Topics from './pages/Topics'

// ============ AUTH (Welcome + Role + Login) ============
function Auth({ lang, setLang }) {
  const navigate = useNavigate()
  const [step, setStep] = useState('welcome')
  const [role, setRole] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const text = {
    uz: {
      subtitle: 'Har kuni matematika mashq qiling',
      start: 'Boshlash',
      whoAreYou: 'Siz kimsiz?',
      student: '👦 O\'quvchi', studentSub: '5-15 yosh',
      teen: '🧑 Talaba', teenSub: '16-25 yosh',
      parent: '👨‍👩‍👧 Ota-ona', parentSub: 'Farzandimni kuzataman',
      next: 'Davom etish',
    },
    en: {
      subtitle: 'Practice math every day',
      start: 'Get Started',
      whoAreYou: 'Who are you?',
      student: '👦 Student', studentSub: 'Ages 5-15',
      teen: '🧑 Teenager', teenSub: 'Ages 16-25',
      parent: '👨‍👩‍👧 Parent', parentSub: 'I monitor my child',
      next: 'Continue',
    },
    ru: {
      subtitle: 'Занимайтесь математикой каждый день',
      start: 'Начать',
      whoAreYou: 'Кто вы?',
      student: '👦 Ученик', studentSub: '5-15 лет',
      teen: '🧑 Студент', teenSub: '16-25 лет',
      parent: '👨‍👩‍👧 Родитель', parentSub: 'Слежу за ребёнком',
      next: 'Продолжить',
    }
  }
const t = text[lang] || text.uz

  async function handleSignUp() {
    setAuthError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setAuthError(error.message)
    else navigate('/home')
  }

  async function handleSignIn() {
    setAuthError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setAuthError(error.message)
    else navigate('/home')
  }

  // Google bilan kirish
  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/home',
      },
    })
    if (error) setAuthError(error.message)
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative flex flex-col items-center justify-center px-4">

      {step === 'welcome' && (
        <div className="absolute top-4 right-4 flex gap-1">
          <button onClick={() => setLang('uz')} className={`text-xs px-3 py-1.5 rounded-full border ${lang === 'uz' ? 'bg-[#1a3a2a] text-white border-[#1a3a2a]' : 'bg-white text-gray-500 border-gray-200'}`}>UZ</button>
          <button onClick={() => setLang('ru')} className={`text-xs px-3 py-1.5 rounded-full border ${lang === 'ru' ? 'bg-[#1a3a2a] text-white border-[#1a3a2a]' : 'bg-white text-gray-500 border-gray-200'}`}>RU</button>
          <button onClick={() => setLang('en')} className={`text-xs px-3 py-1.5 rounded-full border ${lang === 'en' ? 'bg-[#1a3a2a] text-white border-[#1a3a2a]' : 'bg-white text-gray-500 border-gray-200'}`}>EN</button>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-[#1a3a2a] mb-3">Math<span className="text-[#5DCAA5]">Daily</span></h1>
          <p className="text-gray-500 text-lg mb-10">{t.subtitle}</p>
          <button onClick={() => setStep('role')} className="bg-[#1a3a2a] text-white px-10 py-3 rounded-full text-lg font-medium hover:opacity-90 transition">{t.start}</button>
        </div>
      )}

      {step === 'role' && (
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[#1a3a2a] text-center mb-6">{t.whoAreYou}</h2>
          <div className="flex flex-col gap-3 mb-6">
            <button onClick={() => setRole('student')} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${role === 'student' ? 'border-[#1a3a2a] bg-[#E1F5EE]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <span className="text-3xl">👦</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.student}</div>
                <div className="text-sm text-gray-500">{t.studentSub}</div>
              </div>
            </button>
            <button onClick={() => setRole('teen')} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${role === 'teen' ? 'border-[#1a3a2a] bg-[#E1F5EE]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <span className="text-3xl">🧑</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.teen}</div>
                <div className="text-sm text-gray-500">{t.teenSub}</div>
              </div>
            </button>
            <button onClick={() => setRole('parent')} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${role === 'parent' ? 'border-[#1a3a2a] bg-[#E1F5EE]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <span className="text-3xl">👨‍👩‍👧</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.parent}</div>
                <div className="text-sm text-gray-500">{t.parentSub}</div>
              </div>
            </button>
          </div>
          <button onClick={() => role && setStep('login')} className={`w-full py-3 rounded-full text-lg font-medium transition ${role ? 'bg-[#1a3a2a] text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>{t.next}</button>
        </div>
      )}

      {step === 'login' && (
        <div className="w-full max-w-sm">
          <button onClick={() => setStep('role')} className="text-gray-400 mb-6 flex items-center gap-1 hover:text-gray-600">
            ← {lang === 'uz' ? 'Orqaga' : lang === 'ru' ? 'Назад' : 'Back'}
          </button>
          <h2 className="text-2xl font-bold text-[#1a3a2a] mb-2">
            {role === 'student' ? (lang === 'uz' ? '👦 O\'quvchi' : lang === 'ru' ? '👦 Ученик' : '👦 Student')
              : role === 'teen' ? (lang === 'uz' ? '🧑 Talaba' : lang === 'ru' ? '🧑 Студент' : '🧑 Teenager')
              : (lang === 'uz' ? '👨‍👩‍👧 Ota-ona' : lang === 'ru' ? '👨‍👩‍👧 Родитель' : '👨‍👩‍👧 Parent')}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {lang === 'uz' ? 'Hisobingizga kiring' : lang === 'ru' ? 'Войдите в аккаунт' : 'Sign in to your account'}
          </p>
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white py-3 rounded-2xl mb-3 hover:bg-gray-50 transition font-medium text-gray-700">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
            {lang === 'uz' ? 'Google orqali kirish' : lang === 'ru' ? 'Войти через Google' : 'Continue with Google'}
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">{lang === 'uz' ? 'yoki' : lang === 'ru' ? 'или' : 'or'}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={lang === 'uz' ? 'Email manzilingiz' : lang === 'ru' ? 'Ваш email' : 'Your email address'} className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-3 outline-none focus:border-[#1a3a2a] transition" />
          <div className="relative mb-4">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={lang === 'uz' ? 'Parol' : lang === 'ru' ? 'Пароль' : 'Password'} className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#1a3a2a] transition" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">{showPassword ? '🙈' : '👁️'}</button>
          </div>
          {authError && <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-3 text-sm text-red-600">{authError}</div>}
          <button onClick={handleSignIn} disabled={loading} className="w-full bg-[#1a3a2a] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition mb-4 disabled:opacity-50">
            {loading ? '...' : (lang === 'uz' ? 'Kirish' : lang === 'ru' ? 'Войти' : 'Sign In')}
          </button>
          <p className="text-center text-sm text-gray-500">
            {lang === 'uz' ? 'Hisob yo\'qmi? ' : lang === 'ru' ? 'Нет аккаунта? ' : 'No account? '}
            <span onClick={handleSignUp} className="text-[#1a3a2a] font-medium cursor-pointer hover:underline">
              {lang === 'uz' ? 'Ro\'yxatdan o\'ting' : lang === 'ru' ? 'Зарегистрироваться' : 'Sign up'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

// ============ ASOSIY APP (Router) ============
function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz')
  const [session, setSession] = useState(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const navigate = useNavigate()

  // Tilni localStorage'ga saqlaymiz
  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  // Tilni bazaga ham saqlaymiz (foydalanuvchi kirgan bo'lsa)
  useEffect(() => {
    async function saveLang() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await supabase
        .from('profiles')
        .update({ lang })
        .eq('id', user.id)
    }
    saveLang()
  }, [lang])

  // Sessiyani kuzatamiz
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingSession(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'SIGNED_OUT') navigate('/')
    })

    return () => subscription.unsubscribe()
  }, [])

  // Sessiya tekshirilayotganda — bo'sh ekran (miltillashning oldini oladi)
  if (loadingSession) {
    return <div className="min-h-screen bg-white"></div>
  }

  return (
    <Routes>
      <Route path="/" element={<Auth lang={lang} setLang={setLang} />} />
      <Route path="/home" element={session ? <Home lang={lang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/practice" element={session ? <Exercise lang={lang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/profile" element={session ? <Profile lang={lang} setLang={setLang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/plans" element={session ? <Plans lang={lang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/language" element={session ? <Language lang={lang} setLang={setLang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/statistics" element={session ? <Statistics lang={lang} /> : <Auth lang={lang} setLang={setLang} />} />
      <Route path="/topics" element={session ? <Topics lang={lang} /> : <Auth lang={lang} setLang={setLang} />} />
    </Routes>
  )
}

export default App