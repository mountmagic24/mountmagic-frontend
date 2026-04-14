'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mm-primary text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mount Magic</h3>
            <p className="text-gray-200 text-sm">
              Your ultimate platform for travel services and adventure planning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-gray-200 hover:text-mm-accent transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-200 hover:text-mm-accent transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-200 hover:text-mm-accent transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="text-gray-200 hover:text-mm-accent transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-200 hover:text-mm-accent transition">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-200 text-sm mb-2">📧 support@mountmagic.com</p>
            <p className="text-gray-200 text-sm">📱 +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-200">
              © {currentYear} Mount Magic. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0 text-sm">
              <Link href="#" className="text-gray-200 hover:text-mm-accent transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-200 hover:text-mm-accent transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
