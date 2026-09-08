'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase/clientApp';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [method, setMethod] = useState<'email' | 'otp'>('email');
  
  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!auth) throw new Error('Firebase not configured');
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login with email.');
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP.');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    
    setLoading(true);
    setError('');

    try {
      await confirmationResult.confirm(verificationCode);
      router.push('/portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "block w-full px-3 py-2.5 border border-border-gray rounded-[3px] text-xs bg-white placeholder-text-muted text-text-body focus:outline-none focus:ring-1 focus:ring-navy-primary focus:border-navy-primary";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 route-transition">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[3px] border border-border-gray">
        <div>
          <h2 className="text-center text-3xl font-serif font-semibold text-navy-ink">
            Client Portal
          </h2>
          <p className="mt-2 text-center text-xs text-text-muted">
            Sign in to securely access your documents
          </p>
        </div>

        {!isFirebaseConfigured ? (
          <div className="bg-bg-secondary border border-border-gray rounded-[3px] p-5 text-text-body text-xs">
            <h3 className="font-serif font-semibold text-navy-ink mb-2">Firebase Configuration Required</h3>
            <p className="mb-3 leading-relaxed">
              The Client Portal features (authentication, upload, and database storage) require Firebase credentials to function.
            </p>
            <p className="font-semibold mb-1 text-navy-ink">How to configure:</p>
            <ol className="list-decimal pl-5 space-y-1 leading-relaxed text-text-muted">
              <li>Create a Firebase project at <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-navy-primary">Firebase Console</a>.</li>
              <li>Enable <strong>Email/Password</strong> and <strong>Phone</strong> sign-in providers in Authentication.</li>
              <li>Create a web app in project settings and obtain your config object.</li>
              <li>Copy the credentials into a <code className="num-ledger text-[10px] bg-bg-secondary px-1 py-0.5 border border-border-gray rounded-[2px]">.env.local</code> file.</li>
            </ol>
          </div>
        ) : (
          <>
            {/* Login Method Toggle */}
            <div className="flex rounded-[3px] overflow-hidden border border-border-gray">
              <button
                onClick={() => { setMethod('email'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${method === 'email' ? 'bg-navy-primary text-white' : 'bg-white text-text-body hover:bg-bg-secondary'}`}
              >
                Email & Password
              </button>
              <button
                onClick={() => { setMethod('otp'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-semibold border-l border-border-gray transition-colors ${method === 'otp' ? 'bg-navy-primary text-white' : 'bg-white text-text-body hover:bg-bg-secondary'}`}
              >
                Phone (OTP)
              </button>
            </div>

            {error && (
              <div className="bg-white border border-accent-warning text-accent-warning px-4 py-3 rounded-[3px] text-xs">
                {error}
              </div>
            )}

{method === 'email' ? (
  <div className="space-y-5">
    <form className="mt-8" onSubmit={handleEmailLogin}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email-address" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-navy-primary text-xs font-semibold rounded-[3px] text-white bg-navy-primary hover:bg-navy-ink focus:outline-none disabled:opacity-70 transition-colors btn-press"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
    <div className="mt-4 text-center">
      <a href="/portal/signup" className="text-navy-primary text-xs hover:underline">Don't have an account? Sign up</a>
    </div>
  </div>
) : (
              <div className="mt-8 space-y-5">
                {!confirmationResult ? (
                  <form onSubmit={handleSendOTP} className="space-y-5">
                    <div>
                      <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">Phone Number (with country code)</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={inputClass}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div id="recaptcha-container"></div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2.5 px-4 border border-navy-primary text-xs font-semibold rounded-[3px] text-white bg-navy-primary hover:bg-navy-ink focus:outline-none disabled:opacity-70 transition-colors btn-press"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-5">
                    <div>
                      <label htmlFor="code" className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">Verification Code</label>
                      <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className={`${inputClass} num-ledger tracking-[0.3em] text-center`}
                        placeholder="123456"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2.5 px-4 border border-navy-primary text-xs font-semibold rounded-[3px] text-white bg-navy-primary hover:bg-navy-ink focus:outline-none disabled:opacity-70 transition-colors btn-press"
                    >
                      {loading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Add recaptchaVerifier to window object for TypeScript
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
