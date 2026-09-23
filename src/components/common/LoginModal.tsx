import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  Key,
  GraduationCap,
  Briefcase,
  Shield,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../../types';
import { CURRENT_STUDENT, CURRENT_TEACHER, CURRENT_ADMIN } from '../../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsRole: (role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginAsRole,
}) => {
  const [email, setEmail] = useState('elena.vance@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRolePreset = (r: UserRole) => {
    setRole(r);
    if (r === 'student') {
      setEmail(CURRENT_STUDENT.email);
    } else if (r === 'teacher') {
      setEmail(CURRENT_TEACHER.email);
    } else {
      setEmail(CURRENT_ADMIN.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginAsRole(role);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon-700 text-white font-bold text-xs tracking-wider">
              MET
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal-900">
                MET BKC Single Sign-On (SSO)
              </h3>
              <p className="text-[11px] text-slate-500">Bhujbal Knowledge City • Institutional Directory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="mt-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Select Role Identity
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRolePreset('student')}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-xs font-semibold transition ${
                role === 'student'
                  ? 'border-maroon-700 bg-maroon-50 text-maroon-900 ring-1 ring-maroon-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className={`h-4 w-4 mb-1 ${role === 'student' ? 'text-maroon-700' : 'text-slate-500'}`} />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRolePreset('teacher')}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-xs font-semibold transition ${
                role === 'teacher'
                  ? 'border-maroon-700 bg-maroon-50 text-maroon-900 ring-1 ring-maroon-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Briefcase className={`h-4 w-4 mb-1 ${role === 'teacher' ? 'text-maroon-700' : 'text-slate-500'}`} />
              <span>Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => handleRolePreset('admin')}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-xs font-semibold transition ${
                role === 'admin'
                  ? 'border-maroon-700 bg-maroon-50 text-maroon-900 ring-1 ring-maroon-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className={`h-4 w-4 mb-1 ${role === 'admin' ? 'text-maroon-700' : 'text-slate-500'}`} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-900 mb-1">
              Institutional Email / PRN / Faculty ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-charcoal-900 mb-1">
              Campus Directory Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 accent-maroon-700" />
              <span>Remember college session</span>
            </label>
            <span className="text-maroon-800 hover:underline cursor-pointer font-medium">
              Forgot password?
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-charcoal-900 py-2.5 font-bold text-white hover:bg-charcoal-800 transition shadow-xs"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{isSubmitting ? 'Authenticating...' : `Enter ${role === 'student' ? 'Student' : role === 'teacher' ? 'Faculty' : 'Admin'} Portal`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
