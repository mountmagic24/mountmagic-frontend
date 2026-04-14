import { useEffect, useState } from 'react';
import { blogService } from '../../services/blogService';
import LoadingSpinner from '../common/LoadingSpinner';
import BlogCard from './BlogCard';

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    blogService
      .getAllBlogs()
      .then((response) => {
        setBlogs(response?.data?.blogs || []);
      })
      .catch(() => {
        setError('Failed to load blogs');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!blogs.length) {
    return <p className="text-gray-600">No blogs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}