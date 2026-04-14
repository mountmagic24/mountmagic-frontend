'use client';

import Link from 'next/link';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <h3 className="text-xl font-semibold text-mm-primary mb-2">{service.title}</h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="inline-block bg-mm-secondary bg-opacity-20 text-mm-secondary px-3 py-1 rounded text-xs font-medium">
          {service.category}
        </span>
        <span className="text-2xl font-bold text-mm-accent">${service.price}</span>
      </div>
      
      <Link
        href={`/services/${service._id}`}
        className="w-full inline-block text-center bg-mm-primary text-white py-2 rounded font-semibold hover:bg-opacity-90 transition"
      >
        View Details
      </Link>
    </div>
  );
}
