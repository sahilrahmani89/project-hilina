import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[95vh] min-h-[700px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70">
        <Image
          src="https://placehold.co/1920x1280.png"
          alt="Incredible India Landscape"
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1280}
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container px-4">
          {/* Main Heading with Animated Decoration */}
          <div className="mb-12 flex flex-col items-center">
            <div className="mb-8 h-1 w-24 bg-amber-400" />
            <h1 className="text-5xl font-light uppercase tracking-widest text-white md:text-7xl">
              Explore The
            </h1>
            <h2 className="animate-gradient bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
              Soul of India
            </h2>
          </div>

          {/* Navigation Cards Grid */}
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { title: "Sacred Temples", href: "/temples", icon: "🕉️" },
              { title: "Royal Heritage", href: "/heritage", icon: "🏰" },
              { title: "Wild Adventures", href: "/adventure", icon: "🌿" },
              { title: "Coastal Wonders", href: "/beaches", icon: "🏖️" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
              >
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white md:text-xl">
                  {item.title}
                </h3>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-white" />
            <div className="mx-auto mt-1 h-2 w-[2px] bg-white" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-4 top-1/3 h-24 w-1 bg-white/30" />
      <div className="absolute right-4 top-1/4 h-32 w-1 bg-white/30" />
      <div className="absolute bottom-16 left-1/4 h-16 w-1 rotate-45 bg-amber-400/50" />
    </section>
  );
}