import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync mode if initialMode prop changes
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess({
        name: name || (email.split('@')[0] ? email.split('@')[0] : 'Valued Host'),
        email: email || 'user@momenta.com',
      });
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleDemoLogin = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess({
        name: 'Ananya Rao',
        email: 'ananya.rao@momenta.com',
      });
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full border border-[#EAE0D6] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#564A45] hover:text-[#261F1D] border border-[#E8DDD3] shadow-2xs transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#FDEEE7] text-[#D96035] mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
              {mode === 'login' ? 'Welcome Back!' : 'Account Created'}
            </h3>
            <p className="text-xs text-[#6F6058]">
              Entering your personalized MOMENTA concierge...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="font-serif text-2xl font-semibold tracking-wider text-[#261F1D]">
                MOMENTA
              </span>
              <p className="font-serif italic text-xs text-[#7C6A61] mt-0.5">
                Moments Worth Remembering
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex p-1 bg-[#EFE5DB] rounded-xl">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#261F1D] shadow-xs'
                    : 'text-[#695B54] hover:text-[#261F1D]'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#261F1D] shadow-xs'
                    : 'text-[#695B54] hover:text-[#261F1D]'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ananya Rao"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98490 12345"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="host@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your email.')}
                      className="text-[11px] text-[#D96035] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2"
              >
                <span>{mode === 'login' ? 'Log In to MOMENTA' : 'Create My Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick demo login button */}
            <div className="pt-2 border-t border-[#EDE2D8] text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs text-[#7A6B63] hover:text-[#D96035] transition-colors cursor-pointer font-medium"
              >
                Quick 1-Click Host Demo Login →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
