'use client';

import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <DashboardLayout>
        <div>
          <h1 className="text-4xl font-bold text-mm-primary mb-6">Welcome, {user?.name}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-mm-secondary mb-2">Services</h2>
              <p className="text-gray-600">Browse available services</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-mm-accent mb-2">Blogs</h2>
              <p className="text-gray-600">Read travel stories</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-mm-primary mb-2">Profile</h2>
              <p className="text-gray-600">Manage your account</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-mm-primary mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-lg font-semibold text-mm-dark">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-lg font-semibold text-mm-dark">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-lg font-semibold text-mm-dark capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
