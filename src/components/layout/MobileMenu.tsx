"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-800 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 z-50">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-lg font-medium transition-colors ${
                    isActive ? "text-green-800" : "text-gray-600 hover:text-green-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-center px-4 py-2 border border-green-800 text-green-800 rounded hover:bg-green-50 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/#book"
              onClick={closeMenu}
              className="text-center px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
