import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-mm-light flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-mm-primary mb-2 text-center">Welcome to Mount Magic</h1>
            <p className="text-center text-gray-600 mb-6">Login to your account</p>
            
            <LoginForm />
            
            <p className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-mm-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
