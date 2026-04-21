"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catalogo', href: '/catalog' },
    { name: 'A Medida', href: '/custom' },
    { name: 'Nosotros', href: '/aboutUs' },
  ];

  const isSolid = isScrolled || !isHomePage;

  const navbarBg = isSolid
    ? 'bg-green-100/95 backdrop-blur-md py-2 shadow-sm'
    : 'bg-transparent py-4';

  const textColor = isSolid ? 'text-green-400' : 'text-green-100';
  const hoverColor = isSolid ? 'hover:text-green-900' : 'hover:text-green-300';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <Link href="/" className="relative z-[101] flex items-center gap-3 group transition-all duration-30">
          <Image
            src="/LogoTransparente.png"
            alt="Pewiri Joyería Logo"
            width={isScrolled ? 60 : 80}
            height={50}
            className="object-contain md:w-[100px]"
            priority
          />
          <span className={`text-lg md:text-xl font-serif tracking-[0.15em] uppercase transition-colors duration-300
                          ${isSolid ? 'text-green-900' : 'text-green-50'}`}>
            Pewiri Emeralds
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`uppercase tracking-[0.2em] transition-colors duration-300 ${pathname === link.href
                ? 'text-green-400 font-bold'
                : `${textColor} ${hoverColor}`
                }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`border px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${isSolid
              ? 'border-green-800 text-green-800 hover:bg-green-800 hover:text-white'
              : 'border-green-200 text-green-100 hover:bg-green-100 hover:text-green-900'
              }`}
          >
            Contacto
          </Link>
        </div>

        <button
          className={`md:hidden z-[101] p-2 transition-colors ${isOpen ? 'text-green-900' : textColor}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        <div className={`
          fixed inset-0 w-full h-screen bg-green-50 z-[100] flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden
          ${isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'}
        `}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl uppercase tracking-[0.3em] ${pathname === link.href ? 'text-green-300 font-bold' : 'text-green-700'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 border border-green-800 px-12 py-3 uppercase tracking-widest text-green-800"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
