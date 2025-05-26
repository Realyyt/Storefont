"use client";

import { useScroll, motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({
  className,
  color = "bg-primary",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  
  // Add spring physics to the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className={cn("fixed top-0 left-0 right-0 h-[3px] origin-[0%] z-50", color, className)}
      style={{ scaleX }}
    />
  );
}