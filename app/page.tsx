"use client";

import { Hero } from "@/components/Hero";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [viewportHeight, setViewportHeight] = useState(800); // Default fallback value
  const [isClient, setIsClient] = useState(false);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number>();

  const images = [
    // First wave (0-5) - well spaced positions
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Mountain",
      speed: 0.5,
      position: "top-[10%] left-[5%]",
      wave: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      alt: "Forest",
      speed: 1.2,
      position: "top-[15%] right-[5%]",
      wave: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      alt: "Ocean",
      speed: 0.8,
      position: "top-[35%] left-[70%]",
      wave: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      alt: "Desert",
      speed: 1.6,
      position: "top-[55%] left-[10%]",
      wave: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      alt: "Space",
      speed: 1.0,
      position: "top-[25%] left-[40%]",
      wave: 1,
    },
    // Second wave (now starts with City)
    {
      src: "https://images.unsplash.com/photo-1464822759844-d150ad6caacc?w=400&h=300&fit=crop",
      alt: "City",
      speed: 0.3,
      position: "top-[45%] right-[15%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      alt: "Nature",
      speed: 0.7,
      position: "top-[8%] left-[15%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
      alt: "Sunset",
      speed: 1.4,
      position: "top-[12%] right-[10%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
      alt: "Waterfall",
      speed: 1.1,
      position: "top-[42%] left-[25%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
      alt: "Lake",
      speed: 0.9,
      position: "top-[48%] right-[8%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Valley",
      speed: 1.3,
      position: "top-[62%] left-[45%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      alt: "Clouds",
      speed: 1.4,
      position: "top-[68%] left-[8%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      alt: "Galaxy",
      speed: 1.5,
      position: "top-[55%] right-[20%]",
      wave: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      alt: "Trees",
      speed: 0.8,
      position: "top-[60%] left-[35%]",
      wave: 2,
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

    // Detect scroll direction
    if (targetScrollY.current > lastScrollY.current) {
      setScrollDirection("down");
    } else if (targetScrollY.current < lastScrollY.current) {
      setScrollDirection("up");
    }
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
    // Set client-side flag and viewport height
    setIsClient(true);
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
    // Use the state value instead of directly accessing window.innerHeight
    // But also check if we're on the client side
    const safeViewportHeight = typeof window !== 'undefined' ? viewportHeight : 800;
    const totalMovementRange = safeViewportHeight * 3.0;
    const easedScrollPercent = easeInOutCubic(scrollProgress);

    // Different starting positions for each wave - start much closer to viewport
    let baseOffset = safeViewportHeight * 0.3; // Much closer to viewport for immediate visibility
    if (wave === 2) {
      baseOffset = safeViewportHeight * 1.8; // Reduced gap between waves
    }

    const translateY = baseOffset - easedScrollPercent * totalMovementRange * speed;

    const distanceFromCenter = Math.abs(translateY) / (safeViewportHeight / 2);
    const scale = Math.max(0.8, 1 - distanceFromCenter * 0.1 * scrollProgress);

    // Smooth opacity transition based on scroll progress and position
    const opacity = Math.max(0, Math.min(1, 1 - (Math.abs(translateY) / (safeViewportHeight * 2))));

    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      filter: `blur(${Math.min(scrollProgress * speed * 0.5, 2)}px)`,
      opacity: opacity,
    };
  };

  // Don't render the simplified version - always render the full component
  // but protect window access within functions
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950 flex flex-col justify-start items-center text-white text-center pt-20">
        {/* Background Parallax Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
              transform: `translateY(${scrollProgress * 100}px)`,
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2,
              transform: `translateY(${scrollProgress * 50}px)`,
            }}
          />
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
          style={{
            transform: `translateY(${scrollProgress * 30}px)`, // Much slower exit speed
            opacity: Math.max(0, 1 - scrollProgress * 2), // Slower fade out
          }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            Welcome to our Media Gallery
          </h1>
          <p className="text-lg md:text-xl text-neutral-300">
            Explore our curated collection of premium images
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            transform: `translateX(-50%) translateY(${scrollProgress * 20}px)`, // Slower exit for scroll indicator
            opacity: Math.max(0, 1 - scrollProgress * 3), // Fade out scroll indicator
          }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-neutral-400 mb-2">Scroll to Explore</p>
            <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Parallax Scroll Section */}
      <div className="relative">
        {/* Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neutral-400 via-neutral-500 via-neutral-600 to-neutral-700 z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        {/* Main Container */}
        <div
          className="relative"
          style={{ minHeight: `${images.length * 120}vh` }}
        >
          <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
            {/* Static Icon Notification */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full animate-pulse" />
                
                {/* Icon */}
                <div className="relative bg-black/30 backdrop-blur-md p-4 rounded-full border border-white/10 shadow-2xl">
                  <svg 
                    className="w-6 h-6 text-white animate-bounce" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Images - Now always visible for smooth transition */}
            <div className="absolute w-full h-full">
              {images.map((image, index) => (
                <Link
                  key={index}
                  href={`/image/${image.alt.toLowerCase()}`}
                  className={`absolute w-64 h-44 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-100 ease-out ${image.position} hover:scale-105 hover:z-50`}
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
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-semibold capitalize">{image.alt}</h3>
                      <p className="text-sm">Click to view details</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-neutral-900 py-10 mt-0 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Luxury Media Library &mdash; Crafted for elegance and experience.
          </p>
        </div>
      </footer>
    </main>
  );
}