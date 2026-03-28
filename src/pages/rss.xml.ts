import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const allWriting = await getCollection('writing');
  const zhTwArticles = allWriting
    .filter((a) => a.data.lang === 'zh-tw')
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    );

  return rss({
    title: 'Jacob Chuang - 決策與定位',
    description:
      '三語律師，專注於法律、商業與科技交叉領域的決策分析與定位策略。',
    site: context.site!,
    items: zhTwArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/zh-tw/writing/${article.id.replace('zh-tw/', '')}`,
      categories: article.data.tags,
      author: 'Jacob Chuang (莊閎凱)',
    })),
    customData: '<language>zh-tw</language><managingEditor>Jacob Chuang - Trilingual Lawyer</managingEditor>',
  });
}
