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

  // Split images into columns
  const columnsArray = Array.from({ length: columns }, () => [] as GalleryItem[]);
  
  images.forEach((image, index) => {
    columnsArray[index % columns].push(image);
  });

  return (
    <div ref={containerRef} className={cn(
      "grid grid-cols-3 gap-8 md:gap-12 lg:gap-16 bg-background relative",
      isCuratedSection && "h-screen",
      className
    )}>
      {columnsArray.map((columnImages, columnIndex) => (
        <div 
          key={`column-${columnIndex}`} 
          className={cn(
            "flex flex-col gap-12 md:gap-16 lg:gap-20 relative",
            columnIndex === 0 ? "mt-0" : 
            columnIndex === 1 ? "mt-12 md:mt-16 lg:mt-20" :
            "mt-24 md:mt-32 lg:mt-40"
          )}
        >
          {columnIndex === 1 ? (
            // Middle column with centered text
            <div className="relative flex-1 min-h-[80vh]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                viewport={{ once: true, margin: "-20% 0px" }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground">
                  Classy
                </h2>
              </motion.div>
            </div>
          ) : (
            // Side columns with images
            columnImages.map((image, imageIndex) => {
              const globalIndex = columnIndex + (imageIndex * columns);
              const imageRef = useRef<HTMLDivElement>(null);
              const isInView = useInView(imageRef, {
                margin: "-30% 0px -30% 0px",
                once: false,
              });
              
              const size = image.size || (
                (columnIndex + imageIndex) % 3 === 0 ? 'large' :
                (columnIndex + imageIndex) % 3 === 1 ? 'medium' :
                'small'
              );
              
              return (
                <ScrollSection 
                  key={`image-${columnIndex}-${imageIndex}`}
                  reverse={columnIndex % 2 === 0}
                  intensity={image.intensity || 0.15 + (columnIndex * 0.03)}
                  size={size}
                  isCuratedSection={isCuratedSection}
                >
                  <div 
                    ref={imageRef}
                    className={cn(
                      "cursor-pointer transition-transform hover:scale-[1.02] relative",
                      size === 'large' ? "max-w-[95%] md:max-w-[90%] lg:max-w-[95%] mx-auto" :
                      size === 'medium' ? "max-w-[85%] md:max-w-[80%] lg:max-w-[85%] mx-auto" :
                      "max-w-[75%] md:max-w-[70%] lg:max-w-[75%] mx-auto"
                    )}
                    onClick={() => onImageClick?.(globalIndex)}
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
                        delay={image.delay + (columnIndex * 0.1)}
                        className={cn(
                          "w-full h-auto shadow-lg rounded-2xl bg-card transition-all duration-500",
                          size === 'large' ? "aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/5]" :
                          size === 'medium' ? "aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4]" :
                          "aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3]"
                        )}
                        priority={columnIndex === 0 && imageIndex === 0}
                      />
                    </motion.div>
                    <div className="mt-2 sm:mt-4 text-center">
                      <h3 className="font-semibold text-base sm:text-lg md:text-xl text-foreground">{image.alt}</h3>
                      {image.price && (
                        <p className="text-primary font-medium text-sm sm:text-base mt-1">{image.price}</p>
                      )}
                      {image.description && (
                        <p className="text-muted-foreground text-sm mt-1">{image.description}</p>
                      )}
                    </div>
                  </div>
                </ScrollSection>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}