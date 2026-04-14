'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-mm-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Mount Magic
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/services" className="text-white hover:text-mm-accent transition">
            Services
          </Link>
          <Link href="/blogs" className="text-white hover:text-mm-accent transition">
            Blogs
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{user?.name}</span>
              <Link href="/dashboard/profile" className="text-white hover:text-mm-accent transition">
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-mm-error text-white px-4 py-2 rounded transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-white hover:text-mm-accent transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-mm-accent text-mm-dark px-4 py-2 rounded font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
