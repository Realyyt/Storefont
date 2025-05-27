import Image from 'next/image'
import { notFound } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  // For now, we'll just show a simple page template
  // You can replace this with your own content management solution
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
          </h1>
          <p className="text-xl">Welcome to our page</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Page</h2>
            <p className="text-lg text-gray-600">
              This is a placeholder page. You can replace this content with your own content management solution.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
} 