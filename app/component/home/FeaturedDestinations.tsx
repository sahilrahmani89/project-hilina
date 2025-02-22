import { featuredDestinations } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedDestinations() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 md:text-5xl">
          Featured Destinations
        </h2>
        
        <div className=" relative">
          {/* Navigation Arrows */}
          {/* <div className="absolute inset-y-0 -left-4 z-20 hidden items-center md:-left-8 md:flex">
            <button className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur transition hover:bg-white/90">
              ←
            </button>
          </div>
          
          <div className="absolute inset-y-0 -right-4 z-20 hidden items-center md:-right-8 md:flex">
            <button className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur transition hover:bg-white/90">
              →
            </button>
          </div> */}

          {/* Cards Container */}
          <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-8 scroll-smooth md:gap-8">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group relative h-[400px] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl md:w-[45vw] lg:w-[30vw]"
              >
                {/* Image with Gradient Overlay */}
                <div className="relative h-full w-full">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-2 text-2xl font-bold">{destination.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm opacity-90">
                    {destination.description}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="text-sm font-medium">Explore Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/30">
                  {destination.category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}