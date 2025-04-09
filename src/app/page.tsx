// src/app/page.tsx
import { Article, NewsApiResponse } from '@/types/news';
import ArticleCard from '@/components/ArticleCard'; // 後で作成します

async function getTopHeadlines(): Promise<Article[]> {
    // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;
    const url = `https://newsapi.org/v2/everything?q=ai&apiKey=${process.env.NEWS_API_KEY}`
    try {
        const response = await fetch(url, {
            // キャッシュ戦略: 1時間ごとに再検証 (ISR)
            // 開発中はキャッシュを無効にするために 0 にしても良い
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            // エラーレスポンスの内容を確認したい場合
            // const errorData = await response.json();
            // console.error("API Error:", errorData);
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data: NewsApiResponse = await response.json();

        if (data.status === 'error') {
            throw new Error(`News API Error: ${data.message}`);
        }

        // 画像がない記事を除外する例 (任意)
        // return data.articles.filter(article => article.urlToImage);
        return data.articles;
    } catch (error) {
        console.error("Error fetching top headlines:", error);
        // エラーが発生した場合は空の配列を返すか、エラー処理を行う
        return [];
    }
}

export default async function HomePage() {
    const articles = await getTopHeadlines();

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">AI記事</h1>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        // urlがない場合や重複する場合があるので、より堅牢なkeyを検討（例: publishedAt + title）
                        <ArticleCard key={article.url || index} article={article} />
                    ))}
                </div>
            ) : (
                <p>ニュース記事を取得できませんでした。</p>
            )}
        </main>
    );
}