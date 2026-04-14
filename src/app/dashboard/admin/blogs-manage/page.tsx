'use client';

import { useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { blogService } from '@/services/blogService';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import toast from 'react-hot-toast';

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await blogService.updateBlog(editingId, formData);
        toast.success('Blog updated successfully!');
      } else {
        await blogService.createBlog(formData);
        toast.success('Blog created successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '', imageUrl: '' });
      loadBlogs();
    } catch (error) {
      toast.error('Failed to save blog');
    }
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl || '',
    });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return;

    try {
      await blogService.deleteBlog(id);
      toast.success('Blog deleted!');
      loadBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  return (
    <AuthGuard requiredRole={['admin', 'content_manager']}>
      <DashboardLayout>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-mm-primary">Manage Blogs</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setFormData({ title: '', content: '', imageUrl: '' });
                }
              }}
              className="bg-mm-primary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90"
            >
              {showForm ? 'Cancel' : 'New Blog'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
              <input
                type="text"
                placeholder="Blog Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary mb-4"
              />

              <textarea
                placeholder="Blog Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary mb-4"
              />

              <input
                type="url"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary mb-6"
              />

              <button
                type="submit"
                className="bg-mm-secondary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No blogs yet</div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white p-6 rounded-lg shadow flex justify-between items-start gap-4"
                >
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-32 h-32 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-mm-primary">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-1 line-clamp-2">{blog.content}</p>
                    <p className="text-sm text-gray-500">
                      By {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-mm-accent text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-mm-error text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
