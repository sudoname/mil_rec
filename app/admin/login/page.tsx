'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-military-gold rounded-lg flex items-center justify-center mb-4">
            <span className="text-military-navy font-black text-2xl">MR</span>
          </div>
          <h1 className="text-3xl font-bold text-military-smoke mb-2">Admin Login</h1>
          <p className="text-military-muted">Lagos State Military Recruitment Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          {error && (
            <div className="mb-6 p-4 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
              <p className="text-military-alert-red text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-military-smoke mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="input-field w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@ossg.lagos.gov.ng"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-military-smoke mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="input-field w-full"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link href="/" className="text-sm text-military-muted hover:text-military-gold transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Default Credentials Info */}
        <div className="mt-6 p-4 bg-military-gold/10 border border-military-gold/30 rounded-lg">
          <p className="text-xs text-military-muted text-center">
            <span className="font-semibold text-military-smoke">Default credentials:</span><br />
            Email: admin@ossg.lagos.gov.ng<br />
            Password: Change@123
          </p>
        </div>
      </div>
    </div>
  );
}
