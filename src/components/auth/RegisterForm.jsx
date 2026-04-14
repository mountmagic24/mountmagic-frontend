import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({ name, email, password });
      if (response.success) {
        toast.success('Registration successful! Please login.');
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-mm-primary">Create Account</h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-mm-dark">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mm-primary"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-mm-dark">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mm-primary"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-mm-dark">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mm-primary"
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-mm-dark">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mm-primary"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-mm-primary py-2 font-semibold text-white transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}