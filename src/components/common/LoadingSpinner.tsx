'use client';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mm-light">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-mm-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
