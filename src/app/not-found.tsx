import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-mm-primary mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-4">Page Not Found</p>
          <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="inline-block bg-mm-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Go Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
