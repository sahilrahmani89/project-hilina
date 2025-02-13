"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconSearch, IconStarFilled, IconMapPin, IconFilter } from '@tabler/icons-react';

// Mock Data
const destinations = [
  {
    id: 1,
    title: "Palolem Beach",
    image: "https://placehold.co/600x400.png",
    location: "Goa",
    rating: 4.8,
    type: "beach",
    state: "goa",
    description: "Serene crescent-shaped beach with coconut palm lining",
    tags: ["Family Friendly", "Water Sports", "Nightlife"]
  },
  // Add 11 more mock entries...
];

const states = [
  "Andhra Pradesh",
  "Goa",
  "Himachal Pradesh",
  "Karnataka",
  "Kerala",
  "Rajasthan",
  "Tamil Nadu",
];

export default function Explore() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !selectedState || dest.state === selectedState.toLowerCase();
    const matchesType = !selectedType || dest.type === selectedType;
    
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Discover India's Hidden Gems
            </h1>
            <p className="text-gray-600">
              Explore 10,000+ unique destinations across 29 states
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconSearch className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <IconFilter className="h-5 w-5" />
                Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">By State</h4>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state.toLowerCase()}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">By Type</h4>
                  <div className="space-y-2">
                    {['beach', 'mountain', 'heritage', 'wildlife'].map(type => (
                      <label 
                        key={type}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(prev => prev === type ? '' : type)}
                          className="rounded text-amber-500"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map(destination => (
                <div 
                  key={destination.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      fill
                      className="rounded-t-xl object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                      <h3 className="text-xl font-semibold text-white">
                        {destination.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconMapPin className="h-5 w-5 text-amber-500" />
                      <span className="text-sm text-gray-600">
                        {destination.location}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <IconStarFilled className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium">
                          {destination.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/destinations/${destination.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3, 4].map(page => (
                <button
                  key={page}
                  className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}