"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${
          isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-zinc-800"
            : "bg-white dark:bg-black"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/assets/images/logo.jfif"
                alt="Karapuzha Waterscapes"
                fill
                priority
                className="object-contain rounded-full"
              />
            </div>

            <div className="hidden sm:block">
              <h2 className="font-serif text-xl font-semibold text-[#1f2937] dark:text-white">
                Karapuzha
              </h2>

              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8AA05A]">
                Water Scapes
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#8AA05A]"
                      : "text-gray-600 dark:text-zinc-300 hover:text-[#8AA05A]"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-[#8AA05A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/contact"
              className="text-sm font-medium text-[#1f2937] dark:text-zinc-200 hover:text-[#8AA05A] transition-colors"
            >
              Get In Touch
            </Link>

            <Link
              href="/#book"
              className="px-6 py-3 rounded-full bg-[#8AA05A] text-white text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}