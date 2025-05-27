'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageGalleryManager from '@/components/admin/ImageGalleryManager';
import ContentManager from '@/components/admin/ContentManager';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/admin/login');
            }}
            className="text-sm text-black hover:text-gray-700 transition-colors"
          >
            Sign out
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'gallery'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-700 hover:text-black hover:border-gray-300'
                }`}
              >
                Image Gallery
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'content'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-700 hover:text-black hover:border-gray-300'
                }`}
              >
                Content Management
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'gallery' && <ImageGalleryManager />}
            {activeTab === 'content' && <ContentManager />}
          </div>
        </div>
      </div>
    </div>
  );
} 