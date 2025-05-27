'use client';

import { useState, useEffect } from 'react';

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription: string;
}

export default function ContentManager() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/pages');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handlePageUpdate = async (id: string, updates: Partial<PageContent>) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedPage = await response.json();
      setPages(pages.map(page => page.id === id ? updatedPage : page));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Content Management</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{page.title}</h3>
                <p className="text-sm text-gray-500 mt-1">/{page.slug}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPage(page);
                  setIsEditing(true);
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedPage && isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <h3 className="text-lg font-medium mb-4">Edit Page Content</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handlePageUpdate(selectedPage.id, {
                  title: formData.get('title') as string,
                  content: formData.get('content') as string,
                  metaDescription: formData.get('metaDescription') as string,
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedPage.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    defaultValue={selectedPage.metaDescription}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    name="content"
                    defaultValue={selectedPage.content}
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedPage(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 