import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ToastProvider from '../common/ToastProvider';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-mm-light text-mm-dark">
      <ToastProvider />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}