"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar () {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll()
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catalogo', href: '/catalogo' },
    { name: 'A Medida', href: '/a-medida' },
    { name: 'Nosotros', href: '/acerca' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo como Imagen */}
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
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href ? 'text-emerald-700 font-bold' : isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/contacto"
            className={`border border-black px-6 py-2 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white ${isScrolled ? 'text-gray-800':'text-white'} `}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};
