'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname() ?? "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-text-inverse shadow-soft">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 outline-none focus-visible:ring-2 focus-visible:ring-cta rounded">
            {/* Can be replaced with actual logo */}
            <span className="font-heading font-bold text-2xl tracking-wide text-text-inverse">
              SRSG Consulting
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`relative py-2 transition-colors hover:text-cta outline-none focus-visible:ring-2 focus-visible:ring-cta rounded px-1 ${
                  isActive ? "text-cta" : "text-text-inverse"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cta" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/contact" 
            className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-8 py-2 text-sm font-semibold text-text-inverse shadow-cta transition-all hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-inverse p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-primary border-t border-primary-light shadow-soft py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-lg font-medium transition-colors hover:text-cta ${
                  isActive ? "text-cta" : "text-text-inverse"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link 
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)} 
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-2 text-base font-semibold text-text-inverse shadow-cta transition-all hover:bg-cta-hover"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
