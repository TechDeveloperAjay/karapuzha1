"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Rooms", href: "/rooms" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* <div className="relative w-12 h-12">
                <Image
                  src="/assets/images/logo.png"
                  alt="Karapuzha Water Scapes Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div> */}
              <div className="hidden sm:flex flex-col text-green-900 font-serif leading-tight">
                <span className="text-xl font-semibold">Karapuzha</span>
                <span className="text-sm tracking-widest uppercase">Water Scapes</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-green-800 ${
                    isActive ? "text-green-800 border-b-2 border-green-800" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-green-800 hover:text-green-900 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/#book"
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 hover:bg-green-900 rounded-md transition-colors shadow-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu navLinks={navLinks} />
          
        </div>
      </div>
    </header>
  );
}
