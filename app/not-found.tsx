import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page not found</h2>
      <p className="text-muted-foreground mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}