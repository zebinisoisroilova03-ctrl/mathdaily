import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function ResetPassword({ lang }) {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [ready, setReady] = useState(false)

  // Havoladan kelганда, Supabase session yaratadi (recovery)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true)
      }
    })
    // Bir lahzadan keyin baribir ko'rsatamiz (agar event kechiksa)
    const timer = setTimeout(() => setReady(true), 1500)
    return () => {
      subscription.unsubscribe()
      clearTimeout(timer)
    }
  }, [])

  const t = {
    uz: {
      title: 'Yangi parol',
      subtitle: 'Yangi parolingizni kiriting',
      placeholder: 'Yangi parol',
      button: 'Parolni saqlash',
      done: 'Parol yangilandi! Endi kirishingiz mumkin.',
      goHome: 'Bosh sahifa',
      short: 'Parol kamida 6 belgidan iborat bo\'lsin',
    },
    ru: {
      title: 'Новый пароль',
      subtitle: 'Введите новый пароль',
      placeholder: 'Новый пароль',
      button: 'Сохранить пароль',
      done: 'Пароль обновлён! Теперь вы можете войти.',
      goHome: 'Главная',
      short: 'Пароль должен быть не менее 6 символов',
    },
    en: {
      title: 'New password',
      subtitle: 'Enter your new password',
      placeholder: 'New password',
      button: 'Save password',
      done: 'Password updated! You can now sign in.',
      goHome: 'Home',
      short: 'Password must be at least 6 characters',
    },
  }
  const text = t[lang] || t.uz

  async function handleReset() {
    if (password.length < 6) {
      setError(text.short)
      return
    }
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-5">✅</div>
        <p className="text-gray-700 mb-8">{text.done}</p>
        <button onClick={() => navigate('/home')}
          className="w-full max-w-xs bg-[#1a3a2a] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition">
          {text.goHome}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-[#1a3a2a] mb-2">{text.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{text.subtitle}</p>

      <div className="relative w-full max-w-sm mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={text.placeholder}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-[#1a3a2a] transition"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {error && <div className="w-full max-w-sm bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-3 text-sm text-red-600">{error}</div>}

      <button onClick={handleReset} disabled={loading}
        className="w-full max-w-sm bg-[#1a3a2a] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition disabled:opacity-50">
        {loading ? '...' : text.button}
      </button>
    </div>
  )
}

export default ResetPassword