// Add state data in lib/data.ts first
export default function StateHighlights() {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">State Highlights</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Map through states data */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <img
                src="/images/state.jpg"
                alt="State"
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <h3 className="text-2xl font-semibold">Rajasthan</h3>
              <p className="mt-2 text-gray-600">Land of Kings and majestic forts</p>
              <ul className="mt-4 list-disc pl-4">
                <li>Jaipur</li>
                <li>Udaipur</li>
                <li>Jaisalmer</li>
              </ul>
            </div>
            {/* Repeat for other states */}
          </div>
        </div>
      </section>
    );
  }