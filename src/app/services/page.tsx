import Navbar from '@/components/common/Navbar';
import ServiceGrid from '@/components/services/ServiceGrid';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-mm-primary mb-2">Mount Magic Services</h1>
          <p className="text-gray-600 mb-8">Browse our wide range of travel and lifestyle services</p>
          
          <ServiceGrid />
        </div>
      </div>
    </>
  );
}
