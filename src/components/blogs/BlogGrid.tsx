'use client';

import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { blogService } from '@/services/blogService';
import BlogCard from './BlogCard';
import toast from 'react-hot-toast';

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await blogService.getAllBlogs();
      if (response.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mm-primary"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return <div className="text-center py-12 text-gray-500">No blogs available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
