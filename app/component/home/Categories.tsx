import { categories } from "@/app/lib/data";

export default function Categories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Explore Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl bg-white p-6 text-center shadow-md transition hover:shadow-lg"
            >
              <span className="text-4xl">{category.icon}</span>
              <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
              <button className="mt-4 text-blue-600 hover:underline">
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}