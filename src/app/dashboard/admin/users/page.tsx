'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import toast from 'react-hot-toast';

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading users from the backend
    // In a real app, you would have a userService.getAllUsers() function
    setTimeout(() => {
      setUsers([]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <AuthGuard requiredRole="admin">
      <DashboardLayout>
        <div>
          <h1 className="text-4xl font-bold text-mm-primary mb-6">User Management</h1>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-mm-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-mm-dark">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-block bg-mm-secondary bg-opacity-20 text-mm-secondary px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {user.role.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => toast.info('Coming soon')}
                            className="text-mm-primary hover:text-mm-accent transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 Tip: User management features like role assignment and deletion are ready to be configured
              with your backend integration.
            </p>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
