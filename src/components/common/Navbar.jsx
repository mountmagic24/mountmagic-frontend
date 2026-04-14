import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-mm-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          Mount Magic
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/services" className="text-white transition hover:text-mm-accent">
            Services
          </Link>
          <Link to="/blogs" className="text-white transition hover:text-mm-accent">
            Blogs
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white">{user?.name}</span>
              <Link to="/dashboard/profile" className="text-white transition hover:text-mm-accent">
                Profile
              </Link>
              <button
                onClick={logout}
                className="rounded bg-mm-error px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/auth/login" className="text-white transition hover:text-mm-accent">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="rounded bg-mm-accent px-4 py-2 font-semibold text-mm-dark transition hover:opacity-90"
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