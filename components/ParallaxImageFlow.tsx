"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImage {
  src: string;
  alt: string;
  speed: number;
  position: string;
  wave: number;
}

interface ParallaxImageFlowProps {
  images: ParallaxImage[];
  className?: string;
}

export function ParallaxImageFlow({ images, className }: ParallaxImageFlowProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number>();

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const updateAnimations = () => {
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
    animate();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const getImageTransform = (speed: number, wave: number) => {
    const viewportHeight = window.innerHeight;
    const totalMovementRange = viewportHeight * 3.0;
    const easedScrollPercent = easeInOutCubic(scrollProgress);

    // Different starting positions for each wave
    let baseOffset = viewportHeight * 1.0;
    if (wave === 2) {
      baseOffset = viewportHeight * 2.5;
    }

    const translateY = baseOffset - easedScrollPercent * totalMovementRange * speed;

    const distanceFromCenter = Math.abs(translateY) / (viewportHeight / 2);
    const scale = Math.max(0.8, 1 - distanceFromCenter * 0.1 * scrollProgress);

    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      filter: `blur(${Math.min(scrollProgress * speed * 0.5, 2)}px)`,
    };
  };

  return (
    <div className={cn("relative", className)}>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-400 via-purple-500 via-cyan-400 to-yellow-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Main Container */}
      <div className="h-[900vh] relative">
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900">
          {/* Title */}
          <div
            className="fixed top-12 left-1/2 text-white text-5xl font-bold text-center z-30 transition-all duration-100 ease-out"
            style={{
              transform: `translate(-50%, ${-easeInOutCubic(scrollProgress) * 200}px)`,
              opacity: Math.max(0.1, 1 - scrollProgress * 1.2),
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Smooth Parallax Flow
          </div>

          {/* Speed Indicator */}
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 text-white/70 text-lg z-30 text-center">
            {images.length} images in {Math.max(...images.map(img => img.wave))} waves
          </div>

          {/* Scroll Direction */}
          <div className="fixed top-40 left-1/2 transform -translate-x-1/2 text-white/50 text-base z-30 text-center">
            {scrollDirection === "down" ? "↓ Scrolling Down" : "↑ Scrolling Up"}
          </div>

          {/* Images */}
          <div className="absolute w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute w-64 h-44 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-100 ease-out ${image.position}`}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 