// src/app/category/[categoryId]/page.tsx
import { Article, NewsApiResponse } from '@/types/news';
import ArticleCard from '@/components/ArticleCard';
import { notFound } from 'next/navigation'; // 404ページ表示用

// Next.jsのページコンポーネントの型定義
type PageParams = { categoryId: string };

interface CategoryPageProps {
    params: Promise<PageParams>;
}

// カテゴリ名を日本語に変換する簡単なマップ (必要に応じて)
const categoryMap: { [key: string]: string } = {
    business: 'ビジネス',
    technology: 'テクノロジー',
    science: '科学',
    health: '健康',
    entertainment: 'エンタメ',
    sports: 'スポーツ',
    general: '総合',
};

async function getNewsByCategory(categoryId: string): Promise<Article[]> {
    console.log("categoryid", categoryId)
    // 有効なカテゴリかチェック (任意)
    if (!categoryMap[categoryId]) {
        notFound(); // 有効でないカテゴリIDの場合は404ページを表示
    }
    console.log("categoryid", categoryId)
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryId}&apiKey=${process.env.NEWS_API_KEY}`;
    try {
        const response = await fetch(url, {
            next: { revalidate: 3600 }, // 同様にISRを適用
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch news for category ${categoryId}: ${response.statusText}`);
        }

        const data: NewsApiResponse = await response.json();

        if (data.status === 'error') {
            throw new Error(`News API Error for category ${categoryId}: ${data.message}`);
        }

        return data.articles;

    } catch (error) {
        console.error(`Error fetching news for category ${categoryId}:`, error);
        // ここでもエラー処理。notFound() を呼ぶか、空配列を返すかなど。
        // 開発中はエラーがわかりやすいように re-throw するのもあり
        // throw error;
        return []; // または notFound()
    }
}

// 動的メタデータ生成 (任意)
export async function generateMetadata({ params }: CategoryPageProps) {
    const { categoryId } = await params
    // const categoryId = p.categoryId;
    const categoryName = categoryMap[categoryId] || categoryId;
    return {
        title: `${categoryName}ニュース | News Reader App`,
        description: `${categoryName}に関する最新ニュース`,
    };
}

export default async function CategoryPage({ params }:  CategoryPageProps) {
    // const categoryId = params.categoryId;
    const { categoryId } = await params
    const articles = await getNewsByCategory(categoryId);
    const categoryName = categoryMap[categoryId] || categoryId; // 表示用にカテゴリ名を取得

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {categoryName} ニュース
            </h1>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <ArticleCard key={article.url || index} article={article} />
                    ))}
                </div>
            ) : (
                <p>このカテゴリのニュース記事を取得できませんでした。</p>
            )}
        </main>
    );
}

// (任意) 静的生成 (SSG/ISR) のためのパスを事前に生成する場合
// News APIの無料プランではカテゴリが固定されているため、generateStaticParams が有効
export async function generateStaticParams() {
    const categories = ['business', 'technology', 'science', 'health', 'entertainment', 'sports', 'general'];
    return categories.map((category) => ({
        categoryId: category,
    }));
}
