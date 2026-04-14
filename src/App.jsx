import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthGuard from './components/auth/AuthGuard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './hooks/useAuth';
import ServiceGrid from './components/services/ServiceGrid';
import BlogGrid from './components/blogs/BlogGrid';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { serviceService } from './services/serviceService';
import { blogService } from './services/blogService';
import { formatCurrency, formatDate } from './utils/formatters';

function PageFrame({ title, children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-mm-primary">{title}</h1>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold text-mm-primary">Welcome to Mount Magic</h1>
      <p className="mb-8 text-lg text-gray-600">
        Your ultimate platform for travel services, taxi bookings, and travel insights.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold text-mm-primary">Services</h2>
          <p className="text-gray-600">Browse and book travel services with ease</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold text-mm-secondary">Blogs</h2>
          <p className="text-gray-600">Discover travel stories and insights from our community</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold text-mm-accent">Account</h2>
          <p className="text-gray-600">Manage your profile and bookings</p>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <PageFrame title="Services">
      <ServiceGrid />
    </PageFrame>
  );
}

function BlogsPage() {
  return (
    <PageFrame title="Blogs">
      <BlogGrid />
    </PageFrame>
  );
}

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-mm-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome back. Manage your Mount Magic account from here.</p>
      </div>
    </DashboardLayout>
  );
}

function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold text-mm-primary">Profile</h1>
        <p className="mb-2 text-gray-700">
          <strong>Name:</strong> {user?.name || 'Guest'}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user?.email || 'Not available'}
        </p>
      </div>
    </DashboardLayout>
  );
}

function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    serviceService
      .getServiceById(id)
      .then((response) => {
        setService(response?.data?.service || null);
      })
      .catch(() => setError('Failed to load service details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <PageFrame title="Service Details"><p className="text-red-600">{error}</p></PageFrame>;

  return (
    <PageFrame title={service?.title || 'Service Details'}>
      {!service ? (
        <p className="text-gray-600">Service not found.</p>
      ) : (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="rounded bg-mm-secondary bg-opacity-20 px-3 py-1 text-xs font-medium text-mm-secondary">
              {service.category}
            </span>
            <span className="text-2xl font-bold text-mm-accent">{formatCurrency(service.price)}</span>
          </div>
          <p className="whitespace-pre-line text-gray-700">{service.description}</p>
        </div>
      )}
    </PageFrame>
  );
}

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    blogService
      .getBlogById(id)
      .then((response) => {
        setBlog(response?.data?.blog || null);
      })
      .catch(() => setError('Failed to load blog details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <PageFrame title="Blog Details"><p className="text-red-600">{error}</p></PageFrame>;

  return (
    <PageFrame title={blog?.title || 'Blog Details'}>
      {!blog ? (
        <p className="text-gray-600">Blog not found.</p>
      ) : (
        <div className="rounded-lg bg-white p-6 shadow">
          {blog.imageUrl ? (
            <img src={blog.imageUrl} alt={blog.title} className="mb-6 h-72 w-full rounded-lg object-cover" />
          ) : null}
          <div className="mb-4 text-sm text-gray-500">
            <span>{blog.author?.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            {blog.content}
          </div>
        </div>
      )}
    </PageFrame>
  );
}

function DashboardPlaceholderPage({ title, description }) {
  return (
    <DashboardLayout>
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-mm-primary">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    </DashboardLayout>
  );
}

function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/register" element={<RegisterForm />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogDetailPage />} />
      <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
      <Route path="/dashboard/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
      <Route
        path="/dashboard/admin/services-manage"
        element={
          <AuthGuard requiredRole={["admin", "content_manager"]}>
            <DashboardPlaceholderPage title="Manage Services" description="Service CRUD will be restored in the next admin component pass." />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard/admin/blogs-manage"
        element={
          <AuthGuard requiredRole={["admin", "content_manager"]}>
            <DashboardPlaceholderPage title="Manage Blogs" description="Blog CRUD will be restored in the next admin component pass." />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard/admin/users"
        element={
          <AuthGuard requiredRole="admin">
            <DashboardPlaceholderPage title="Users" description="User management will be restored in the next admin component pass." />
          </AuthGuard>
        }
      />
      <Route path="*" element={<PageFrame title="Page Not Found"><Link to="/">Go home</Link></PageFrame>} />
    </Routes>
  );
}

export default function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}