"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  intensity?: number;
  size?: 'small' | 'medium' | 'large';
  isCuratedSection?: boolean;
}

export function ScrollSection({
  children,
  className,
  reverse = false,
  intensity = 0.1,
  size = 'medium',
  isCuratedSection = false,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isCuratedSection) {
      const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        controls.start({
          y: `${direction * 100}%`,
          transition: { duration: 0.1, ease: "linear" }
        });
      };

      const element = ref.current;
      if (element) {
        element.addEventListener('wheel', handleScroll, { passive: false });
        return () => element.removeEventListener('wheel', handleScroll);
      }
    }
  }, [isCuratedSection, controls]);

  // Calculate speed multipliers based on size
  const speedMultiplier = {
    small: 2.2,
    medium: 1.5,
    large: 0.8
  }[size];

  // Calculate the parallax movement based on scroll position and size
  const yValue = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, reverse ? -300 * intensity * speedMultiplier : 300 * intensity * speedMultiplier]
  );

  // Add horizontal movement for more dynamic effect
  const xValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reverse ? -80 * intensity * speedMultiplier : 80 * intensity * speedMultiplier]
  );

  // Optimized scale effect for immediate response
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.98, 0.98]
  );

  // Optimized opacity transition for immediate response
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1]
  );

  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative will-change-scroll",
        size === 'small' ? 'z-50' :
        size === 'medium' ? 'z-40' :
        'z-30',
        isCuratedSection && "h-screen overflow-hidden",
        className
      )}
    >
      <motion.div 
        animate={controls}
        style={{ 
          y: isCuratedSection ? undefined : yValue,
          x: isCuratedSection ? undefined : xValue,
          scale: isCuratedSection ? undefined : scale,
          opacity: isCuratedSection ? undefined : opacity,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)'
        }}
        className={cn(
          "w-full h-full",
          isCuratedSection && "flex flex-col items-center justify-center"
        )}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}