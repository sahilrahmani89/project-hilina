// "use client";
// import { useHttpService } from "@/app/providers/AccessTokenProvider";
// import React, { useEffect, useState } from "react";

// const About = () => {
//   const { httpService, refreshAccessToken } = useHttpService();
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     getProfile();
//   }, []);

//   const getProfile = async () => {
//     try {
//       console.log("getProfile called");
//       const res: any = await httpService.get("/api/profile");
//       console.log("response", res);
      
//       const responseData = res.data;
//       const { statusCode } = responseData || {};

//       // If we receive a 401 Unauthorized, attempt to refresh the token once
//       if (statusCode === 401 && retryCount < 1) {
//         console.log("Token expired, refreshing...");
//         setRetryCount(prev => prev + 1); // Increment retry count
//         await refreshAccessToken(); // Refresh the token
//         getProfile(); // Retry the API call
//       }
//     } catch (err) {
//       console.log("err", err);
//       // Handle error (e.g., token refresh failed)
//     }
//   };

//   return <div>{/* Your JSX content */}</div>;
// };

// export default About;
import Image from "next/image";
import Link from "next/link";
import { IconWorld, IconHeart, IconUsers } from "@tabler/icons-react";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0 bg-black/60">
          <Image
                             src={'https://placehold.co/400x500.png'}

            alt="About Us"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="max-w-2xl px-4">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              More Than Just Travel Stories
            </h1>
            <p className="text-lg md:text-xl">
              Connecting Wanderers with India's Soul
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                Our Journey Began with a Simple Question:
              </h2>
              <p className="text-lg text-gray-600">
                "How can we help travelers experience the <span className="text-amber-500">real India</span> - 
                beyond the guidebooks and tourist traps?"
              </p>
              <p className="text-gray-600">
                Founded in 2020 by a group of passionate explorers, Travel India has grown 
                into a community of 500,000+ travelers sharing authentic experiences.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl shadow-xl">
              <Image
                                  src={'https://placehold.co/400x500.png'}

                alt="Our Team"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            What Guides Us
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
          {[
              {
                icon: IconWorld,
                title: "Authentic Experiences",
                text: "We uncover hidden gems missed by conventional tourism"
              },
              {
                icon: IconHeart,
                title: "Sustainable Travel",
                text: "Promoting eco-friendly and community-focused journeys"
              },
              {
                icon: IconUsers,
                title: "Community First",
                text: "Real stories from real travelers, always"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl"
              >
                <value.icon className="mb-6 h-12 w-12 text-amber-500" />
                <h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid gap-8 rounded-2xl bg-amber-500 p-8 text-white md:grid-cols-4">
            {[
              { number: "500K+", label: "Travel Community" },
              { number: "10K+", label: "Verified Guides" },
              { number: "29", label: "States Covered" },
              { number: "97%", label: "Positive Reviews" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold md:text-5xl">{stat.number}</div>
                <div className="mt-2 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Meet Our Explorers
          </h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((member) => (
              <div 
                key={member}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={'https://placehold.co/400x500.png'}
                  alt="Team member"
                  width={400}
                  height={500}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">John Explorer</h3>
                  <p className="text-sm">Chief Travel Officer</p>
                  <div className="mt-4 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link href="#" className="hover:text-amber-400">
                      Twitter
                    </Link>
                    <Link href="#" className="hover:text-amber-400">
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 text-white md:py-24">
        <div className="container px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Explore Differently?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Join our community of passionate travelers and start your authentic 
            Indian journey today
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-amber-500 px-8 py-3 font-medium transition hover:bg-amber-600"
            >
              Get Started
            </Link>
            <Link
              href="/stories"
              className="rounded-lg border-2 border-white px-8 py-3 font-medium transition hover:bg-white/10"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
