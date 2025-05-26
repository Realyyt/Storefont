"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  intensity?: number;
  size?: 'small' | 'medium' | 'large';
}

export function ScrollSection({
  children,
  className,
  reverse = false,
  intensity = 0.1,
  size = 'medium',
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate speed multipliers based on size - adjusted for smoother movement
  const speedMultiplier = {
    small: 2.5,    // Fastest movement
    medium: 1.2,   // Medium movement
    large: 0.4     // Slowest movement
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
    [0, reverse ? -150 * intensity * speedMultiplier : 150 * intensity * speedMultiplier]
  );

  // Subtle scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.98, 1.02, 0.98]
  );

  // Smooth opacity transition
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative overflow-visible", // Changed to visible for overlapping effect
        size === 'small' ? 'z-30' :
        size === 'medium' ? 'z-20' :
        'z-10',
        className
      )}
    >
      <motion.div 
        style={{ 
          y: yValue,
          x: xValue,
          scale,
          opacity
        }}
        className="w-full h-full transition-all duration-500 ease-out"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}