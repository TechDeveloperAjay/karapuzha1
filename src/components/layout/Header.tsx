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
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500

        /* LIGHT MODE = WHITE BACKGROUND ALWAYS */
        bg-white dark:bg-black/70
        ${isScrolled
          ? "shadow-md border-b border-black/10 dark:border-white/10 backdrop-blur-xl"
          : ""
        }
      `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-11 h-11 lg:w-14 lg:h-14">
              <Image
                src="/assets/images/nearbyloco/logoo.jpg"
                alt="Karapuzha Waterscapes"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>

            <div className="leading-tight">
              <h1 className="text-black dark:text-white text-base lg:text-lg font-medium tracking-wide">
                Karapuzha
              </h1>

              <p className="text-[10px] tracking-[0.35em] uppercase text-black/60 dark:text-white/60">
                Water Scapes
              </p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative text-[15px] font-medium tracking-wide
                    transition-colors duration-300

                    /* LIGHT MODE: BLACK TEXT ALWAYS */
                    ${isActive
                      ? "text-[#C89B3C]"
                      : "text-black hover:text-[#C89B3C] dark:text-white dark:hover:text-white/80"
                    }
                  `}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-[#C89B3C]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">

            <ThemeToggle />

            <Link
              href="/contact"
              className="text-sm font-medium text-black hover:text-[#C89B3C] dark:text-white dark:hover:text-white/80 transition-colors"
            >
              Get In Touch
            </Link>

            {/* BOOK BUTTON */}
            <Link
              href="/#book"
              className="
                px-6 py-2.5 rounded-full
                bg-[#C89B3C]
                text-white
                text-sm font-semibold
                tracking-wide
                transition-all duration-300
                hover:opacity-90
              "
            >
              Book Now
            </Link>

          </div>

          {/* MOBILE */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}