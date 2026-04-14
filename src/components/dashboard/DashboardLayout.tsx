'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import Navbar from '@/components/common/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  const adminMenuItems = [
    { href: '/dashboard/admin/services-manage', label: 'Manage Services', icon: '🛠️' },
    { href: '/dashboard/admin/blogs-manage', label: 'Manage Blogs', icon: '📝' },
    { href: '/dashboard/admin/users', label: 'Users', icon: '👥' },
  ];

  const isAdmin = user?.role === 'admin' || user?.role === 'content_manager';

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-mm-light">
        <aside className="w-64 bg-mm-primary shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          </div>

          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-6 py-3 text-white hover:bg-white hover:bg-opacity-10 transition"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="px-6 py-3 text-white text-sm font-semibold mt-4">Admin</div>
                {adminMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-3 text-white hover:bg-white hover:bg-opacity-10 transition"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  );
}
