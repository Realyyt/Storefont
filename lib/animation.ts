import { useInView } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Custom hook to create scroll-linked animations
export function useScrollAnimation(direction: 'up' | 'down' = 'up', delay: number = 0, threshold: number = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-10% 0px -10% 0px",
    amount: threshold,
  });

  return {
    ref,
    isInView,
    variants: {
      hidden: { 
        opacity: 0, 
        y: direction === 'up' ? 40 : -40,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay,
        },
      },
    },
  };
}

// Custom hook for parallax effect
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [distance, -distance]);
}

// Custom hook for scroll-based animation
export function useScrollBasedAnimation(scrollYProgress: MotionValue<number>, inputRange: number[], outputRange: number[]) {
  return useTransform(scrollYProgress, inputRange, outputRange);
}

// Hook to create spring-based scroll animations
export function useScrollSpring(scrollY: MotionValue<number>) {
  return useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
}

// Custom hook for image parallax
export function useImageParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.05, 0.9]
  );

  return { ref, y, opacity, scale };
}