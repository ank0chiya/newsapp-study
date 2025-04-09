// src/types/news.ts
export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601 format date string
    content: string | null;
}

export interface NewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
    code?: string; // for error status
    message?: string; // for error status
}