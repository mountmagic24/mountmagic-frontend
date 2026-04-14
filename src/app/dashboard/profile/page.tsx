'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AuthGuard from '@/components/auth/AuthGuard';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      });

      if (response.success) {
        updateUser(response.data.user);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        setFormData((prev) => ({ ...prev, password: '' }));
      }
    } catch (error: unknown) {
      const err = error as any;
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-mm-primary mb-6">My Profile</h1>

          <div className="bg-white p-6 rounded-lg shadow">
            {!isEditing ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Full Name</p>
                    <p className="text-xl font-semibold text-mm-dark">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <p className="text-xl font-semibold text-mm-dark">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Role</p>
                    <p className="text-xl font-semibold text-mm-dark capitalize">
                      {user?.role?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Member Since</p>
                    <p className="text-xl font-semibold text-mm-dark">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-mm-primary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-mm-dark mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-mm-dark mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-mm-dark mb-2">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mm-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-mm-primary text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 disabled:opacity-50 transition"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user?.name || '', email: user?.email || '', password: '' });
                    }}
                    className="bg-gray-300 text-mm-dark px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
