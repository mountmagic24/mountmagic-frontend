'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types/service';
import { serviceService } from '@/services/serviceService';
import ServiceCard from './ServiceCard';
import toast from 'react-hot-toast';

export default function ServiceGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await serviceService.getAllServices();
      if (response.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mm-primary"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return <div className="text-center py-12 text-gray-500">No services available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}
