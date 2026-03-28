# hungkaichuang.com 個人網站改版規劃

## 一、技術架構選擇

### 推薦方案：Astro + Cloudflare Pages

| 項目 | 選擇 | 原因 |
|------|------|------|
| 框架 | **Astro** | 靜態優先、內容導向、Markdown 原生支援、Claude Code 高度相容 |
| 託管 | **Cloudflare Pages** | 免費（無限流量、無限請求、500 builds/月）、全球 CDN、自訂網域 |
| 內容格式 | **Markdown (.md)** | AI 最易解析的格式、Claude Code 可直接編輯 |
| 版本控制 | **GitHub** | 免費、與 Cloudflare Pages 自動整合，push 即部署 |
| 電子報 | **Kit (ConvertKit)** | 你目前已在使用，免費方案可用 |
| 網域 | **hungkaichuang.com** | 繼續使用現有網域，在 Cloudflare 設定 DNS 即可 |

### 為什麼選 Astro？

1. **靜態輸出**：預設就是 pre-render 所有頁面為純 HTML，不需要 JavaScript 就能運作
2. **Content Collections**：內建的內容管理系統，用 Markdown 寫文章，Astro 自動處理分類、排序、分頁
3. **Claude Code 友善**：檔案結構清晰、使用 Markdown，Claude Code 可以直接新增/編輯文章
4. **i18n 原生支援**：內建多語系路由，適合你的三語需求（EN / JP / 繁中）
5. **零 JS 輸出**：對 AI 爬蟲極度友善，沒有 JavaScript 渲染問題

### 部署流程（用 Claude Code）

```
你在本地用 Claude Code 寫文章/修改網站
    ↓
Claude Code 執行 git push
    ↓
GitHub 接收程式碼
    ↓
Cloudflare Pages 自動 build + 部署
    ↓
網站上線（通常 < 30 秒）
```

---

## 二、網站架構設計

### 對比 pjwu.me，你的新網站架構：

```
hungkaichuang.com/
├── 首頁 (/)
│   ├── 歡迎語 + 網站定位說明
│   ├── 自我介紹（完整版）
│   ├── 最新文章（3-5 篇）
│   └── 訂閱 CTA
│
├── Writing (/writing)
│   ├── 篩選功能：全部 / 決策 / 定位 / 精選
│   ├── 文章列表（含摘要、日期）
│   └── 支援標記：精選 ✳ / Outdated
│
├── Stream (/stream)  ← 新增
│   └── 短想法、連結分享、隨筆（降低發表門檻）
│
├── About (/about)  ← 新增
│   ├── 完整自我介紹
│   ├── 專業背景（三語律師）
│   ├── 興趣與價值觀
│   └── 聯絡方式
│
├── Core (/core)  ← 新增（參考 PJ 的 Manifesto）
│   └── 你的核心信念、寫作動機、看世界的方式
│
└── 語言切換
    ├── /zh-tw/...（繁體中文）
    ├── /en/...（English）
    └── /jp/...（日本語）
```

### 與 pjwu.me 的關鍵差異保留

| PJ 的做法 | 你應該保留/調整的 |
|----------|----------------|
| 泛興趣式主題 | **保留「決策與定位」的聚焦主題**，這是你的優勢 |
| 純中文 | **保留三語支援**，這是你的獨特差異化 |
| Buttondown 電子報 | **繼續用 Kit**，免費且你已有訂閱者 |
| 自建 CMS (Strapi) | **用 Markdown 檔案即可**，Claude Code 直接操作更方便 |

---

## 三、AI 友善設計（核心需求）

### 3.1 語意化 HTML 結構

每個頁面都使用正確的語意標籤：

```html
<article>
  <header>
    <h1>文章標題</h1>
    <time datetime="2024-10-30">2024年10月30日</time>
    <p class="description">文章摘要...</p>
  </header>
  <main>
    <!-- 文章內容 -->
  </main>
  <footer>
    <nav>相關文章連結</nav>
  </footer>
</article>
```

### 3.2 Schema.org 結構化資料

每篇文章自動注入 JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "NVIDIA 瀕臨破產前黃仁勳的決策",
  "author": {
    "@type": "Person",
    "name": "Jacob Chuang",
    "url": "https://hungkaichuang.com/about"
  },
  "datePublished": "2023-10-26",
  "description": "探討 NVIDIA 草創初期面臨破產時的關鍵決策...",
  "inLanguage": "zh-TW",
  "keywords": ["決策", "定位", "NVIDIA", "黃仁勳"]
}
```

### 3.3 llms.txt（AI 爬蟲導引檔）

在根目錄放置 `/llms.txt`，讓 AI 模型快速理解你的網站：

```markdown
# Jacob Chuang (hungkaichuang.com)

> 三語律師，專注於法律、商業與科技交叉領域的決策分析與定位策略。

## 關於作者
- [About](https://hungkaichuang.com/about.md): 作者背景與專業介紹
- [Core](https://hungkaichuang.com/core.md): 核心信念與寫作動機

## 文章（決策與定位系列）
- [NVIDIA 瀕臨破產前黃仁勳的決策](https://hungkaichuang.com/articles/article-001.md)
- [Netflix 決定什麼都不做](https://hungkaichuang.com/articles/article-018.md)
- ...（所有文章的 .md 版本連結）
```

### 3.4 每篇文章提供 .md 純文字版

Astro 可以設定自動為每篇文章生成 `/articles/xxx.md` 的純 Markdown 路由，讓 AI 模型直接讀取乾淨的文字內容，不需要解析 HTML。

### 3.5 其他 AI 友善措施

- **RSS Feed**：自動生成，讓 AI 搜尋工具（如 Perplexity）能訂閱追蹤
- **Sitemap.xml**：Astro 內建，自動更新
- **robots.txt**：明確允許 AI 爬蟲（ClaudeBot、GPTBot、PerplexityBot 等）
- **Open Graph / Twitter Card**：每篇文章自動生成社群分享的 meta 標籤
- **hreflang 標籤**：告訴搜尋引擎和 AI 你的多語系對應關係
- **乾淨的 URL 結構**：`/writing/article-slug` 而非 `/articles/zh-tw/article-026-ai-decision`

---

## 四、免費運營成本分析

| 服務 | 費用 | 備註 |
|------|------|------|
| Cloudflare Pages 託管 | $0 | 無限流量、無限請求、500 builds/月 |
| GitHub 程式碼託管 | $0 | 免費方案足夠 |
| Cloudflare DNS | $0 | 免費 |
| Kit (ConvertKit) 電子報 | $0 | 免費方案支援最多 10,000 訂閱者 |
| hungkaichuang.com 網域 | ~$10-15/年 | 唯一的固定成本（你已擁有） |
| **總月費** | **$0** | 僅網域年費 |

---

## 五、用 Claude Code 的工作流程

### 日常寫文章

```bash
# 在終端機中告訴 Claude Code
claude "幫我建立一篇新文章，標題是「AI 時代的法律決策」，
分類是決策，語言是繁體中文"

# Claude Code 會自動：
# 1. 建立 src/content/writing/ai-legal-decision.md
# 2. 填入 frontmatter（標題、日期、分類、語言）
# 3. 建立對應的英文和日文版本骨架
```

### 修改網站樣式

```bash
claude "把首頁的文章列表從 3 篇改成 5 篇，
然後把導覽列的順序改成 Writing、Stream、About"
```

### 部署上線

```bash
claude "把目前的修改 commit 並推送到 GitHub"
# Cloudflare Pages 自動部署，30 秒內上線
```

---

## 六、Astro 專案檔案結構

```
hungkaichuang.com/
├── src/
│   ├── content/           ← 所有內容（Markdown）
│   │   ├── writing/       ← 長文章
│   │   │   ├── zh-tw/
│   │   │   ├── en/
│   │   │   └── jp/
│   │   └── stream/        ← 短想法
│   │       ├── zh-tw/
│   │       ├── en/
│   │       └── jp/
│   ├── pages/             ← 頁面路由
│   │   ├── index.astro    ← 首頁
│   │   ├── writing.astro
│   │   ├── stream.astro
│   │   ├── about.astro
│   │   ├── core.astro
│   │   ├── llms.txt.ts    ← 自動生成 llms.txt
│   │   └── rss.xml.ts     ← 自動生成 RSS
│   ├── layouts/           ← 版面配置
│   │   ├── Base.astro     ← 共用 HTML 結構 + SEO
│   │   └── Article.astro  ← 文章版面
│   ├── components/        ← 共用元件
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── ArticleCard.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── astro.config.mjs
└── package.json
```

---

## 七、文章 Markdown 範例

```markdown
---
title: "NVIDIA 瀕臨破產前黃仁勳的決策"
description: "探討NVIDIA草創初期面臨破產時的關鍵決策"
pubDate: 2023-10-26
category: "decision"
series: "決策與定位"
seriesNumber: 1
featured: false
outdated: false
lang: "zh-tw"
translations:
  en: "article-001-nvdia-decision"
  jp: "article-001-nvdia-decision"
---

探討NVIDIA草創初期面臨破產時的關鍵決策，以及黃仁勳如何在僅剩9個月資金的情況下做出讓公司起死回生的決定...
```

---

## 八、實作優先順序

### Phase 1：基礎建設（1-2 天）
1. 用 Claude Code 初始化 Astro 專案
2. 設定 Cloudflare Pages 自動部署
3. 建立基本版面（Nav、Footer、語言切換）
4. 遷移現有 26 篇文章為 Markdown

### Phase 2：核心頁面（1 天）
5. 首頁（完整自我介紹 + 最新文章）
6. Writing 頁面（含篩選功能）
7. About 頁面
8. 設定三語路由

### Phase 3：AI 友善化（半天）
9. 加入 Schema.org JSON-LD
10. 建立 llms.txt
11. 設定 RSS + Sitemap
12. 設定 robots.txt 允許 AI 爬蟲
13. 每篇文章的 .md 純文字路由

### Phase 4：進階功能（之後慢慢加）
14. Stream 頁面（短想法）
15. Core / Manifesto 頁面
16. 文章精選/Outdated 標記系統
17. 訂閱表單整合 Kit

---

## 九、開始第一步

當你準備好後，在終端機執行：

```bash
claude "根據 website-reform-plan.md 的規劃，
幫我初始化一個 Astro 專案，
包含基本的三語路由結構和第一版首頁"
```

Claude Code 會幫你從零開始建置整個專案。
