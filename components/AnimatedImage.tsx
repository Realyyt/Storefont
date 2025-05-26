"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useImageParallax } from "@/lib/animation";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  delay?: number;
  intensity?: number; // 0-1 value for animation intensity
  priority?: boolean;
}

export function AnimatedImage({
  src,
  alt,
  className,
  width = 800,
  height = 600,
  delay = 0,
  intensity = 0.5,
  priority = false,
}: AnimatedImageProps) {
  const { ref, y, opacity, scale } = useImageParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a delay to trigger animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden rounded-2xl", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ 
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
        delay: delay * 0.2
      }}
    >
      <motion.div
        style={{ 
          y: y, 
          scale, 
          opacity 
        }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
          priority={priority}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </motion.div>
  );
}