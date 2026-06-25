import { useState } from 'react'
import Home from './pages/Home'

function App() {
  const [step, setStep] = useState('welcome')
  const [role, setRole] = useState('')
  const [lang, setLang] = useState('uz')
  const [showPassword, setShowPassword] = useState(false)

  const text = {
    uz: {
      title: 'MathDaily',
      subtitle: 'Har kuni matematika mashq qiling',
      start: 'Boshlash',
      whoAreYou: 'Siz kimsiz?',
      student: '👦 O\'quvchi',
      studentSub: '5-15 yosh',
      teen: '🧑 Talaba',
      teenSub: '16-25 yosh',
      parent: '👨‍👩‍👧 Ota-ona',
      parentSub: 'Farzandimni kuzataman',
      next: 'Davom etish',
      langBtn: 'English',
    },
    en: {
      title: 'MathDaily',
      subtitle: 'Practice math every day',
      start: 'Get Started',
      whoAreYou: 'Who are you?',
      student: '👦 Student',
      studentSub: 'Ages 5-15',
      teen: '🧑 Teenager',
      teenSub: 'Ages 16-25',
      parent: '👨‍👩‍👧 Parent',
      parentSub: 'I monitor my child',
      next: 'Continue',
      langBtn: 'O\'zbek',
    }
  }

  const t = text[lang]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* Til tugmasi */}
      <button
        onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')}
        className="absolute top-4 right-4 text-sm bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100"
      >
        {t.langBtn}
      </button>

      {/* WELCOME sahifasi */}
      {step === 'welcome' && (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-[#1a3a2a] mb-3">
            Math<span className="text-[#5DCAA5]">Daily</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10">{t.subtitle}</p>
          <button
            onClick={() => setStep('role')}
            className="bg-[#1a3a2a] text-white px-10 py-3 rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {t.start}
          </button>
        </div>
      )}

      {/* ROL TANLASH sahifasi */}
      {step === 'role' && (
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[#1a3a2a] text-center mb-6">
            {t.whoAreYou}
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            {/* O'quvchi */}
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                role === 'student'
                  ? 'border-[#1a3a2a] bg-[#E1F5EE]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-3xl">👦</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.student}</div>
                <div className="text-sm text-gray-500">{t.studentSub}</div>
              </div>
            </button>

            {/* Talaba */}
            <button
              onClick={() => setRole('teen')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                role === 'teen'
                  ? 'border-[#1a3a2a] bg-[#E1F5EE]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-3xl">🧑</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.teen}</div>
                <div className="text-sm text-gray-500">{t.teenSub}</div>
              </div>
            </button>

            {/* Ota-ona */}
            <button
              onClick={() => setRole('parent')}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                role === 'parent'
                  ? 'border-[#1a3a2a] bg-[#E1F5EE]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-3xl">👨‍👩‍👧</span>
              <div className="text-left">
                <div className="font-semibold text-[#1a3a2a]">{t.parent}</div>
                <div className="text-sm text-gray-500">{t.parentSub}</div>
              </div>
            </button>
          </div>

          <button
            onClick={() => role && setStep('login')}
            className={`w-full py-3 rounded-full text-lg font-medium transition ${
              role
                ? 'bg-[#1a3a2a] text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t.next}
          </button>
        </div>
      )}

      {/* LOGIN sahifasi */}
      {step === 'login' && (
        <div className="w-full max-w-sm">
          <button
            onClick={() => setStep('role')}
            className="text-gray-400 mb-6 flex items-center gap-1 hover:text-gray-600"
          >
            ← Orqaga
          </button>

          <h2 className="text-2xl font-bold text-[#1a3a2a] mb-2">
            {role === 'student' ? '👦 O\'quvchi' : role === 'teen' ? '🧑 Talaba' : '👨‍👩‍👧 Ota-ona'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {lang === 'uz' ? 'Hisobingizga kiring' : 'Sign in to your account'}
          </p>

          {/* Google tugmasi */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white py-3 rounded-2xl mb-3 hover:bg-gray-50 transition font-medium text-gray-700">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
            {lang === 'uz' ? 'Google orqali kirish' : 'Continue with Google'}
          </button>

          {/* Chiziq */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">
              {lang === 'uz' ? 'yoki' : 'or'}
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder={lang === 'uz' ? 'Email manzilingiz' : 'Your email address'}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-3 outline-none focus:border-[#1a3a2a] transition"
          />

          {/* Parol */}
          <div className="relative mb-4">
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder={lang === 'uz' ? 'Parol' : 'Password'}
    className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#1a3a2a] transition"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
  >
    {showPassword ? '🙈' : '👁️'}
  </button>
</div>

          {/* Kirish tugmasi */}
          <button 
  onClick={() => setStep('home')}
  className="w-full bg-[#1a3a2a] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition mb-4">
  {lang === 'uz' ? 'Kirish' : 'Sign In'}
</button>

          {/* Ro'yxatdan o'tish */}
          <p className="text-center text-sm text-gray-500">
            {lang === 'uz' ? 'Hisob yo\'q mi? ' : 'No account? '}
            <span className="text-[#1a3a2a] font-medium cursor-pointer hover:underline">
              {lang === 'uz' ? 'Ro\'yxatdan o\'ting' : 'Sign up'}
            </span>
          </p>
        </div>
      )}
      {step === 'home' && <Home lang={lang} />}

    </div>
  )
}

export default App