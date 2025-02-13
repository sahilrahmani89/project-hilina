"use client"
import Link from "next/link";
import { useState } from "react";
import { IconMenu2, IconX, IconUserCircle } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const {data:isLoggedIn} = useSession();
  

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Destinations", href: "/destinations" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];
   async function logout() {
      await signOut({ callbackUrl: '/login', redirect: true }); 
  }
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            <span className="text-amber-500">Explore</span>India
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <div className="flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition hover:text-amber-500"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="ml-6 flex items-center gap-4 border-l border-gray-200 pl-6">
              {isLoggedIn ? (
                <div className="relative">
                    <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-amber-500"
                    >
                    <IconUserCircle className="h-8 w-8 text-amber-500" />
                    </button>

                  {/* User Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-gray-600 md:hidden"
          >
            {isMobileMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu2 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute inset-x-0 z-50 bg-white pb-4 md:hidden">
            <div className="space-y-1 px-4 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              {isLoggedIn ? (
                <div className="px-4">
                  <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button className="w-full px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-50" onClick={logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link
                    href="/login"
                    className="w-full rounded-lg bg-amber-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-amber-600"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full rounded-lg border border-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-500 transition hover:bg-amber-50"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}