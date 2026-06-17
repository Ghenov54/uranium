export type ChatQA = {
  id: string;
  question: string;
  answer: string;
};

export type ChatCategory = {
  id: string;
  icon: string;
  label: string;
  questions: ChatQA[];
};

export type LocaleChatData = {
  greeting: string;
  greetingName: string;
  inputPlaceholder: string;
  backLabel: string;
  moreQuestionsLabel: string;
  fallback: string;
  categories: ChatCategory[];
};

export const chatData: Record<"ro" | "en" | "ru", LocaleChatData> = {
  ro: {
    greeting: "Bună! Sunt asistentul Uranium 👋 Cu ce te pot ajuta?",
    greetingName: "Asistent Uranium",
    inputPlaceholder: "Scrie o întrebare...",
    backLabel: "← Înapoi",
    moreQuestionsLabel: "Mai am o întrebare",
    fallback: "Mulțumesc pentru întrebare! Cel mai bine contactează-ne direct la contact, iar echipa noastră îți va răspunde în cel mai scurt timp.",
    categories: [
      {
        id: "services",
        icon: "⚡",
        label: "Servicii",
        questions: [
          {
            id: "s1",
            question: "Ce servicii oferiți?",
            answer: "Oferim 5 categorii principale de servicii:\n\n• **Web** — site-uri de prezentare, magazine online, platforme web\n• **Aplicații** — aplicații mobile iOS & Android\n• **Marketing** — SEO, Google Ads, Social Media, Email Marketing\n• **Business** — consultanță, automatizări, sisteme ERP/CRM\n• **Design** — branding, UI/UX, identitate vizuală\n\nFiecare proiect e personalizat nevoilor tale.",
          },
          {
            id: "s2",
            question: "Faceți și magazine online?",
            answer: "Da, construim magazine online complete:\n\n• Integrare cu cele mai populare platforme de plată (Stripe, PayPal)\n• Gestionare produse, comenzi, clienți\n• Design personalizat conform brandului tău\n• Optimizat pentru mobil și viteza de încărcare\n• SEO tehnic inclus\n\nÎncepe cu o consultație gratuită — îți spunem exact ce soluție se potrivește.",
          },
          {
            id: "s3",
            question: "Oferiți servicii după lansare?",
            answer: "Absolut. Oferim pachete de mentenanță lunară care includ:\n\n• Actualizări de securitate\n• Backup automat\n• Monitorizare uptime\n• Modificări de conținut (până la X ore/lună)\n• Support tehnic prioritar\n\nNu te lăsăm singur după lansare.",
          },
          {
            id: "s4",
            question: "Lucrați cu clienți din afara Moldovei?",
            answer: "Da, lucrăm cu clienți din România, UE și diaspora moldovenească din întreaga lume. Comunicarea se face online (video call, email, Telegram), contractul și plățile pot fi gestionate complet digital.",
          },
        ],
      },
      {
        id: "pricing",
        icon: "💰",
        label: "Prețuri",
        questions: [
          {
            id: "p1",
            question: "Cât costă un website?",
            answer: "Prețurile noastre orientative:\n\n• **Basic** — de la 800€ (site de prezentare 5-7 pagini)\n• **Standard** — de la 1.500€ (site complex, blog, funcționalități avansate)\n• **Premium** — de la 3.000€ (platformă web, magazin online)\n\nPrețul final depinde de complexitate. Oferim o ofertă personalizată gratuită.",
          },
          {
            id: "p2",
            question: "Cum funcționează plata?",
            answer: "Avem un sistem simplu în 2 etape:\n\n• **50%** avans la semnarea contractului\n• **50%** la livrarea proiectului finalizat\n\nAcceptăm transfer bancar, card sau PayPal. Emitem factură fiscală.",
          },
          {
            id: "p3",
            question: "Există costuri ascunse?",
            answer: "Nu. Prețul din ofertă este prețul final. Specificăm clar în contract tot ce este inclus.\n\nSingurele costuri suplimentare posibile sunt cele de hosting și domeniu (pe care le gestionezi tu sau prin noi), și eventuale funcționalități noi adăugate ulterior la cererea ta.",
          },
          {
            id: "p4",
            question: "Oferiți reduceri?",
            answer: "Da:\n\n• **Pachete** — dacă contractezi mai multe servicii simultan (ex. web + marketing)\n• **Referințe** — dacă recomanzi un client nou\n• **Startup** — tarife speciale pentru afaceri la start\n\nContactează-ne și discutăm.",
          },
        ],
      },
      {
        id: "about",
        icon: "🏢",
        label: "Despre noi",
        questions: [
          {
            id: "a1",
            question: "Cine este Uranium?",
            answer: "Uranium este o agenție digitală full-service din Chișinău, Moldova. Construim experiențe digitale extraordinare pentru branduri care vor să iasă în evidență.\n\nNe specializăm în proiecte care combină design premium cu tehnologie modernă.",
          },
          {
            id: "a2",
            question: "De cât timp activați?",
            answer: "Activăm din 2020 și în cei câțiva ani am livrat zeci de proiecte pentru clienți din Moldova, România și Europa.\n\nFiecare proiect ne-a ajutat să creștem și să ne perfecționăm procesele.",
          },
          {
            id: "a3",
            question: "Cu cine voi lucra direct?",
            answer: "Vei avea un Project Manager dedicat — un singur punct de contact pentru tot proiectul.\n\nÎn spate lucrează o echipă de specialiști: designer, developer front-end, developer back-end, specialist SEO/marketing. Tu comunici cu unul, noi ne coordonăm intern.",
          },
        ],
      },
      {
        id: "process",
        icon: "🔄",
        label: "Proces & Timeline",
        questions: [
          {
            id: "pr1",
            question: "Cum începe colaborarea?",
            answer: "Pașii sunt simpli:\n\n1. **Contactezi** prin formularul de contact sau direct pe Telegram\n2. **Consultație gratuită** — 30-60 min, discutăm nevoile tale\n3. **Ofertă personalizată** — trimiți în 24-48h\n4. **Contract & avans** — semnăm și pornim\n5. **Livrare** — conform termenelor stabilite\n\nFără birocrație inutilă.",
          },
          {
            id: "pr2",
            question: "Cât durează un proiect?",
            answer: "Termenele orientative:\n\n• Site de prezentare: **2-3 săptămâni**\n• Magazin online: **4-8 săptămâni**\n• Aplicație mobilă: **2-4 luni**\n• Platformă web complexă: **3-6 luni**\n\nTermenele exacte sunt specificate în contract. Respectăm deadline-urile.",
          },
          {
            id: "pr3",
            question: "Ce informații aveți nevoie de la mine?",
            answer: "De obicei avem nevoie de:\n\n• Descrierea afacerii și obiectivele\n• Logo și elemente de brand (dacă există)\n• Texte și imagini (sau le creăm noi)\n• Exemple de site-uri/aplicații care îți plac\n• Funcționalitățile dorite\n\nDacă nu ai toate acestea, nu e o problemă — te ghidăm pas cu pas.",
          },
          {
            id: "pr4",
            question: "Cum mă țineți la curent?",
            answer: "Comunicăm constant prin:\n\n• **Update-uri săptămânale** prin email sau Telegram\n• **Prezentări intermediare** la etapele principale (design, development)\n• **Acces la un link de preview** unde poți vedea progresul în timp real\n\nEști mereu informat, fără surprize.",
          },
        ],
      },
    ],
  },

  en: {
    greeting: "Hi! I'm the Uranium assistant 👋 How can I help you?",
    greetingName: "Uranium Assistant",
    inputPlaceholder: "Type a question...",
    backLabel: "← Back",
    moreQuestionsLabel: "Ask another question",
    fallback: "Thanks for your question! It's best to contact us directly through the contact page, and our team will get back to you as soon as possible.",
    categories: [
      {
        id: "services",
        icon: "⚡",
        label: "Services",
        questions: [
          {
            id: "s1",
            question: "What services do you offer?",
            answer: "We offer 5 main service categories:\n\n• **Web** — presentation sites, e-commerce, web platforms\n• **Apps** — iOS & Android mobile applications\n• **Marketing** — SEO, Google Ads, Social Media, Email Marketing\n• **Business** — consulting, automations, ERP/CRM systems\n• **Design** — branding, UI/UX, visual identity\n\nEvery project is tailored to your specific needs.",
          },
          {
            id: "s2",
            question: "Do you build online stores?",
            answer: "Yes, we build complete e-commerce solutions:\n\n• Integration with major payment platforms (Stripe, PayPal)\n• Product, order & customer management\n• Custom design matching your brand\n• Mobile-optimized & fast loading\n• Technical SEO included\n\nStart with a free consultation — we'll recommend the right solution.",
          },
          {
            id: "s3",
            question: "Do you offer post-launch support?",
            answer: "Absolutely. We offer monthly maintenance packages including:\n\n• Security updates\n• Automatic backups\n• Uptime monitoring\n• Content changes (up to X hours/month)\n• Priority technical support\n\nWe don't leave you alone after launch.",
          },
          {
            id: "s4",
            question: "Do you work with international clients?",
            answer: "Yes, we work with clients from Romania, EU and the Moldovan diaspora worldwide. Communication is fully online (video call, email, Telegram), and contracts/payments can be handled completely digitally.",
          },
        ],
      },
      {
        id: "pricing",
        icon: "💰",
        label: "Pricing",
        questions: [
          {
            id: "p1",
            question: "How much does a website cost?",
            answer: "Our approximate pricing:\n\n• **Basic** — from €800 (5-7 page presentation site)\n• **Standard** — from €1,500 (complex site, blog, advanced features)\n• **Premium** — from €3,000 (web platform, online store)\n\nFinal price depends on complexity. We provide a free custom quote.",
          },
          {
            id: "p2",
            question: "How does payment work?",
            answer: "Simple 2-step system:\n\n• **50%** advance upon contract signing\n• **50%** upon final project delivery\n\nWe accept bank transfer, card or PayPal. Invoices provided.",
          },
          {
            id: "p3",
            question: "Are there hidden costs?",
            answer: "No. The price in the quote is the final price. Everything included is clearly specified in the contract.\n\nThe only potential extra costs are hosting and domain (managed by you or through us), and any new features added later at your request.",
          },
          {
            id: "p4",
            question: "Do you offer discounts?",
            answer: "Yes:\n\n• **Packages** — when you contract multiple services together\n• **Referrals** — when you refer a new client\n• **Startup** — special rates for early-stage businesses\n\nContact us and let's discuss.",
          },
        ],
      },
      {
        id: "about",
        icon: "🏢",
        label: "About us",
        questions: [
          {
            id: "a1",
            question: "Who is Uranium?",
            answer: "Uranium is a full-service digital agency from Chișinău, Moldova. We build extraordinary digital experiences for brands that want to stand out.\n\nWe specialize in projects that combine premium design with modern technology.",
          },
          {
            id: "a2",
            question: "How long have you been active?",
            answer: "We've been active since 2020 and in these years we've delivered dozens of projects for clients in Moldova, Romania and Europe.\n\nEvery project has helped us grow and refine our processes.",
          },
          {
            id: "a3",
            question: "Who will I work with directly?",
            answer: "You'll have a dedicated Project Manager — a single point of contact for the entire project.\n\nBehind the scenes, a team of specialists works: designer, front-end developer, back-end developer, SEO/marketing specialist. You talk to one person, we coordinate internally.",
          },
        ],
      },
      {
        id: "process",
        icon: "🔄",
        label: "Process & Timeline",
        questions: [
          {
            id: "pr1",
            question: "How does collaboration start?",
            answer: "Simple steps:\n\n1. **Contact us** via the contact form or directly on Telegram\n2. **Free consultation** — 30-60 min, we discuss your needs\n3. **Custom quote** — delivered within 24-48h\n4. **Contract & advance** — we sign and get started\n5. **Delivery** — according to agreed timelines\n\nNo unnecessary bureaucracy.",
          },
          {
            id: "pr2",
            question: "How long does a project take?",
            answer: "Approximate timelines:\n\n• Presentation site: **2-3 weeks**\n• Online store: **4-8 weeks**\n• Mobile app: **2-4 months**\n• Complex web platform: **3-6 months**\n\nExact timelines are specified in the contract. We respect deadlines.",
          },
          {
            id: "pr3",
            question: "What information do you need from me?",
            answer: "We typically need:\n\n• Business description and goals\n• Logo and brand elements (if any)\n• Texts and images (or we create them)\n• Examples of sites/apps you like\n• Desired features\n\nIf you don't have all of these, no problem — we'll guide you step by step.",
          },
          {
            id: "pr4",
            question: "How do you keep me updated?",
            answer: "We communicate constantly via:\n\n• **Weekly updates** by email or Telegram\n• **Intermediate presentations** at key stages (design, development)\n• **Preview link** where you can see progress in real time\n\nYou're always informed, no surprises.",
          },
        ],
      },
    ],
  },

  ru: {
    greeting: "Привет! Я ассистент Uranium 👋 Чем могу помочь?",
    greetingName: "Ассистент Uranium",
    inputPlaceholder: "Задайте вопрос...",
    backLabel: "← Назад",
    moreQuestionsLabel: "Ещё вопрос",
    fallback: "Спасибо за вопрос! Лучше всего обратитесь к нам напрямую через страницу контактов, и наша команда ответит вам в ближайшее время.",
    categories: [
      {
        id: "services",
        icon: "⚡",
        label: "Услуги",
        questions: [
          {
            id: "s1",
            question: "Какие услуги вы предоставляете?",
            answer: "Мы предлагаем 5 основных категорий услуг:\n\n• **Web** — сайты-визитки, интернет-магазины, веб-платформы\n• **Приложения** — мобильные приложения для iOS и Android\n• **Маркетинг** — SEO, Google Ads, Соцсети, Email-маркетинг\n• **Бизнес** — консалтинг, автоматизации, ERP/CRM-системы\n• **Дизайн** — брендинг, UI/UX, визуальная идентичность\n\nКаждый проект адаптируется под ваши потребности.",
          },
          {
            id: "s2",
            question: "Вы делаете интернет-магазины?",
            answer: "Да, мы создаём полноценные интернет-магазины:\n\n• Интеграция с популярными платёжными системами (Stripe, PayPal)\n• Управление товарами, заказами и клиентами\n• Дизайн под ваш бренд\n• Оптимизация под мобильные устройства\n• Технический SEO включён\n\nНачните с бесплатной консультации.",
          },
          {
            id: "s3",
            question: "Предоставляете поддержку после запуска?",
            answer: "Конечно. Мы предлагаем пакеты ежемесячного обслуживания:\n\n• Обновления безопасности\n• Автоматическое резервное копирование\n• Мониторинг доступности\n• Изменения контента (до X часов/месяц)\n• Приоритетная техническая поддержка\n\nМы не оставляем вас после запуска.",
          },
          {
            id: "s4",
            question: "Работаете с клиентами из других стран?",
            answer: "Да, мы работаем с клиентами из Румынии, ЕС и молдавской диаспоры по всему миру. Коммуникация — онлайн (видеозвонок, email, Telegram), договоры и оплата — полностью в цифровом формате.",
          },
        ],
      },
      {
        id: "pricing",
        icon: "💰",
        label: "Цены",
        questions: [
          {
            id: "p1",
            question: "Сколько стоит сайт?",
            answer: "Ориентировочные цены:\n\n• **Basic** — от 800€ (сайт-визитка, 5-7 страниц)\n• **Standard** — от 1.500€ (сложный сайт, блог, расширенный функционал)\n• **Premium** — от 3.000€ (веб-платформа, интернет-магазин)\n\nОкончательная цена зависит от сложности. Предоставляем бесплатное персональное предложение.",
          },
          {
            id: "p2",
            question: "Как происходит оплата?",
            answer: "Простая система в 2 этапа:\n\n• **50%** аванс при подписании договора\n• **50%** при сдаче готового проекта\n\nПринимаем банковский перевод, карту или PayPal. Выставляем счёт-фактуру.",
          },
          {
            id: "p3",
            question: "Есть ли скрытые платежи?",
            answer: "Нет. Цена в коммерческом предложении — это финальная цена. Всё включённое чётко прописано в договоре.\n\nВозможные доп. расходы — только хостинг и домен, а также новые функции, добавленные позже по вашему запросу.",
          },
          {
            id: "p4",
            question: "Есть ли скидки?",
            answer: "Да:\n\n• **Пакеты** — при заказе нескольких услуг одновременно\n• **Рекомендации** — при приведении нового клиента\n• **Стартапы** — специальные условия для начинающего бизнеса\n\nСвяжитесь с нами и обсудим.",
          },
        ],
      },
      {
        id: "about",
        icon: "🏢",
        label: "О нас",
        questions: [
          {
            id: "a1",
            question: "Кто такой Uranium?",
            answer: "Uranium — это full-service цифровое агентство из Кишинёва, Молдова. Мы создаём выдающиеся цифровые продукты для брендов, которые хотят выделяться.\n\nНаша специализация — проекты, сочетающие премиальный дизайн и современные технологии.",
          },
          {
            id: "a2",
            question: "Как давно вы работаете?",
            answer: "Мы работаем с 2020 года и за эти годы реализовали десятки проектов для клиентов из Молдовы, Румынии и Европы.\n\nКаждый проект помогает нам расти и совершенствовать процессы.",
          },
          {
            id: "a3",
            question: "С кем я буду работать напрямую?",
            answer: "У вас будет выделенный Project Manager — единая точка контакта для всего проекта.\n\nЗа кулисами работает команда специалистов: дизайнер, front-end разработчик, back-end разработчик, SEO/маркетолог. Вы общаетесь с одним человеком, мы координируемся внутри.",
          },
        ],
      },
      {
        id: "process",
        icon: "🔄",
        label: "Процесс",
        questions: [
          {
            id: "pr1",
            question: "Как начать сотрудничество?",
            answer: "Всё просто:\n\n1. **Свяжитесь** через форму или Telegram\n2. **Бесплатная консультация** — 30-60 мин, обсуждаем ваши задачи\n3. **Персональное предложение** — в течение 24-48ч\n4. **Договор и аванс** — подписываем и приступаем\n5. **Сдача** — в соответствии с установленными сроками\n\nБез лишней бюрократии.",
          },
          {
            id: "pr2",
            question: "Сколько времени занимает проект?",
            answer: "Ориентировочные сроки:\n\n• Сайт-визитка: **2-3 недели**\n• Интернет-магазин: **4-8 недель**\n• Мобильное приложение: **2-4 месяца**\n• Сложная веб-платформа: **3-6 месяцев**\n\nТочные сроки указаны в договоре. Мы соблюдаем дедлайны.",
          },
          {
            id: "pr3",
            question: "Какая информация нужна от меня?",
            answer: "Обычно нам нужны:\n\n• Описание бизнеса и цели\n• Логотип и фирменный стиль (если есть)\n• Тексты и изображения (или мы создаём сами)\n• Примеры сайтов/приложений, которые вам нравятся\n• Желаемый функционал\n\nЕсли чего-то нет — не проблема, поможем шаг за шагом.",
          },
          {
            id: "pr4",
            question: "Как вы держите меня в курсе?",
            answer: "Мы постоянно на связи:\n\n• **Еженедельные обновления** по email или Telegram\n• **Промежуточные презентации** на ключевых этапах\n• **Ссылка на preview** для просмотра прогресса в реальном времени\n\nВы всегда в курсе, без сюрпризов.",
          },
        ],
      },
    ],
  },
};
