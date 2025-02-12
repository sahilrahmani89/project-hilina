import Link from "next/link";

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Explore Categories
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-300" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}

export const categories = [
  {
    id: 1,
    name: "Beaches",
    slug: "beaches",
    description: "Discover pristine coastal destinations",
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    ),
  },
  {
    id: 2,
    name: "Heritage",
    slug: "heritage",
    description: "Explore historical wonders",
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    ),
  },
  {
    id: 3,
    name: "Trekking",
    slug: "trekking",
    description: "Adventure through majestic trails",
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    id: 4,
    name: "Wildlife",
    slug: "wildlife",
    description: "Encounter nature's marvels",
    iconPath: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    ),
  },
];