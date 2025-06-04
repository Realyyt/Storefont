"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// This would typically come from a database or API
const images = [
  {
    id: "mountain",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Mountain",
    description: "A breathtaking view of majestic mountains reaching towards the sky.",
  },
  {
    id: "forest",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    alt: "Forest",
    description: "A serene forest landscape with lush greenery and natural beauty.",
  },
  {
    id: "ocean",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    alt: "Ocean",
    description: "The vast and beautiful ocean stretching to the horizon.",
  },
  {
    id: "desert",
    src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
    alt: "Desert",
    description: "The golden sands of the desert under a clear blue sky.",
  },
  {
    id: "space",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    alt: "Space",
    description: "A mesmerizing view of the cosmos and distant galaxies.",
  },
  {
    id: "city",
    src: "https://images.unsplash.com/photo-1464822759844-d150ad6caacc?w=400&h=300&fit=crop",
    alt: "City",
    description: "The vibrant cityscape with modern architecture and urban life.",
  },
  {
    id: "nature",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    alt: "Nature",
    description: "A peaceful natural landscape showcasing Earth's beauty.",
  },
  {
    id: "sunset",
    src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
    alt: "Sunset",
    description: "A stunning sunset painting the sky in warm colors.",
  },
  {
    id: "waterfall",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
    alt: "Waterfall",
    description: "A powerful waterfall cascading down rocky cliffs.",
  },
  {
    id: "lake",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    alt: "Lake",
    description: "A tranquil lake reflecting the surrounding landscape.",
  },
  {
    id: "valley",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Valley",
    description: "A picturesque valley surrounded by mountains.",
  },
  {
    id: "clouds",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    alt: "Clouds",
    description: "Beautiful cloud formations in the sky.",
  },
  {
    id: "galaxy",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    alt: "Galaxy",
    description: "A stunning view of a distant galaxy in space.",
  },
  {
    id: "trees",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    alt: "Trees",
    description: "A peaceful grove of trees in their natural habitat.",
  },
];

export default function ImagePage() {
  const params = useParams();
  const imageId = params.id as string;
  const image = images.find(img => img.id === imageId);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!image) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-900 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Image Not Found
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
              Return to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-neutral-900 relative overflow-hidden"
    >
      {/* Elegant background animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
              'linear-gradient(225deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
              'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Back button with animation */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-8 h-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center justify-center w-full h-full text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
          >
            <motion.span
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              ←
            </motion.span>
          </Link>
        </motion.div>
        
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
          {/* Image container with parallax effect */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
              onLoad={() => setIsLoaded(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 50vw"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              className="absolute inset-0 bg-neutral-800"
            />
          </motion.div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white px-2 sm:px-4 md:px-0"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 capitalize"
            >
              {image.alt}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-neutral-300 text-base sm:text-lg leading-relaxed"
            >
              {image.description}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
} 