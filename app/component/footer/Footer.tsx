import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center">
              <span className="text-3xl font-bold text-white">Explore</span>
              <span className="ml-2 text-3xl font-bold text-amber-400">
                India
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              Discover the soul of India through its vibrant cultures, 
              breathtaking landscapes, and timeless heritage. 
              Your journey to authentic experiences starts here.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <Link
                  key={platform}
                  href="#"
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                >
                  <Image
                    src={`https://placehold.co/24x24.png?text=${platform}`}
                    alt={platform}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "States", href: "/states" },
                { name: "Cities", href: "/cities" },
                { name: "Destinations", href: "/destinations" },
                { name: "Cultural Trails", href: "/cultural" },
                { name: "Adventure Sports", href: "/adventure" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-amber-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Trending Now</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Rajasthan Palaces",
                "Goa Beaches",
                "Kerala Backwaters",
                "Himalayan Treks",
                "Tamil Nadu Temples",
              ].map((destination) => (
                <li key={destination}>
                  <Link
                    href="#"
                    className="transition hover:text-amber-400"
                  >
                    {destination}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Travel Inspiration
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-amber-400 px-6 py-3 font-medium text-gray-900 transition hover:bg-amber-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 Explore India. All rights reserved.
            </p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <Link href="#" className="text-sm transition hover:text-amber-400">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm transition hover:text-amber-400">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm transition hover:text-amber-400">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
    </footer>
  );
}