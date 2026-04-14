'use client';

import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { blogService } from '@/services/blogService';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBlog();
    }
  }, [id]);

  const loadBlog = async () => {
    try {
      const response = await blogService.getBlogById(id);
      if (response.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      toast.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="text-center py-12">Blog not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {blog.imageUrl && (
              <div className="mb-8 rounded-lg overflow-hidden shadow">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            <article className="bg-white rounded-lg shadow p-8">
              <h1 className="text-4xl font-bold text-mm-primary mb-4">{blog.title}</h1>

              <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-8">
                <div>
                  <p className="font-semibold text-mm-dark">{blog.author?.name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Shared!')}
                  className="text-mm-primary font-semibold hover:text-mm-accent transition"
                >
                  Share this article
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
