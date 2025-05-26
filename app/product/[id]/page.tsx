import { ProductClient } from "./ProductClient";
import { galleryImages } from "@/data/gallery";

export function generateStaticParams() {
  return galleryImages.map((_, index) => ({
    id: index.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const product = galleryImages[productId];

  if (!product) {
    return null;
  }

  return <ProductClient product={product} />;
} 