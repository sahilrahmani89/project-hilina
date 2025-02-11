export default function Newsletter() {
    return (
      <section className="bg-blue-600 py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Get Travel Inspiration</h2>
            <p className="mb-8 text-lg">
              Subscribe to our weekly newsletter for the best travel tips and
              destination ideas
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg px-6 py-3 text-gray-900 sm:flex-1"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }