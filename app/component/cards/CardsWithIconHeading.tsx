import React from 'react';
import Link from 'next/link';

interface Category {
    id: string;
    slug: string;
    iconPath: React.ReactNode;
    name: string;
    description: string;
}

interface CardsWithIconHeadingProps {
    category: Category;
}

const CardsWithIconHeading: React.FC<CardsWithIconHeadingProps> = ({ category }) => {
    return (
        
            <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative p-8 text-center">
                    {/* Animated Icon Container */}
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <svg
                            className="h-12 w-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {category.iconPath}
                        </svg>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        {category.name}
                    </h3>
                    <p className="mb-4 text-gray-600">{category.description}</p>

                    {/* Animated Explore Button */}
                    <div className="flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span className="text-sm font-semibold text-blue-600">
                            Explore {category.name}
                        </span>
                        <svg
                            className="ml-2 h-4 w-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </Link>
    );
};

export default CardsWithIconHeading;
