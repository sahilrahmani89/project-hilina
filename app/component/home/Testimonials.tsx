export default function Testimonials() {
    return (
      <section className="py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Traveler Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-600">Mumbai, India</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  "Best travel platform I've used! Discovered amazing hidden gems
                  through their recommendations."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }