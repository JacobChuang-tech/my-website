export const languages = {
  'zh-tw': '繁體中文',
  en: 'English',
  jp: '日本語',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh-tw';

export const ui = {
  'zh-tw': {
    'site.title': 'Jacob Chuang',
    'site.description': '三語律師，專注於法律、商業與科技交叉領域的決策分析與定位策略。',
    'nav.home': '首頁',
    'nav.writing': '文章',
    'nav.hottake': 'Hot Take',
    'nav.about': '關於',
    'home.welcome': '歡迎來到我的網站',
    'home.intro': '我的名字是 Jacob Chuang。我是一名精通三種語言的律師，對影響世界的法律、商業和技術有著濃厚的興趣。寫作讓我更加深刻的理解這世間一切事物背後的道理。歡迎透過我的視角看世界。',
    'home.latest': '最新文章',
    'home.subscribe': '訂閱電子報',
    'home.subscribe.desc': '獲取最新文章和深度分析直接發送到您的信箱',
    'home.viewAll': '查看所有文章',
    'footer.copyright': '© 2025 Jacob Chuang. All rights reserved.',
  },
  en: {
    'site.title': 'Jacob Chuang',
    'site.description': 'Trilingual lawyer focused on decision analysis and positioning strategy at the intersection of law, business, and technology.',
    'nav.home': 'Home',
    'nav.writing': 'Writing',
    'nav.hottake': 'Hot Take',
    'nav.about': 'About',
    'home.welcome': 'Welcome',
    'home.intro': "My name is Jacob Chuang. I'm a trilingual lawyer with a deep interest in the law, business, and technology that shape our world. Writing helps me understand the principles behind everything. Welcome to see the world through my lens.",
    'home.latest': 'Latest Articles',
    'home.subscribe': 'Subscribe to Newsletter',
    'home.subscribe.desc': 'Get the latest articles and in-depth analysis delivered to your inbox',
    'home.viewAll': 'View all articles',
    'footer.copyright': '© 2025 Jacob Chuang. All rights reserved.',
  },
  jp: {
    'site.title': 'Jacob Chuang',
    'site.description': '三言語弁護士。法律・ビジネス・テクノロジーの交差点における意思決定分析とポジショニング戦略に注力。',
    'nav.home': 'ホーム',
    'nav.writing': '記事',
    'nav.hottake': 'Hot Take',
    'nav.about': 'について',
    'home.welcome': 'ようこそ',
    'home.intro': '私の名前はJacob Chuangです。三言語を操る弁護士として、世界を動かす法律、ビジネス、テクノロジーに深い関心を持っています。執筆を通じて、あらゆる物事の背後にある原理をより深く理解しています。私の視点から世界をご覧ください。',
    'home.latest': '最新記事',
    'home.subscribe': 'ニュースレター登録',
    'home.subscribe.desc': '最新の記事と深い分析をメールでお届けします',
    'home.viewAll': 'すべての記事を見る',
    'footer.copyright': '© 2025 Jacob Chuang. All rights reserved.',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang, path: string = ''): string {
  return `/${lang}${path ? `/${path}` : ''}`;
}

const htmlLangMap: Record<Lang, string> = {
  'zh-tw': 'zh-TW',
  en: 'en',
  jp: 'ja',
};

export function getHtmlLang(lang: Lang): string {
  return htmlLangMap[lang];
}
