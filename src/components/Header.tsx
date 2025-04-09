import Link from 'next/link';
import React from 'react';


const categories = [
    { id: 'business', name: 'ビジネス' },
    { id: 'technology', name: 'テクノロジー' },
    { id: 'science', name: '科学' },
    { id: 'health', name: '健康' },
    { id: 'entertainment', name: 'エンタメ' },
    { id: 'sports', name: 'スポーツ' },
];

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold hover:text-gray-300">
                    News Reader
                </Link>
                <ul className="flex space-x-4">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link
                                href={`/category/${category.id}`}
                                className="hover:text-gray-300 transition-colors duration-200"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;