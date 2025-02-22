import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StateThumbnailProps {
    state: {
        id: string|number;
        slug: string;
        image: string;
        name: string;
        description: string;
        highlights: string[];
        attractions: number;
        tag: string;
    }
}

const StateThumbnail: React.FC<StateThumbnailProps> = ({ state }) => {
    return (
        <Link
            key={state.id}
            href={`/states/${state.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
            {/* Image with Gradient Overlay */}
            <div className="relative h-64">
                <Image
                    src={state.image}
                    alt={state.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            {/* State Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-3xl font-bold">{state.name}</h3>
                <p className="mt-2 text-lg opacity-90">{state.description}</p>
                
                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {state.highlights.map((highlight) => (
                        <span 
                            key={highlight}
                            className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm"
                        >
                            {highlight}
                        </span>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">
                            🏰 {state.attractions}+ Attractions
                        </span>
                    </div>
                    <button className="translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <span className="flex items-center font-medium hover:text-amber-400">
                            Explore
                            <svg
                                className="ml-2 h-5 w-5"
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
                        </span>
                    </button>
                </div>
            </div>

            {/* Top Badge */}
            <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                {state.tag}
            </div>
        </Link>
    )
}

export default StateThumbnail
