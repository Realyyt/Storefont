"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Hero({ title, subtitle, className }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 bg-background",
        className
      )}
      style={{ opacity, scale, y }}
    >
      <AnimatedText
        as="h1"
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-5xl mb-6 text-foreground"
        delay={0.1}
      >
        {title}
      </AnimatedText>
      
      <AnimatedText
        as="p"
        className="text-xl md:text-2xl font-light max-w-2xl text-muted-foreground"
        delay={0.3}
      >
        {subtitle}
      </AnimatedText>
      
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ 
                y: [0, 14, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}