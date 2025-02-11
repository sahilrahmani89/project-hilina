import { topCities } from "@/app/lib/data";

export default function TopCities() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Popular Cities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            <div
              key={city.id}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={city.image}
                alt={city.name}
                className="h-64 w-full object-cover"
              />
              <div className="bg-white p-6">
                <h3 className="text-xl font-semibold">{city.name}</h3>
                <p className="mt-2 text-gray-600">
                  {city.attractions}+ Attractions
                </p>
                <button className="mt-4 text-blue-600 hover:underline">
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}