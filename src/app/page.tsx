export default function Home() {
  return (
    <main className="min-h-screen bg-mm-light">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-mm-primary mb-4">Welcome to Mount Magic</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your ultimate platform for travel services, taxi bookings, and travel insights
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-mm-primary mb-2">Services</h2>
            <p className="text-gray-600">Browse and book travel services with ease</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-mm-secondary mb-2">Blogs</h2>
            <p className="text-gray-600">Discover travel stories and insights from our community</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-mm-accent mb-2">Account</h2>
            <p className="text-gray-600">Manage your profile and bookings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
