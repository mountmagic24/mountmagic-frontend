'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types/service';
import { serviceService } from '@/services/serviceService';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      const response = await serviceService.getServiceById(id);
      if (response.success) {
        setService(response.data.service);
      }
    } catch (error) {
      toast.error('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="text-center py-12">Service not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="mb-6">
                <span className="inline-block bg-mm-secondary bg-opacity-20 text-mm-secondary px-4 py-2 rounded-full text-sm font-medium">
                  {service.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-mm-primary mb-4">{service.title}</h1>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-2xl font-bold text-mm-accent">${service.price}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-mm-primary mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>

              <div className="bg-mm-light p-4 rounded-lg mb-8">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Posted:</span>{' '}
                  {new Date(service.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => toast.success('Request sent! Our team will contact you soon.')}
                className="bg-mm-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Request This Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
