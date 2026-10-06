import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { useAuth, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: NavigationPage) => void;
  successMessage?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, successMessage }) => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // On success, redirect directly to /dashboard
      onNavigate('dashboard');
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      // On success, redirect directly to /dashboard
      onNavigate('dashboard');
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 lg:py-24 bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EDE2D8] p-8 sm:p-10 shadow-xs space-y-7">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold tracking-wider text-[#261F1D]">
            MOMENTA
          </span>
          <p className="font-serif italic text-xs text-[#7C6A61]">
            Moments Worth Remembering
          </p>
          <h1 className="font-serif text-2xl font-semibold text-[#261F1D] pt-2">
            Welcome back / Login
          </h1>
          <p className="text-xs text-[#7A6B63]">
            Access your personalized celebrations, budget blueprints, and curated vendors.
          </p>
        </div>

        {/* Success message banner (e.g. from Signup redirect) */}
        {successMessage && (
          <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error message banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E53E3E]" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* 1. Google Login Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-3 px-4 rounded-full border border-[#D5C6BA] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#3D322E] tracking-wide transition-all flex items-center justify-center gap-3 shadow-2xs cursor-pointer disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Connecting with Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Divider: or */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#EDE2D8] w-full" />
          <span className="bg-white px-3 text-[11px] font-mono uppercase text-[#A89B95] absolute">
            or
          </span>
        </div>

        {/* 2. Email + Password Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* 3. Sign Up Link */}
        <div className="text-center pt-2 border-t border-[#F5ECE5]">
          <p className="text-xs text-[#6F6058]">
            New User?{' '}
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="font-semibold text-[#D96035] hover:text-[#C94E25] hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
