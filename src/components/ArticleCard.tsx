// src/components/ArticleCard.tsx
import React from 'react';
import Image from 'next/image'; // Next.jsの画像最適化コンポーネント
import { Article } from '@/types/news';

interface ArticleCardProps {
    article: Article;
}


// 日付を読みやすい形式にフォーマットする関数 (例)
const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        // 日本時間で表示する場合
        return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        // return date.toLocaleDateString('ja-JP') + ' ' + date.toLocaleTimeString('ja-JP');
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString; // フォーマット失敗時は元の文字列を返す
    }
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { title, description, url, urlToImage, publishedAt, source } = article;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                {urlToImage ? (
                    <div className="relative w-full h-48"> {/* 画像の高さを固定 */}
                        <Image
                            src={urlToImage}
                            alt={title || '記事の画像'}
                            fill // 親要素にフィットさせる
                            style={{ objectFit: 'cover' }} // 画像がコンテナをカバーするように
                            // loading="lazy" // スクロールに応じて遅延読み込み (Next.js 13以降はデフォルトで有効な場合が多い)
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // レスポンシブ画像サイズ指定
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-500">
                        <span>No Image Available</span>
                    </div>
                )}
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description || '概要はありません'}</p>
                    <div className="text-xs text-gray-500">
                        <span>{source.name}</span> -{' '}
                        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default ArticleCard;