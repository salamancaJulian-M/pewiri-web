"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catalogo', href: '/catalog' },
    { name: 'A Medida', href: '/custom' },
    { name: 'Nosotros', href: '/aboutUs' },
  ];

  const navbarBg = isScrolled || !isHomePage
    ? 'bg-white/90 backdrop-blur-md py-2 shadow-sm'
    : 'bg-transparent py-3';

  const textColor = isScrolled || !isHomePage ? 'text-gray-800' : 'text-white';

  return (
    <nav className={`fixed w-full z-50 text-sm transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <Link href="/" className="relative transition-all duration-300">
          <Image
            src="/LogoTransparente.png"
            alt="Pewiri Joyería Logo"
            width={120}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`uppercase tracking-[0.2em] transition-colors ${pathname === link.href
                ? 'text-emerald-700 font-bold'
                : `${textColor} hover:text-emerald-700`
                }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`border px-6 py-2 uppercase tracking-widest transition-all hover:bg-black hover:text-white ${isScrolled || !isHomePage
              ? 'border-black text-gray-800'
              : 'border-white text-white'
              }`}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};
