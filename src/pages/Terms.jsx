import { useNavigate } from 'react-router-dom'

function Terms({ lang }) {
  const navigate = useNavigate()

  const t = {
    uz: {
      back: 'Orqaga',
      title: 'Foydalanish shartlari',
      updated: 'Oxirgi yangilanish: 2026-yil 18-iyul',
      intro:
        'MathDaily ilovasidan foydalanish orqali siz ushbu Foydalanish shartlariga rozilik bildirasiz. Agar shartlarga rozi bo\'lmasangiz, iltimos ilovadan foydalanmang.',
      sections: [
        {
          h: '1. Xizmat tavsifi',
          p: 'MathDaily — matematik masalalarni yechish orqali o\'rganishga mo\'ljallangan ta\'lim ilovasi. Biz xizmatni "boricha" taqdim etamiz va uni istalgan vaqtda o\'zgartirishimiz yoki to\'xtatishimiz mumkin.',
        },
        {
          h: '2. Hisob',
          p: 'Ilovadan to\'liq foydalanish uchun hisob yaratishingiz kerak. Siz hisobingiz xavfsizligi uchun javobgarsiz. Bir kishi uchun bitta hisob tavsiya etiladi. Berilgan ma\'lumotlar to\'g\'ri bo\'lishi kerak.',
        },
        {
          h: '3. Yosh talablari',
          p: 'Ilova barcha yoshdagilar uchun ochiq. 13 yoshdan kichik foydalanuvchilar ilovadan faqat ota-onasi yoki qonuniy vasiysining roziligi va nazorati ostida foydalanishi kerak. Ro\'yxatdan o\'tish orqali siz shu talabga javob berishingizni tasdiqlaysiz.',
        },
        {
          h: '4. Foydalanuvchi majburiyatlari',
          p: 'Siz ilovadan faqat qonuniy maqsadlarda foydalanishga rozilik bildirasiz. Ilovaning ishlashiga xalaqit berish, tizimni buzishga urinish, boshqa foydalanuvchilarga zarar yetkazish yoki xizmatdan noqonuniy foydalanish taqiqlanadi.',
        },
        {
          h: '5. To\'lovlar (kelajakda)',
          p: 'Ilovaning ba\'zi imkoniyatlari kelajakda pullik (Premium) bo\'lishi mumkin. Pullik xizmatlar joriy etilganda, narxlar va to\'lov shartlari alohida ko\'rsatiladi. Bepul tarifda kunlik foydalanish cheklovlari amal qilishi mumkin.',
        },
        {
          h: '6. Intellektual mulk',
          p: 'Ilova, uning dizayni, matnlari va masalalari MathDaily yoki uning hamkorlariga tegishli. Siz kontentni ruxsatsiz nusxalash, tarqatish yoki tijorat maqsadida ishlatishga haqli emassiz.',
        },
        {
          h: '7. Javobgarlik chegarasi',
          p: 'Biz ilovaning uzluksiz yoki xatosiz ishlashini kafolatlamaymiz. Qonun ruxsat etgan darajada, biz ilovadan foydalanish natijasida yuzaga kelishi mumkin bo\'lgan bilvosita zararlar uchun javobgar emasmiz. Ilova ta\'lim maqsadida taqdim etiladi.',
        },
        {
          h: '8. Xizmatni to\'xtatish',
          p: 'Ushbu shartlarni buzsangiz, biz hisobingizni to\'xtatib qo\'yishimiz yoki o\'chirishimiz mumkin. Siz istalgan vaqtda hisobingizni o\'chirishingiz mumkin.',
        },
        {
          h: '9. Shartlarga o\'zgartirishlar',
          p: 'Biz ushbu shartlarni yangilashimiz mumkin. Muhim o\'zgarishlar haqida xabar beramiz. Yangilanishdan keyin ilovadan foydalanishda davom etish yangi shartlarga rozilik bildirishni anglatadi.',
        },
        {
          h: '10. Amal qiladigan qonun va bog\'lanish',
          p: 'Ushbu shartlar O\'zbekiston Respublikasi qonunlariga muvofiq talqin qilinadi. Savollar uchun: mathdaily.2026@gmail.com',
        },
      ],
    },
    ru: {
      back: 'Назад',
      title: 'Условия использования',
      updated: 'Последнее обновление: 18 июля 2026 г.',
      intro:
        'Используя приложение MathDaily, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с условиями, пожалуйста, не используйте приложение.',
      sections: [
        {
          h: '1. Описание сервиса',
          p: 'MathDaily — образовательное приложение для обучения через решение математических задач. Мы предоставляем сервис «как есть» и можем изменять или прекращать его в любое время.',
        },
        {
          h: '2. Аккаунт',
          p: 'Для полного доступа к приложению необходимо создать аккаунт. Вы несёте ответственность за безопасность своего аккаунта. Рекомендуется один аккаунт на человека. Предоставленные данные должны быть достоверными.',
        },
        {
          h: '3. Возрастные требования',
          p: 'Приложение доступно для всех возрастов. Пользователи младше 13 лет должны использовать приложение только с согласия и под наблюдением родителя или законного опекуна. Регистрируясь, вы подтверждаете, что соответствуете этому требованию.',
        },
        {
          h: '4. Обязанности пользователя',
          p: 'Вы соглашаетесь использовать приложение только в законных целях. Запрещается вмешиваться в работу приложения, пытаться взломать систему, причинять вред другим пользователям или использовать сервис незаконно.',
        },
        {
          h: '5. Платежи (в будущем)',
          p: 'Некоторые функции приложения в будущем могут стать платными (Premium). При введении платных услуг цены и условия оплаты будут указаны отдельно. В бесплатном тарифе могут действовать дневные ограничения.',
        },
        {
          h: '6. Интеллектуальная собственность',
          p: 'Приложение, его дизайн, тексты и задачи принадлежат MathDaily или его партнёрам. Вы не вправе копировать, распространять или использовать контент в коммерческих целях без разрешения.',
        },
        {
          h: '7. Ограничение ответственности',
          p: 'Мы не гарантируем бесперебойную или безошибочную работу приложения. В пределах, разрешённых законом, мы не несём ответственности за косвенный ущерб, который может возникнуть в результате использования приложения. Приложение предоставляется в образовательных целях.',
        },
        {
          h: '8. Прекращение обслуживания',
          p: 'При нарушении настоящих условий мы можем приостановить или удалить ваш аккаунт. Вы можете удалить свой аккаунт в любое время.',
        },
        {
          h: '9. Изменения условий',
          p: 'Мы можем обновлять эти условия. О существенных изменениях мы сообщим. Продолжение использования приложения после обновления означает согласие с новыми условиями.',
        },
        {
          h: '10. Применимое право и контакты',
          p: 'Настоящие условия толкуются в соответствии с законодательством Республики Узбекистан. По вопросам: mathdaily.2026@gmail.com',
        },
      ],
    },
    en: {
      back: 'Back',
      title: 'Terms of Service',
      updated: 'Last updated: July 18, 2026',
      intro:
        'By using the MathDaily app, you agree to these Terms of Service. If you do not agree with the terms, please do not use the app.',
      sections: [
        {
          h: '1. Service description',
          p: 'MathDaily is an educational app for learning through solving math problems. We provide the service "as is" and may modify or discontinue it at any time.',
        },
        {
          h: '2. Account',
          p: 'To fully use the app you must create an account. You are responsible for the security of your account. One account per person is recommended. Information provided must be accurate.',
        },
        {
          h: '3. Age requirements',
          p: 'The app is open to all ages. Users under 13 must use the app only with the consent and supervision of a parent or legal guardian. By registering, you confirm that you meet this requirement.',
        },
        {
          h: '4. User obligations',
          p: 'You agree to use the app only for lawful purposes. Interfering with the app\'s operation, attempting to hack the system, harming other users, or using the service unlawfully is prohibited.',
        },
        {
          h: '5. Payments (future)',
          p: 'Some features of the app may become paid (Premium) in the future. When paid services are introduced, prices and payment terms will be specified separately. Daily usage limits may apply on the free tier.',
        },
        {
          h: '6. Intellectual property',
          p: 'The app, its design, texts, and problems belong to MathDaily or its partners. You may not copy, distribute, or use the content for commercial purposes without permission.',
        },
        {
          h: '7. Limitation of liability',
          p: 'We do not guarantee uninterrupted or error-free operation of the app. To the extent permitted by law, we are not liable for indirect damages that may arise from use of the app. The app is provided for educational purposes.',
        },
        {
          h: '8. Termination',
          p: 'If you violate these terms, we may suspend or delete your account. You may delete your account at any time.',
        },
        {
          h: '9. Changes to terms',
          p: 'We may update these terms. We will notify you of significant changes. Continuing to use the app after an update means you accept the new terms.',
        },
        {
          h: '10. Governing law and contact',
          p: 'These terms are interpreted in accordance with the laws of the Republic of Uzbekistan. For questions: mathdaily.2026@gmail.com',
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

export default Terms
