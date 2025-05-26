"use client";

import { Hero } from "@/components/Hero";
import { ImageGallery } from "@/components/ImageGallery";
import { AnimatedText } from "@/components/AnimatedText";
import { galleryImages } from "@/data/gallery";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleImageClick = (index: number) => {
    router.push(`/product/${index}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      <Hero
        title="Luxury Fashion Boutique"
        subtitle="Discover our exclusive collection of designer clothing, shoes, and accessories. Each piece is carefully curated to elevate your style."
      />
      
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 bg-background">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <AnimatedText as="h2" className="text-3xl md:text-4xl font-bold mb-6 text-foreground" delay={0.1}>
            Curated Designer Collection
          </AnimatedText>
          <AnimatedText as="p" className="text-lg text-muted-foreground" delay={0.2}>
            Explore our handpicked selection of luxury fashion pieces. From designer shoes to statement accessories,
            each item is crafted with exceptional quality and attention to detail. Click on any piece to view details and availability.
          </AnimatedText>
        </div>
        
        <ImageGallery 
          images={galleryImages} 
          onImageClick={handleImageClick}
        />
      </section>
      
      <footer className="w-full bg-muted py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AnimatedText as="p" className="text-sm text-muted-foreground" delay={0.1}>
            Luxury Fashion • Worldwide Shipping • Personal Styling Available • Exclusive Collections
          </AnimatedText>
        </div>
      </footer>
    </main>
  );
}