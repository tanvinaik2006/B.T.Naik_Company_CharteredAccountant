'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase/clientApp';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "block w-full px-3 py-2.5 border border-border-gray rounded-[3px] text-xs bg-white placeholder-text-muted text-text-body focus:outline-none focus:ring-1 focus:ring-navy-primary focus:border-navy-primary";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 route-transition">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[3px] border border-border-gray">
        <h2 className="text-center text-3xl font-serif font-semibold text-navy-ink mb-4">
          Create Account
        </h2>
        {!isFirebaseConfigured ? (
          <div className="bg-bg-secondary border border-border-gray rounded-[3px] p-5 text-xs text-text-body">
            <p className="font-semibold mb-2 text-navy-ink">Firebase configuration required</p>
            <p>Please add Firebase credentials to <code className="bg-bg-secondary px-1 py-0.5 rounded-[2px]">.env.local</code> to enable sign‑up.</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            {error && (
              <div className="bg-white border border-accent-warning text-accent-warning px-4 py-3 rounded-[3px] text-xs">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="signup-confirm" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-navy-primary text-xs font-semibold rounded-[3px] text-white bg-navy-primary hover:bg-navy-ink focus:outline-none disabled:opacity-70 transition-colors btn-press"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
