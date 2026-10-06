import React, { useState } from 'react';
import { useAuth, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { ShieldCheck, Check, Key, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

export const LoginSecuritySection: React.FC = () => {
  const { 
    user, 
    profile, 
    hasPasswordProvider, 
    hasGoogleProvider, 
    setMomentaPassword, 
    changeMomentaPassword,
    refreshProfile
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isPasswordSet = hasPasswordProvider;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword) {
      setError('Password is required.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Confirm Password must match Password.');
      return;
    }

    setLoading(true);
    try {
      if (isPasswordSet) {
        // Change existing password
        await changeMomentaPassword(newPassword);
        setSuccess('MOMENTA password updated successfully.');
      } else {
        // Link new password to Google account
        await setMomentaPassword(newPassword);
        await refreshProfile();
        setSuccess('MOMENTA password linked successfully. You can now log in using either Google or Email + Password.');
      }
      setIsEditing(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err?.message || err?.code || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDE2D8] p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="border-b border-[#F2EAE2] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D96035]">
          <ShieldCheck className="w-4 h-4 text-[#D96035]" />
          <span>Account Credentials</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#261F1D] mt-1">
          Login & Security
        </h3>
        <p className="text-xs text-[#7A6B63] mt-1">
          Manage how you access your MOMENTA account.
        </p>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-5 text-sm">
        {/* Google Account Status */}
        {hasGoogleProvider && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE2D8] gap-3">
            <div>
              <span className="font-serif font-bold text-base text-[#261F1D] block">
                Google Account
              </span>
              <span className="text-xs text-[#6F6058]">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-3 py-1.5 rounded-full w-fit">
              <Check className="w-3.5 h-3.5" />
              <span>Connected</span>
            </div>
          </div>
        )}

        {/* Password Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE2D8] gap-3">
          <div>
            <span className="font-serif font-bold text-base text-[#261F1D] block">
              MOMENTA Password
            </span>
            <span className="text-xs text-[#6F6058]">
              {isPasswordSet 
                ? 'Allows direct email and password login to your account' 
                : 'Not set (Google login only)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#7A6B63]">
              {isPasswordSet ? (
                <span className="text-[#166534] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Set
                </span>
              ) : (
                'Not set'
              )}
            </span>

            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setError(null);
                  setSuccess(null);
                }}
                className="px-4 py-1.5 rounded-full border border-[#D5C6BA] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#3D322E] tracking-wider uppercase transition-colors cursor-pointer"
              >
                {isPasswordSet ? 'Change Password' : 'Set Password'}
              </button>
            )}
          </div>
        </div>

        {/* Password Edit / Set Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#F3C5AE] space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-[#261F1D] flex items-center gap-2">
                <Key className="w-4 h-4 text-[#D96035]" />
                <span>{isPasswordSet ? 'Change MOMENTA Password' : 'Set MOMENTA Password'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-[#7A6B63] hover:text-[#261F1D]"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-[#6F6058] leading-relaxed">
              {isPasswordSet
                ? 'Enter a new password for your MOMENTA account.'
                : 'Create a password to enable Email + Password login alongside your Google account.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#695B54]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A89B95] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-60 cursor-pointer shadow-xs"
              >
                {loading ? 'Saving...' : isPasswordSet ? 'Update Password' : 'Save Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
