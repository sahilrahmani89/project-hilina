import { featuredDestinations } from "@/app/lib/data";

export default function FeaturedDestinations() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Featured Destinations</h2>
        <div className="flex snap-x gap-6 overflow-x-auto pb-8">
          {featuredDestinations.map((destination:any) => (
            <div
              key={destination.id}
              className="relative h-96 w-[300px] flex-shrink-0 snap-center"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black/50 p-4 text-white">
                <h3 className="text-xl font-semibold">{destination.title}</h3>
                <p>{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}