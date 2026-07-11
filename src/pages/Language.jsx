import { useNavigate } from 'react-router-dom'

function Language({ lang, setLang }) {
  const navigate = useNavigate()

  const t = {
    uz: { title: 'Til', back: 'Orqaga', current: 'Joriy til' },
    ru: { title: 'Язык', back: 'Назад', current: 'Текущий язык' },
    en: { title: 'Language', back: 'Back', current: 'Current language' },
  }
  const text = t[lang] || t.uz

  const languages = [
    { code: 'uz', label: "O'zbek", native: "O'zbekcha" },
    { code: 'ru', label: 'Русский', native: 'Русский' },
    { code: 'en', label: 'English', native: 'English' },
  ]

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-10">
      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-white/80 hover:text-white text-xl">←</button>
        <div className="text-lg font-bold">{text.title}</div>
      </div>

      <div className="px-6 mt-5">
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
          {text.current.toUpperCase()}
        </div>

        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          {languages.map((l, i) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-100 transition ${
                i !== languages.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <span className="font-medium text-gray-800">{l.native}</span>
              {lang === l.code && <span className="text-[#1D9E75] text-lg">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Language