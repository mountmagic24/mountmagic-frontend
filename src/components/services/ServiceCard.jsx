import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export default function ServiceCard({ service }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
      <h3 className="mb-2 text-xl font-semibold text-mm-primary">{service.title}</h3>

      <p className="mb-3 text-sm text-gray-600 line-clamp-2">{service.description}</p>

      <div className="mb-4 flex items-center justify-between">
        <span className="inline-block rounded bg-mm-secondary bg-opacity-20 px-3 py-1 text-xs font-medium text-mm-secondary">
          {service.category}
        </span>
        <span className="text-2xl font-bold text-mm-accent">{formatCurrency(service.price)}</span>
      </div>

      <Link
        to={`/services/${service._id}`}
        className="inline-block w-full rounded bg-mm-primary py-2 text-center font-semibold text-white transition hover:bg-opacity-90"
      >
        View Details
      </Link>
    </div>
  );
}