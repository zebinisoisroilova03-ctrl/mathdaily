function Home({ lang }) {
  const t = {
    uz: {
      greeting: 'Xush kelibsiz!',
      streak: 'Ketma-ket kun',
      todayProgress: 'Bugungi mashqlar',
      topics: 'Mavzular',
      medals: 'Medallar',
      start: 'Mashqni boshlash',
      locked: 'Qulflangan',
      completed: 'Bajarildi',
    },
    en: {
      greeting: 'Welcome!',
      streak: 'Day streak',
      todayProgress: "Today's exercises",
      topics: 'Topics',
      medals: 'Medals',
      start: 'Start exercise',
      locked: 'Locked',
      completed: 'Completed',
    }
  }

  const text = t[lang] || t.uz

  const topics = [
    { id: 1, name: lang === 'uz' ? 'Chiziqli tenglamalar' : 'Linear Equations', done: true },
    { id: 2, name: lang === 'uz' ? 'Kvadrat tenglamalar' : 'Quadratic Equations', done: false },
    { id: 3, name: lang === 'uz' ? 'Tengsizliklar' : 'Inequalities', done: false },
    { id: 4, name: lang === 'uz' ? "Ko'phadlar" : 'Polynomials', done: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-[#1a3a2a] text-white px-6 py-8">
        <p className="text-[#5DCAA5] text-sm mb-1">{text.greeting}</p>
        <h1 className="text-2xl font-bold">Math<span className="text-[#5DCAA5]">Daily</span></h1>
        <div className="mt-4 bg-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">7 🔥</div>
            <div className="text-sm opacity-75">{text.streak}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">3/3</div>
            <div className="text-sm opacity-75">{text.todayProgress}</div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-[#1a3a2a] mb-3">🏅 {text.medals}</h2>
        <div className="flex gap-3 mb-6">
          <div className="bg-yellow-100 rounded-2xl px-4 py-2 text-center">
            <div className="text-2xl">🥇</div>
            <div className="text-xs text-gray-500 mt-1">7 kun</div>
          </div>
          <div className="bg-gray-100 rounded-2xl px-4 py-2 text-center">
            <div className="text-2xl">🔒</div>
            <div className="text-xs text-gray-500 mt-1">30 kun</div>
          </div>
          <div className="bg-gray-100 rounded-2xl px-4 py-2 text-center">
            <div className="text-2xl">🔒</div>
            <div className="text-xs text-gray-500 mt-1">100 kun</div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#1a3a2a] mb-3">📚 {text.topics}</h2>
        <div className="flex flex-col gap-3">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-2xl px-4 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${topic.done ? 'bg-[#E1F5EE]' : 'bg-gray-100'}`}>
                  {topic.done ? '✅' : '📖'}
                </div>
                <span className="font-medium text-gray-800">{topic.name}</span>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${topic.done ? 'bg-[#E1F5EE] text-[#1a3a2a]' : 'bg-gray-100 text-gray-500'}`}>
                {topic.done ? text.completed : text.locked}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-[#1a3a2a] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition">
          {text.start} →
        </button>
      </div>
    </div>
  )
}

export default Home