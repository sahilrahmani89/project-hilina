import Image from 'next/image';
import Link from 'next/link';
import { IconClock, IconTags, IconUser, IconMessageCircle } from '@tabler/icons-react';

// Mock Data
const featuredPost = {
  id: 1,
  title: "Hidden Gems of Rajasthan: Beyond the Golden Triangle",
  excerpt: "Discover the unexplored wonders of Rajasthan's countryside, where ancient traditions meet breathtaking landscapes...",
  image: "https://placehold.co/600x400.png",
  date: "March 15, 2024",
  author: "Travel India Team",
  readTime: "8 min read",
  tags: ["Heritage", "Culture", "Adventure"]
};

const blogPosts = [
  {
    id: 2,
    title: "Kerala Backwaters: A Complete Travel Guide",
    excerpt: "Navigate through emerald waterways in our ultimate guide to experiencing Kerala's famous backwaters...",
    image: "https://placehold.co/600x400.png",
    date: "March 12, 2024",
    author: "Marina Desai",
    readTime: "6 min read",
    tags: ["Nature", "Houseboat"]
  },
  // Add 5-7 more posts...
];

const categories = [
  { name: "Adventure Travel", count: 45 },
  { name: "Cultural Insights", count: 32 },
  { name: "Food Journeys", count: 28 },
  { name: "Sustainable Tourism", count: 19 }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Post Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 bg-black/40">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="container max-w-4xl px-4 text-center">
            <div className="mb-4 flex justify-center gap-3">
              {featuredPost.tags.map(tag => (
                <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              {featuredPost.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <IconUser className="h-4 w-4" />
                {featuredPost.author}
              </span>
              <span className="flex items-center gap-1">
                <IconClock className="h-4 w-4" />
                {featuredPost.readTime}
              </span>
              <span>{featuredPost.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Blog Posts Grid */}
          <main className="flex-1">
            <div className="grid gap-8 md:grid-cols-2">
              {blogPosts.map(post => (
                <article 
                  key={post.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <IconUser className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconClock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      <Link href={`/blog/${post.id}`} className="hover:text-amber-600">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-4 text-gray-600">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span 
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <IconMessageCircle className="h-4 w-4" />
                        24 Comments
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className="rounded-lg px-4 py-2 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {page}
                </button>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="space-y-8">
              {/* Categories */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Explore Categories</h3>
                <ul className="space-y-3">
                  {categories.map(category => (
                    <li key={category.name}>
                      <Link 
                        href="#" 
                        className="flex justify-between rounded-lg p-3 hover:bg-gray-50"
                      >
                        <span>{category.name}</span>
                        <span className="text-gray-500">{category.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="rounded-xl bg-amber-50 p-6 text-center">
                <h3 className="mb-3 text-lg font-bold">Join Our Travel Community</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Get weekly travel inspiration and exclusive guides
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-3 w-full rounded-lg border px-4 py-2"
                />
                <button className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700">
                  Subscribe
                </button>
              </div>

              {/* Popular Posts */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Trending Now</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(post => (
                    <div key={post} className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src="https://placehold.co/600x400.png"
                          alt="Popular post"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          <Link href="#" className="hover:text-amber-600">
                            10 Must-Visit Hill Stations
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500">Mar 10, 2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}