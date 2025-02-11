export default function HeroSection() {
    return (
      <section className="relative h-[600px] md:h-[800px]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/60">
          <img
            src="/images/hero-bg.jpg"
            alt="India Landscape"
            className="h-full w-full object-cover"
          />
        </div>
  
        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
              Discover Incredible India
            </h1>
            <div className="mx-auto max-w-2xl">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full rounded-lg px-6 py-4 text-gray-900"
              />
              <button className="mt-4 rounded-lg bg-blue-600 px-8 py-3 font-medium hover:bg-blue-700">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }