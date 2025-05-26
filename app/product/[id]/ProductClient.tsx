"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import Link from "next/link";

interface Product {
  src: string;
  alt: string;
  price: string;
  description: string;
}

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  return (
    <main className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
      >
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          ← Back to Gallery
        </Link>

        <div className="grid grid-cols-3 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={product.src}
              alt={product.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <AnimatedText as="h1" className="text-4xl font-bold mb-4">
                {product.alt}
              </AnimatedText>
              <AnimatedText as="p" className="text-2xl font-bold text-primary mb-6">
                {product.price}
              </AnimatedText>
            </div>

            <div className="space-y-4">
              <AnimatedText as="h2" className="text-xl font-semibold">
                Description
              </AnimatedText>
              <AnimatedText as="p" className="text-muted-foreground">
                {product.description}
              </AnimatedText>
            </div>

            <div className="space-y-4">
              <AnimatedText as="h2" className="text-xl font-semibold">
                Product Details
              </AnimatedText>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Premium quality archival print</li>
                <li>• Available in multiple sizes</li>
                <li>• Certificate of authenticity included</li>
                <li>• Free worldwide shipping</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold opacity-50 cursor-not-allowed"
              disabled
            >
              Coming Soon
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 