import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { useAuth, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (page: NavigationPage, message?: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { signInWithGoogle, signUpWithEmail } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Field touch states
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Validation rules (Section 7)
  const validateName = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Full Name is required.';
    if (/\d/.test(trimmed)) return 'Full Name must not contain numbers.';
    if (trimmed.length < 2) return 'Full Name must be at least 2 characters.';
    return null;
  };

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
    return null;
  };

  const validatePhone = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Phone Number is required.';
    const cleaned = trimmed.replace(/[\s\-()]/g, '');
    if (!/^\+?\d{10,15}$/.test(cleaned)) return 'Please enter a valid phone number (10-15 digits).';
    return null;
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const validateConfirmPassword = (val: string, pass: string) => {
    if (!val) return 'Please confirm your password.';
    if (val !== pass) return 'Confirm Password must match Password.';
    return null;
  };

  const nameError = touched.name ? validateName(name) : null;
  const emailError = touched.email ? validateEmail(email) : null;
  const phoneError = touched.phone ? validatePhone(phone) : null;
  const passwordError = touched.password ? validatePassword(password) : null;
  const confirmPasswordError = touched.confirmPassword ? validateConfirmPassword(confirmPassword, password) : null;

  const isFormValid =
    !validateName(name) &&
    !validateEmail(email) &&
    !validatePhone(phone) &&
    !validatePassword(password) &&
    !validateConfirmPassword(confirmPassword, password);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleGoogleSignUp = async () => {
    if (googleLoading || loading) return; // Prevent duplicate clicks
    setGeneralError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Google signup automatically logs in and redirects directly to /dashboard
      onNavigate('dashboard');
    } catch (err: any) {
      setGeneralError(getFriendlyAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || googleLoading) return; // Prevent duplicate requests (Section 11)

    setGeneralError(null);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    // Check validation before making Firebase call
    if (
      validateName(trimmedName) ||
      validateEmail(trimmedEmail) ||
      validatePhone(trimmedPhone) ||
      validatePassword(password) ||
      validateConfirmPassword(confirmPassword, password)
    ) {
      setGeneralError('Please correct the validation errors before creating your account.');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Firebase Authentication & Step 2: Firestore Profile
      await signUpWithEmail(trimmedName, trimmedEmail, trimmedPhone, password);

      // Success Flow (Section 12)
      setSuccessNotice('Account created successfully! Please log in to continue.');
      setTimeout(() => {
        onNavigate('login', 'Account created successfully! Please log in to continue.');
      }, 1500);
    } catch (err: any) {
      console.error('[MOMENTA Sign Up Error Caught]', err);
      setGeneralError(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 lg:py-24 bg-[#FAF7F2] min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-[#EDE2D8] p-8 sm:p-10 shadow-xs space-y-7">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold tracking-wider text-[#261F1D]">
            MOMENTA
          </span>
          <p className="font-serif italic text-xs text-[#7C6A61]">
            Moments Worth Remembering
          </p>
          <h1 className="font-serif text-2xl font-semibold text-[#261F1D] pt-2">
            Create your MOMENTA account
          </h1>
          <p className="text-xs text-[#7A6B63]">
            Start orchestrating unforgettable celebrations with curated vendors and personalized plans.
          </p>
        </div>

        {/* Success Notice */}
        {successNotice && (
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-[#16A34A]" />
            <span className="font-medium">{successNotice}</span>
          </div>
        )}

        {/* General Error Banner */}
        {generalError && (
          <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E53E3E]" />
            <span className="leading-relaxed">{generalError}</span>
          </div>
        )}

        {/* 1. Sign Up with Google */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
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

        {/* 2. Option A: Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Ananya Rao"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                  nameError ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                }`}
              />
            </div>
            {nameError && (
              <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
              Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="ananya@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                  emailError ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                }`}
              />
            </div>
            {emailError && (
              <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="+91 98490 12345"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                  phoneError ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                }`}
              />
            </div>
            {phoneError && (
              <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{phoneError}</span>
              </p>
            )}
          </div>

          {/* Password & Confirm Password Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                    passwordError ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                  }`}
                />
              </div>
              {passwordError && (
                <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                    confirmPasswordError ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                  }`}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{confirmPasswordError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {loading ? (
              <span>Creating MOMENTA Profile...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Already have an account? Login */}
        <div className="text-center pt-2 border-t border-[#F5ECE5]">
          <p className="text-xs text-[#6F6058]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-semibold text-[#D96035] hover:text-[#C94E25] hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
