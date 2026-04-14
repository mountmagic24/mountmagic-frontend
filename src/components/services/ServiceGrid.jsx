import { useEffect, useState } from 'react';
import { serviceService } from '../../services/serviceService';
import LoadingSpinner from '../common/LoadingSpinner';
import ServiceCard from './ServiceCard';

export default function ServiceGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    serviceService
      .getAllServices()
      .then((response) => {
        setServices(response?.data?.services || []);
      })
      .catch(() => {
        setError('Failed to load services');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!services.length) {
    return <p className="text-gray-600">No services found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}