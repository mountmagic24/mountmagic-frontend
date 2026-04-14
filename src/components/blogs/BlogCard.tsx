'use client';

import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {blog.imageUrl && (
        <div className="h-48 bg-gray-300 overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-mm-primary mb-2 line-clamp-2">{blog.title}</h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <span>{blog.author?.name}</span>
          <span>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.content.substring(0, 120)}...</p>
        
        <Link
          href={`/blogs/${blog._id}`}
          className="inline-block text-mm-primary font-semibold hover:text-mm-accent transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
