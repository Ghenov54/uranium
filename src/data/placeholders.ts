/**
 * TEMPORARY PLACEHOLDER CONTENT, requested by the owner until real material exists.
 * Every brand and person below is fictional. Replace with real clients and real,
 * permission-granted testimonials before relying on the site commercially.
 */

export type PlaceholderBrand = { name: string; mark: "ring" | "split" | "dot" | "stack" | "wave" | "tri" };

export const PLACEHOLDER_BRANDS: PlaceholderBrand[] = [
  { name: "Lumora", mark: "ring" },
  { name: "Orvelle", mark: "split" },
  { name: "Tessaro", mark: "stack" },
  { name: "Nordbyte", mark: "dot" },
  { name: "Verdano", mark: "wave" },
  { name: "Aurelis", mark: "tri" },
  { name: "Kavra", mark: "ring" },
  { name: "Pellin", mark: "split" },
  { name: "Ostrova", mark: "stack" },
  { name: "Brisca", mark: "wave" },
];

type L = { ro: string; en: string; ru: string };

export type PlaceholderTestimonial = { id: string; quote: L; name: string; role: L; brand: string; tone: "lavender" | "mint" };

export const PLACEHOLDER_TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    id: "t1",
    quote: {
      ro: "Echipa Uranium ne-a refăcut site-ul în șase săptămâni. Comunicarea a fost clară de la primul apel, iar rezultatul arată exact cum ne-am imaginat.",
      en: "Uranium rebuilt our website in six weeks. Communication was clear from the first call, and the result looks exactly how we pictured it.",
      ru: "Команда Uranium переделала наш сайт за шесть недель. Общение было понятным с первого звонка, а результат выглядит именно так, как мы представляли.",
    },
    name: "Ana Rusu",
    role: { ro: "Director de marketing", en: "Marketing Director", ru: "Директор по маркетингу" },
    brand: "Lumora",
    tone: "lavender",
  },
  {
    id: "t2",
    quote: {
      ro: "Aveau răspuns la fiecare întrebare tehnică, dar ne-au vorbit pe limba noastră. Aplicația a fost lansată la termen.",
      en: "They had an answer to every technical question, yet spoke our language. The app launched on schedule.",
      ru: "У них был ответ на каждый технический вопрос, но говорили они на нашем языке. Приложение вышло в срок.",
    },
    name: "Mihai Ceban",
    role: { ro: "Fondator", en: "Founder", ru: "Основатель" },
    brand: "Nordbyte",
    tone: "mint",
  },
  {
    id: "t3",
    quote: {
      ro: "Noua identitate vizuală ne-a dat curajul să intrăm pe piețe noi. Oamenii ne recunosc acum brandul din prima.",
      en: "Our new visual identity gave us the confidence to enter new markets. People now recognise the brand at first sight.",
      ru: "Новый фирменный стиль дал нам смелость выйти на новые рынки. Теперь бренд узнают с первого взгляда.",
    },
    name: "Elena Popescu",
    role: { ro: "CEO", en: "CEO", ru: "Генеральный директор" },
    brand: "Verdano",
    tone: "lavender",
  },
  {
    id: "t4",
    quote: {
      ro: "Campaniile au fost construite pe date, nu pe presupuneri. Am înțeles în fiecare lună unde merge fiecare leu.",
      en: "The campaigns were built on data, not guesswork. Every month we understood where each euro went.",
      ru: "Кампании строились на данных, а не на догадках. Каждый месяц мы понимали, куда уходит каждый лей.",
    },
    name: "Victor Lungu",
    role: { ro: "Director comercial", en: "Head of Sales", ru: "Коммерческий директор" },
    brand: "Tessaro",
    tone: "mint",
  },
  {
    id: "t5",
    quote: {
      ro: "Au automatizat procese pe care le făceam manual de ani de zile. Echipa noastră are acum timp pentru clienți.",
      en: "They automated processes we had done by hand for years. Our team finally has time for customers.",
      ru: "Они автоматизировали процессы, которые мы годами делали вручную. Теперь у команды есть время для клиентов.",
    },
    name: "Irina Moraru",
    role: { ro: "Director operațional", en: "Operations Director", ru: "Операционный директор" },
    brand: "Aurelis",
    tone: "lavender",
  },
];
