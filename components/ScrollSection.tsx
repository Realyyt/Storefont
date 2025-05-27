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
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (isCuratedSection) {
      const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        controls.start({
          y: `${direction * 100}%`,
          transition: { duration: 0.5, ease: "easeInOut" }
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

  // Enhanced scale effect for better passing illusion
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.98, 1.02, 1.02, 0.98]
  );

  // Enhanced opacity transition for better depth
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative",
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
          willChange: 'transform'
        }}
        className={cn(
          "w-full h-full transition-all duration-700 ease-out",
          isCuratedSection && "flex flex-col items-center justify-center"
        )}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}