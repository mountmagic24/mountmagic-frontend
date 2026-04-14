import { Link } from 'react-router-dom';
import { formatDate, truncatText } from '../../utils/formatters';

export default function BlogCard({ blog }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
      {blog.imageUrl ? (
        <div className="h-48 overflow-hidden bg-gray-300">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      ) : null}

      <div className="p-6">
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-mm-primary">{blog.title}</h3>

        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <span>{blog.author?.name}</span>
          <span>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{truncatText(blog.content, 120)}</p>

        <Link to={`/blogs/${blog._id}`} className="font-semibold text-mm-primary transition hover:text-mm-accent">
          Read More →
        </Link>
      </div>
    </div>
  );
}