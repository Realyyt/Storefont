'use client';

import { useState, useEffect } from 'react';

interface Content {
  id: string;
  page: string;
  section: string;
  content: string;
}

export default function ContentManager() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/content');
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContents(data);
    } catch (error) {
      setError('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
  };

  const handleSave = async () => {
    if (!editingContent) return;

    try {
      const response = await fetch(`/api/content/${editingContent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingContent),
      });

      if (!response.ok) throw new Error('Failed to update content');

      setContents(
        contents.map((content) =>
          content.id === editingContent.id ? editingContent : content
        )
      );
      setEditingContent(null);
    } catch (error) {
      setError('Failed to update content');
    }
  };

  const handleCancel = () => {
    setEditingContent(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-black mb-4">Page Content</h3>
        <div className="space-y-6">
          {contents.map((content) => (
            <div key={content.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-black">
                  {content.page} - {content.section}
                </h4>
                {!editingContent && (
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-sm text-black hover:text-gray-700"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingContent?.id === content.id ? (
                <div className="space-y-4">
                  <textarea
                    value={editingContent.content}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-black bg-white"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none text-black">
                  {content.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 