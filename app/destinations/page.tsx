import Image from 'next/image';
import Link from 'next/link';
import { IconMapPin, IconStarFilled, IconClock, IconHeart, IconShare } from '@tabler/icons-react';

// Mock Data
const destination = {
  id: 1,
  title: "Hampi, Karnataka",
  location: "Vijayanagara District",
  rating: 4.9,
  description: "A UNESCO World Heritage Site with ancient ruins spread across a surreal boulder-strewn landscape",
  images: [
    "https://placehold.co/600x400.png",
    "https://placehold.co/600x400.png",
    // Add 5-6 more images
  ],
  highlights: [
    { 
      title: "Vittala Temple", 
      icon: "🏛️",
      description: "Famous stone chariot and musical pillars"
    },
    {
      title: "Best Time to Visit",
      icon: "⏳",
      description: "October to March (20°C to 34°C)"
    },
    // Add more highlights
  ],
  itinerary: [
    {
      day: 1,
      title: "Royal Enclosure Tour",
      duration: "6 hours",
      activities: ["Queen's Bath", "Hazara Rama Temple", "Elephant Stables"]
    },
    // Add more days
  ],
  reviews: [
    {
      user: "Traveler_Aditi",
      rating: 5,
      comment: "A magical open-air museum! Sunset at Matanga Hill is unforgettable."
    },
    // Add more reviews
  ]
};

export default function DestinationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40">
          <Image
            src={destination.images[0]}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 h-full container px-4">
          <div className="flex h-full items-end pb-16">
            <div className="max-w-2xl text-white">
              <div className="mb-4 flex items-center gap-2">
                <IconMapPin className="h-5 w-5" />
                <span className="text-lg">{destination.location}</span>
              </div>
              <h1 className="text-4xl font-bold md:text-6xl">{destination.title}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <IconStarFilled className="h-5 w-5 text-amber-400" />
                  <span>{destination.rating}</span>
                </div>
                <span className="flex items-center gap-1">
                  <IconClock className="h-5 w-5" />
                  2 Days Needed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60">
          <div className="container px-4 h-full flex items-center justify-between">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur-sm hover:bg-white/30">
                <IconHeart className="h-5 w-5" />
                Save to Wishlist
              </button>
              <button className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur-sm hover:bg-white/30">
                <IconShare className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Highlights Grid */}
            <section className="mb-16">
              <div className="grid gap-4 md:grid-cols-3">
                {destination.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-3 text-3xl">{highlight.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold">{highlight.title}</h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery */}
            <section className="mb-16">
              <h2 className="mb-8 text-3xl font-bold">Visual Journey</h2>
              <div className="columns-1 gap-4 md:columns-3">
                {destination.images.slice(1).map((image, index) => (
                  <div key={index} className="mb-4 break-inside-avoid">
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      width={400}
                      height={600}
                      className="rounded-xl object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Itinerary */}
            <section className="mb-16">
              <h2 className="mb-8 text-3xl font-bold">Perfect Itinerary</h2>
              <div className="space-y-8">
                {destination.itinerary.map((day, index) => (
                  <div 
                    key={index}
                    className="rounded-2xl bg-white p-8 shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white">
                        Day {day.day}
                      </div>
                      <h3 className="text-xl font-semibold">{day.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="text-gray-600">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* User Reviews */}
            <section>
              <h2 className="mb-8 text-3xl font-bold">Traveler Experiences</h2>
              <div className="space-y-6">
                {destination.reviews.map((review, index) => (
                  <div 
                    key={index}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-100" />
                        <span className="font-medium">{review.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconStarFilled className="h-5 w-5 text-amber-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <aside className="sticky top-24 h-fit">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-2xl font-bold">Plan Your Visit</h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-medium">Travel Dates</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border p-3"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block font-medium">Travelers</label>
                  <select className="w-full rounded-lg border p-3">
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <button className="w-full rounded-lg bg-amber-500 py-4 font-medium text-white hover:bg-amber-600">
                  Check Availability
                </button>

                <div className="space-y-3 pt-6">
                  <div className="flex justify-between">
                    <span>Entry Fee:</span>
                    <span className="font-medium">₹40 (Indians)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guided Tours:</span>
                    <span className="font-medium">From ₹1500</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-white py-16">
        <div className="container px-4">
          <h2 className="mb-8 text-3xl font-bold">Explore the Area</h2>
          <div className="h-96 rounded-2xl bg-gray-200">
            {/* Replace with actual map component */}
            <div className="flex h-full items-center justify-center">
              Map Integration Here
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}