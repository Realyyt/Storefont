"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export function AnimatedText({
  children,
  className,
  delay = 0,
  as = "p",
}: AnimatedTextProps) {
  const { ref, isInView, variants } = useScrollAnimation("up", delay);
  
  const Component = motion[as];
  
  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}