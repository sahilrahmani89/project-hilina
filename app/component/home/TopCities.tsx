import Link from "next/link";
import Image from "next/image";
import { topCities } from "@/app/lib/data";
import CityThumbnail from "../cards/CityThumbnail";

export default function TopCities() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Popular Cities to Explore
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            // <Link
            //   key={city.id}
            //   href={`/cities/${city.slug}`}
            //   className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
            // >
            //   {/* Image with Gradient Overlay */}
            //   <div className="relative h-72">
            //     <Image
            //       src={city.image}
            //       alt={city.name}
            //       fill
            //       className="object-cover transition-transform duration-500 group-hover:scale-105"
            //     />
            //     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            //   </div>

            //   {/* City Content */}
            //   <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            //     <div className="mb-2 flex items-center gap-2">
            //       <svg
            //         className="h-6 w-6 text-amber-400"
            //         fill="none"
            //         stroke="currentColor"
            //         viewBox="0 0 24 24"
            //       >
            //         <path
            //           strokeLinecap="round"
            //           strokeLinejoin="round"
            //           strokeWidth={2}
            //           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            //         />
            //         <path
            //           strokeLinecap="round"
            //           strokeLinejoin="round"
            //           strokeWidth={2}
            //           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            //         />
            //       </svg>
            //       <h3 className="text-2xl font-bold">{city.name}</h3>
            //     </div>
                
            //     <p className="mb-4 text-sm opacity-90">{city.tagline}</p>
                
            //     <div className="flex items-center justify-between">
            //       <div className="flex items-center gap-2">
            //         <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
            //           {city.attractions}+ Attractions
            //         </span>
            //         <span className="rounded-full bg-amber-400/90 px-3 py-1 text-sm font-medium text-gray-900">
            //           ★ {city.rating}
            //         </span>
            //       </div>
            //       <button className="translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            //         <span className="flex items-center font-medium hover:text-amber-400">
            //           Explore
            //           <svg
            //             className="ml-2 h-5 w-5"
            //             fill="none"
            //             stroke="currentColor"
            //             viewBox="0 0 24 24"
            //           >
            //             <path
            //               strokeLinecap="round"
            //               strokeLinejoin="round"
            //               strokeWidth={2}
            //               d="M17 8l4 4m0 0l-4 4m4-4H3"
            //             />
            //           </svg>
            //         </span>
            //       </button>
            //     </div>
            //   </div>

            //   {/* Top Badge */}
            //   <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
            //     #{city.popularity} in India
            //   </div>
            // </Link>
            <CityThumbnail city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}

