import Navbar from '@/components/common/Navbar';
import BlogGrid from '@/components/blogs/BlogGrid';

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-mm-primary mb-2">Mount Magic Blogs</h1>
          <p className="text-gray-600 mb-8">Discover travel stories, guides, and insider tips</p>
          
          <BlogGrid />
        </div>
      </div>
    </>
  );
}
