import { useNavigate } from 'react-router-dom'

function Privacy({ lang }) {
  const navigate = useNavigate()

  const t = {
    uz: {
      back: 'Orqaga',
      title: 'Maxfiylik siyosati',
      updated: 'Oxirgi yangilanish: 2026-yil 18-iyul',
      intro:
        'MathDaily ("biz", "bizning", "ilova") sizning maxfiyligingizni hurmat qiladi. Ushbu Maxfiylik siyosati biz qanday ma\'lumotlarni yig\'ishimiz, ulardan qanday foydalanishimiz va ularni qanday himoya qilishimizni tushuntiradi. Ilovadan foydalanish orqali siz ushbu siyosatga rozilik bildirasiz.',
      sections: [
        {
          h: '1. Biz yig\'adigan ma\'lumotlar',
          p: 'Biz quyidagi ma\'lumotlarni yig\'amiz: elektron pochta manzili va (Google orqali kirsangiz) ismingiz hamda profil rasmingiz; ilovadagi faoliyatingiz (yechilgan masalalar, natijalar, ketma-ket kunlar); qurilmangizning vaqt mintaqasi; hamda, agar Telegram eslatmalarini yoqsangiz, Telegram identifikatoringiz. Biz kredit karta yoki parol kabi ma\'lumotlarni to\'g\'ridan-to\'g\'ri saqlamaймиz.',
        },
        {
          h: '2. Ma\'lumotlardan foydalanish',
          p: 'Ma\'lumotlaringizni faqat xizmatni taqdim etish uchun ishlatamiz: hisobingizni yuritish, o\'quv jarayoningizni saqlash, statistika ko\'rsatish, eslatmalar yuborish va ilovani yaxshilash. Biz ma\'lumotlaringizni reklama uchun sotmaymiz.',
        },
        {
          h: '3. Ma\'lumotlarni bo\'lishish',
          p: 'Biz ilova ishlashi uchun ishonchli uchinchi tomon xizmatlaridan foydalanamiz: Supabase (ma\'lumotlar bazasi va autentifikatsiya), Google (Google orqali kirish uchun), Telegram (eslatmalar uchun) va Vercel (hosting). Bu xizmatlar o\'z maxfiylik siyosatlariga ega. Biz ma\'lumotlaringizni boshqa uchinchi shaxslarga bermaymiz, qonun talab qilgan hollar bundan mustasno.',
        },
        {
          h: '4. Bolalar maxfiyligi',
          p: 'Ilova barcha yoshdagilar uchun ochiq, biroq 13 yoshdan kichik bolalar ilovadan faqat ota-onasi yoki qonuniy vasiysining roziligi va nazorati ostida foydalanishi kerak. Agar siz ota-ona bo\'lsangiz va farzandingiz bizga ma\'lumot berganini bilsangiz va uni o\'chirishni istasangiz, biz bilan bog\'laning — biz bunday ma\'lumotni o\'chiramiz.',
        },
        {
          h: '5. Ma\'lumotlarni saqlash va xavfsizlik',
          p: 'Ma\'lumotlaringiz xavfsiz saqlanadi va faqat siz o\'z ma\'lumotlaringizga kira olasiz. Biz ma\'lumotlarni himoya qilish uchun sanoat standartidagi choralarni qo\'llaymiz. Hisobingiz faol bo\'lguncha ma\'lumotlaringiz saqlanadi.',
        },
        {
          h: '6. Sizning huquqlaringiz',
          p: 'Siz istalgan vaqtda o\'z ma\'lumotlaringizni ko\'rish, tuzatish yoki o\'chirishni so\'rashingiz mumkin. Hisobingizni o\'chirishni istasangiz yoki ma\'lumotlaringiz haqida savolingiz bo\'lsa, quyidagi manzil orqali biz bilan bog\'laning.',
        },
        {
          h: '7. Ushbu siyosatga o\'zgartirishlar',
          p: 'Biz ushbu siyosatni vaqti-vaqti bilan yangilashimiz mumkin. O\'zgarishlar ushbu sahifada e\'lon qilinadi va "oxirgi yangilanish" sanasi yangilanadi.',
        },
        {
          h: '8. Biz bilan bog\'lanish',
          p: 'Maxfiylik bo\'yicha savollar uchun: mathdaily.2026@gmail.com',
        },
      ],
    },
    ru: {
      back: 'Назад',
      title: 'Политика конфиденциальности',
      updated: 'Последнее обновление: 18 июля 2026 г.',
      intro:
        'MathDaily («мы», «наш», «приложение») уважает вашу конфиденциальность. Настоящая Политика конфиденциальности объясняет, какие данные мы собираем, как их используем и защищаем. Используя приложение, вы соглашаетесь с этой политикой.',
      sections: [
        {
          h: '1. Данные, которые мы собираем',
          p: 'Мы собираем: адрес электронной почты и (при входе через Google) ваше имя и фото профиля; вашу активность в приложении (решённые задачи, результаты, серии дней); часовой пояс устройства; а также, если вы включите напоминания в Telegram, ваш идентификатор Telegram. Мы не храним напрямую такие данные, как номера банковских карт или пароли.',
        },
        {
          h: '2. Использование данных',
          p: 'Мы используем ваши данные только для предоставления сервиса: ведение аккаунта, сохранение прогресса обучения, отображение статистики, отправка напоминаний и улучшение приложения. Мы не продаём ваши данные для рекламы.',
        },
        {
          h: '3. Передача данных',
          p: 'Для работы приложения мы используем надёжные сторонние сервисы: Supabase (база данных и аутентификация), Google (для входа через Google), Telegram (для напоминаний) и Vercel (хостинг). Эти сервисы имеют собственные политики конфиденциальности. Мы не передаём ваши данные другим третьим лицам, за исключением случаев, предусмотренных законом.',
        },
        {
          h: '4. Конфиденциальность детей',
          p: 'Приложение доступно для всех возрастов, однако дети младше 13 лет должны использовать приложение только с согласия и под наблюдением родителя или законного опекуна. Если вы родитель и узнали, что ваш ребёнок предоставил нам данные, и хотите их удалить, свяжитесь с нами — мы удалим такие данные.',
        },
        {
          h: '5. Хранение и безопасность данных',
          p: 'Ваши данные хранятся безопасно, и только вы имеете доступ к своим данным. Мы применяем отраслевые стандарты защиты данных. Данные хранятся, пока ваш аккаунт активен.',
        },
        {
          h: '6. Ваши права',
          p: 'Вы можете в любое время запросить просмотр, исправление или удаление своих данных. Если вы хотите удалить аккаунт или у вас есть вопросы о данных, свяжитесь с нами по адресу ниже.',
        },
        {
          h: '7. Изменения в политике',
          p: 'Мы можем периодически обновлять эту политику. Изменения публикуются на этой странице с обновлением даты «последнее обновление».',
        },
        {
          h: '8. Связаться с нами',
          p: 'По вопросам конфиденциальности: mathdaily.2026@gmail.com',
        },
      ],
    },
    en: {
      back: 'Back',
      title: 'Privacy Policy',
      updated: 'Last updated: July 18, 2026',
      intro:
        'MathDaily ("we", "our", "the app") respects your privacy. This Privacy Policy explains what data we collect, how we use it, and how we protect it. By using the app, you agree to this policy.',
      sections: [
        {
          h: '1. Information we collect',
          p: 'We collect: your email address and (if you sign in with Google) your name and profile picture; your activity in the app (solved problems, results, day streaks); your device time zone; and, if you enable Telegram reminders, your Telegram identifier. We do not directly store data such as credit card numbers or passwords.',
        },
        {
          h: '2. How we use data',
          p: 'We use your data only to provide the service: maintaining your account, saving your learning progress, showing statistics, sending reminders, and improving the app. We do not sell your data for advertising.',
        },
        {
          h: '3. Sharing of data',
          p: 'To operate the app we use trusted third-party services: Supabase (database and authentication), Google (for Google sign-in), Telegram (for reminders), and Vercel (hosting). These services have their own privacy policies. We do not share your data with other third parties, except as required by law.',
        },
        {
          h: '4. Children\'s privacy',
          p: 'The app is open to all ages, however children under 13 should use the app only with the consent and supervision of a parent or legal guardian. If you are a parent and learn that your child has provided us data and wish to have it removed, contact us and we will delete such data.',
        },
        {
          h: '5. Data retention and security',
          p: 'Your data is stored securely, and only you can access your own data. We apply industry-standard measures to protect data. Data is kept while your account is active.',
        },
        {
          h: '6. Your rights',
          p: 'You may at any time request to view, correct, or delete your data. If you wish to delete your account or have questions about your data, contact us at the address below.',
        },
        {
          h: '7. Changes to this policy',
          p: 'We may update this policy from time to time. Changes will be posted on this page with an updated "last updated" date.',
        },
        {
          h: '8. Contact us',
          p: 'For privacy questions: mathdaily.2026@gmail.com',
        },
      ],
    },
  }

  const text = t[lang] || t.uz

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-12">
      <div className="bg-[#1a3a2a] text-white px-6 py-5 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white text-xl">←</button>
        <div className="text-lg font-bold">{text.title}</div>
      </div>

      <div className="px-6 mt-5">
        <p className="text-xs text-gray-400 mb-4">{text.updated}</p>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">{text.intro}</p>

        {text.sections.map((s, i) => (
          <div key={i} className="mb-5">
            <h2 className="text-sm font-bold text-[#1a3a2a] mb-1">{s.h}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Privacy
