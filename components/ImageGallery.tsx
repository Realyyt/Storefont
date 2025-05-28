"use client";

import { AnimatedImage } from "@/components/AnimatedImage";
import { ScrollSection } from "@/components/ScrollSection";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay: number;
  intensity?: number;
  price?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

interface ImageGalleryProps {
  images: GalleryItem[];
  className?: string;
  columns?: number;
  gap?: number;
  onImageClick?: (index: number) => void;
  isCuratedSection?: boolean;
}

export function ImageGallery({
  images,
  className,
  columns = 3,
  gap = 4,
  onImageClick,
  isCuratedSection = false,
}: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Masonry/column layout: no manual column splitting
  return (
    <div
      ref={containerRef}
      className={cn(
        `columns-1 sm:columns-2 lg:columns-${columns} gap-${gap} bg-background px-4 md:px-6 lg:px-8`,
        className
      )}
    >
      {images.map((image, idx) => {
        const imageRef = useRef<HTMLDivElement>(null);
        const isInView = useInView(imageRef, {
          margin: "-20% 0px -20% 0px",
          once: false,
        });
        const size = image.size || (
          idx % 4 === 0 ? 'large' :
          idx % 3 === 0 ? 'medium' :
          'small'
        );
        return (
          <div
            key={idx}
            className="mb-8 break-inside-avoid"
          >
            <ScrollSection
              reverse={idx % 2 === 0}
              intensity={image.intensity || 0.12}
              size={size}
              isCuratedSection={isCuratedSection}
            >
              <div
                ref={imageRef}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group",
                  size === 'large' ? "max-w-[100%] md:max-w-[95%] lg:max-w-[100%] mx-auto" :
                  size === 'medium' ? "max-w-[90%] md:max-w-[85%] lg:max-w-[90%] mx-auto" :
                  "max-w-[80%] md:max-w-[75%] lg:max-w-[80%] mx-auto"
                )}
                onClick={() => onImageClick?.(idx)}
              >
                <motion.div
                  style={{
                    filter: useTransform(
                      () => isInView ? "grayscale(0%)" : "grayscale(100%)"
                    ),
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <AnimatedImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    delay={image.delay}
                    className={cn(
                      "w-full h-auto shadow-lg rounded-2xl bg-card transition-all duration-500",
                      size === 'large' ? "aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/5]" :
                      size === 'medium' ? "aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4]" :
                      "aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3]"
                    )}
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                </motion.div>
                <div className="mt-3 sm:mt-4 text-center transform transition-transform duration-300 group-hover:translate-y-1">
                  <h3 className="font-semibold text-base sm:text-lg md:text-xl text-foreground">{image.alt}</h3>
                  {image.price && (
                    <p className="text-primary font-medium text-sm sm:text-base mt-1">{image.price}</p>
                  )}
                  {image.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            </ScrollSection>
          </div>
        );
      })}
    </div>
  );
}