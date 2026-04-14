import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-mm-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">Mount Magic</h3>
            <p className="text-sm text-gray-200">
              Your ultimate platform for travel services and adventure planning.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-gray-200 transition hover:text-mm-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-200 transition hover:text-mm-accent">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-200 transition hover:text-mm-accent">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth/login" className="text-gray-200 transition hover:text-mm-accent">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-gray-200 transition hover:text-mm-accent">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <p className="mb-2 text-sm text-gray-200">support@mountmagic.com</p>
            <p className="text-sm text-gray-200">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-200">© {currentYear} Mount Magic. All rights reserved.</p>
            <div className="mt-4 flex gap-4 text-sm md:mt-0">
              <Link to="#" className="text-gray-200 transition hover:text-mm-accent">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-200 transition hover:text-mm-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}