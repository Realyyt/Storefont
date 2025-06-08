"use client";

import { Hero } from "@/components/Hero";
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800); // Default fallback value
  const [menuOpen, setMenuOpen] = useState(false);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number>();

  const images = [
    // First wave (0-5) - well spaced positions
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Mountain",
      speed: 1.5,
      position: "top-[52%] left-[5%] sm:left-[5%] md:left-[8%]",
      wave: 1,
      size: "large",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      alt: "Forest",
      speed: 3.6,
      position: "top-[38%] right-[5%] sm:right-[5%] md:right-[8%]",
      wave: 1,
      size: "medium",
    },
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      alt: "Desert",
      speed: 4.8,
      position: "top-[91%] left-[5%] sm:left-[5%] md:left-[10%]",
      wave: 1,
      size: "medium",
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      alt: "Space",
      speed: 3.0,
      position: "top-[104%] left-[30%] sm:left-[35%] md:left-[40%]",
      wave: 1,
      size: "large",
    },
    // Second wave
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      alt: "Nature",
      speed: 0.7,
      position: "top-[130%] left-[5%] sm:left-[5%] md:left-[10%]",
      wave: 2,
      size: "medium",
    },
    {
      src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
      alt: "Sunset",
      speed: 1.4,
      position: "top-[130%] right-[5%] sm:right-[10%] md:right-[15%]",
      wave: 2,
      size: "large",
    },
    {
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
      alt: "Waterfall",
      speed: 1.1,
      position: "top-[145%] left-[5%] sm:left-[20%] md:left-[25%]",
      wave: 2,
      size: "medium",
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
      alt: "Lake",
      speed: 0.9,
      position: "top-[145%] right-[5%] sm:right-[15%] md:right-[20%]",
      wave: 2,
      size: "medium",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      alt: "Clouds",
      speed: 1.4,
      position: "top-[160%] right-[5%] sm:right-[25%] md:right-[30%]",
      wave: 2,
      size: "large",
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      alt: "Galaxy",
      speed: 1.5,
      position: "top-[175%] left-[5%] sm:left-[15%] md:left-[20%]",
      wave: 2,
      size: "large",
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      alt: "Trees",
      speed: 0.8,
      position: "top-[175%] right-[5%] sm:right-[5%] md:right-[10%]",
      wave: 2,
      size: "medium",
    },
    // Ocean image moved here
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      alt: "Ocean",
      speed: 2.4,
      position: "top-[190%] left-[10%] sm:left-[20%] md:left-[30%]",
      wave: 3,
      size: "medium",
    },
    // Bridge image
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
      alt: "Bridge",
      speed: 2.0,
      position: "top-[200%] right-[10%] sm:right-[20%] md:right-[30%]",
      wave: 3,
      size: "large",
    },
  ];

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const updateAnimations = () => {
    if (typeof window === 'undefined') return;
    
    const scrollSmoothness = 0.08;
    targetScrollY.current = window.pageYOffset;

    // Smooth scroll interpolation
    currentScrollY.current += (targetScrollY.current - currentScrollY.current) * scrollSmoothness;

    // Update last scroll position
    lastScrollY.current = targetScrollY.current;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(currentScrollY.current / docHeight, 1);
    setScrollProgress(scrollPercent);
  };

  const animate = () => {
    updateAnimations();
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);

      // Update viewport height on resize
      const handleResize = () => {
        setViewportHeight(window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      animate();
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, []);

  const getImageTransform = (speed: number, wave: number) => {
    const safeViewportHeight = typeof window !== 'undefined' ? viewportHeight : 800;
    const totalMovementRange = safeViewportHeight * 2.0;
    const easedScrollPercent = easeInOutCubic(scrollProgress);

    // Create continuous wave effect with welcome text as part of the flow
    let baseOffset = safeViewportHeight * 0.05; // Start even closer to viewport
    if (wave === 1) {
      baseOffset = safeViewportHeight * 0.32; // Push wave 1 images further down
    }
    if (wave === 2) {
      baseOffset = safeViewportHeight * 0.45; // Start wave 2 closer to the middle of the page
    }

    const translateY = baseOffset - easedScrollPercent * totalMovementRange * speed;

    const distanceFromCenter = Math.abs(translateY) / (safeViewportHeight / 2);
    const scale = Math.max(0.8, 1 - distanceFromCenter * 0.1 * scrollProgress);

    // Smoother opacity transition for continuous flow
    const opacity = 1;

    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      filter: `blur(0px)`,
      opacity: opacity,
    };
  };

  // Add a header with logo, nav, and cart
  // Header
  const Header = () => (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-gradient-to-b from-black/60 via-black/30 to-transparent">
      {/* Logo (left) */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">NUTAH</span>
        </Link>
      </div>
      {/* Navigation (center, hidden on mobile) */}
      <nav className="hidden sm:flex flex-1 justify-center gap-4 md:gap-8 text-white text-sm md:text-base lg:text-lg">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/commune">Commune</Link>
      </nav>
      {/* Cart Icon (right, hidden on mobile) */}
      <div className="hidden sm:flex flex-1 justify-end">
        <Link href="/cart" className="relative group">
          <span className="inline-block p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.2 15.607a2.25 2.25 0 0 0 2.197 1.743h7.206a2.25 2.25 0 0 0 2.197-1.743l1.097-8.335H5.106zm3.443 12.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25zm7.5 0a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25z" />
            </svg>
          </span>
        </Link>
      </div>
      {/* Mobile Menu Button (rightmost on mobile) */}
      <div className="sm:hidden flex flex-1 justify-end">
        <button
          className="text-white focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] flex"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu Panel */}
            <div className="ml-auto w-4/5 max-w-xs h-full bg-neutral-900 shadow-2xl flex flex-col py-10 px-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="flex flex-col gap-8 mt-8 text-white text-xl font-semibold">
                <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">Home</Link>
                <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">Shop</Link>
                <Link href="/commune" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">Commune</Link>
              </nav>
              {/* Cart Icon - next row after nav */}
              <div className="mt-8">
                <Link href="/cart" onClick={() => setMenuOpen(false)} className="relative group">
                  <span className="inline-block p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.2 15.607a2.25 2.25 0 0 0 2.197 1.743h7.206a2.25 2.25 0 0 0 2.197-1.743l1.097-8.335H5.106zm3.443 12.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25zm7.5 0a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25z" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  // Don't render the simplified version - always render the full component
  // but protect window access within functions
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-background">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950 flex flex-col justify-center items-center text-white text-center">
          {/* Central Logo (large) */}
          <div className="relative z-20 flex flex-col items-center justify-center mb-4 sm:mb-8">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent drop-shadow-lg select-none">NUTAH</span>
          </div>
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 text-center max-w-3xl mx-auto px-4"
            style={{
              transform: `translate3d(0, ${scrollProgress * 300 * 1.5}px, 0)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.2),
              filter: `blur(${Math.min(scrollProgress * 0.3, 1.5)}px)`,
            }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Welcome to our Media Gallery
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 mb-6 sm:mb-8">
              Explore our premium curated collection 
            </p>
            <Link 
              href="/shop" 
              className="inline-block px-6 py-1.5 sm:px-10 sm:py-2.5 bg-white text-neutral-900 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 hover:bg-neutral-200 hover:scale-105 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </section>
        {/* Parallax Scroll Section */}
        <div className="relative">
          {/* Main Container */}
          <div
            className="relative"
            style={{ minHeight: `100vh` }}
          >
            <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
              {/* Images - Now always visible for smooth transition */}
              <div className="absolute w-full h-full">
                {images.map((image, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/image/${image.alt.toLowerCase()}`}
                      className={`absolute ${
                        image.size === 'small' 
                          ? 'w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-36' 
                          : image.size === 'medium' 
                            ? 'w-32 h-20 sm:w-40 sm:h-28 md:w-72 md:h-48' 
                            : 'w-40 h-28 sm:w-56 sm:h-36 md:w-96 md:h-64'
                      } rounded-2xl overflow-hidden shadow-2xl transition-transform duration-75 ease-out ${image.position} hover:scale-105 hover:z-50`}
                      style={{
                        ...getImageTransform(image.speed, image.wave),
                        willChange: "transform",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-end">
                        <div className="p-2 sm:p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-neutral-900 text-white py-6 sm:py-8 border-t border-neutral-800 z-50 relative">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">NUTAH</span>
          </div>
          {/* Contact Info */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="font-bold text-sm sm:text-base md:text-lg mb-1">Contact Us</div>
            <div className="text-xs sm:text-sm md:text-base">Email: <a href="mailto:nutah@gmail.com" className="underline hover:text-blue-400">nutah@gmail.com</a></div>
            <div className="text-xs sm:text-sm md:text-base">Phone: <a href="tel:+91234567890" className="underline hover:text-blue-400">+91 234 567 890</a></div>
            <div className="text-xs sm:text-sm md:text-base">123 Main St, Mumbai, India</div>
          </div>
          {/* Socials */}
          <div className="flex-1 flex justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 3.5zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-neutral-400 mt-4 sm:mt-6">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</div>
      </footer>
    </>
  );
}