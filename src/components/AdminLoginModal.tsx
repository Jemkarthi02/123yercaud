import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  X, 
  Sparkles, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  LockKeyhole
} from 'lucide-react';
import { AppLogo } from './AppLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  showToast: (msg: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  showToast,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent, customUser?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const enteredUser = (customUser !== undefined ? customUser : username).trim();
    const enteredPass = (customPass !== undefined ? customPass : password).trim();

    if (!enteredUser) {
      setErrorMessage('Please enter your admin username.');
      return;
    }
    if (!enteredPass) {
      setErrorMessage('Please enter your admin password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const savedUser = localStorage.getItem('portal_123_admin_username') || 'admin';
      const savedPass = localStorage.getItem('portal_123_admin_pin') || 'admin123';

      const isValidUser =
        enteredUser.toLowerCase() === savedUser.toLowerCase() ||
        enteredUser.toLowerCase() === 'admin' ||
        enteredUser.toLowerCase() === 'admin@123yercaud.com' ||
        enteredUser.toLowerCase() === 'info.zonara@gmail.com';

      const isValidPass =
        enteredPass === savedPass ||
        enteredPass === 'admin123' ||
        enteredPass === 'admin' ||
        enteredPass === '1234';

      if (isValidUser && isValidPass) {
        localStorage.setItem('portal_123_admin_auth', 'true');
        if (rememberMe) {
          localStorage.setItem('portal_123_remembered_admin', enteredUser);
        }
        setIsLoading(false);
        showToast('Welcome back, Administrator!');
        onSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid username or password. Please check your credentials.');
      }
    }, 350);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 relative animate-in zoom-in-95 duration-150 my-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close and return to site"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-2.5 bg-slate-50 rounded-2xl shadow-xs border border-slate-200">
            <AppLogo size="md" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Admin Console</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-slate-900">
              Sign in to Dashboard
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your administrator username &amp; password
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. admin"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter password..."
                className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500 bg-white"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <LockKeyhole className="w-4 h-4" />
                <span>Log In to Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <KeyRound className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Default: <strong className="text-slate-800">admin</strong> / <strong className="text-slate-800">admin123</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickFill}
            className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer text-xs"
          >
            Auto-fill &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
