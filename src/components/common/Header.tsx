import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  LogOut,
  Lock,
  ExternalLink,
  BookOpen,
  Calendar,
  Menu
} from 'lucide-react';
import { UserRole } from '../../types';
import { CURRENT_STUDENT, CURRENT_TEACHER, CURRENT_ADMIN, INITIAL_NOTICES } from '../../data/mockData';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenLoginModal: () => void;
  isEmergencyDefconActive: boolean;
  onOpenEmergencyModal: () => void;
  activeSemester: string;
  onSemesterChange?: (sem: string) => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenLoginModal,
  isEmergencyDefconActive,
  onOpenEmergencyModal,
  activeSemester,
  onToggleMobileSidebar,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current user profile depending on role
  const user = currentRole === 'student'
    ? {
        name: CURRENT_STUDENT.name,
        meta: `PRN: ${CURRENT_STUDENT.universityId}`,
        avatar: CURRENT_STUDENT.avatar,
        roleLabel: 'B.Tech Student (CSE)',
      }
    : currentRole === 'teacher'
    ? {
        name: CURRENT_TEACHER.name,
        meta: `${CURRENT_TEACHER.title} • CSE Dept`,
        avatar: CURRENT_TEACHER.avatar,
        roleLabel: 'Faculty Member',
      }
    : {
        name: CURRENT_ADMIN.name,
        meta: CURRENT_ADMIN.title,
        avatar: CURRENT_ADMIN.avatar,
        roleLabel: 'Academic Registrar & Admin',
      };

  const searchPlaceholder =
    currentRole === 'student'
      ? 'Search subjects, timetable, course notes, faculty...'
      : currentRole === 'teacher'
      ? 'Search students, roll numbers, attendance sheets, assignments...'
      : 'Search academic records, PRN, faculty, regulations...';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-5 py-2.5">
      {/* Mobile Menu & Search Input */}
      <div className="flex flex-1 items-center max-w-xl space-x-2 sm:space-x-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition shrink-0"
            title="Toggle Navigation Menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-md border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-4 text-xs text-charcoal-900 placeholder-slate-400 transition-colors focus:border-maroon-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon-700"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* DEFCON Emergency Active Badge (Critical Alert) */}
        {isEmergencyDefconActive && (
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center space-x-1.5 rounded bg-maroon-700 px-2.5 py-1 text-xs font-semibold text-white animate-pulse shadow-xs"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>DEFCON OVERRIDE ACTIVE</span>
          </button>
        )}

        {/* Academic Session / Semester Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          <span>Academic Year 2026-27 • Sem V</span>
        </div>

        {/* Role Switcher Pill - MET BKC Style */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center space-x-2 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition"
            title="Switch User Role to test Student, Faculty, or Admin capabilities"
          >
            <span className="flex h-2 w-2 rounded-full bg-maroon-700" />
            <span className="capitalize font-semibold text-charcoal-900">{currentRole} View</span>
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-md border border-slate-200 bg-white p-2 shadow-lg z-50">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Institutional Role Perspective
              </div>
              <button
                onClick={() => {
                  onRoleChange('student');
                  setShowRoleDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs transition ${
                  currentRole === 'student' ? 'bg-maroon-50 text-maroon-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className={`h-4 w-4 ${currentRole === 'student' ? 'text-maroon-700' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-semibold text-charcoal-900">Student Portal</div>
                    <div className="text-[10px] text-slate-500">Elena Vance (MET-CS-2024-819)</div>
                  </div>
                </div>
                {currentRole === 'student' && <span className="text-[10px] text-maroon-700 font-bold">Active</span>}
              </button>

              <button
                onClick={() => {
                  onRoleChange('teacher');
                  setShowRoleDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs transition ${
                  currentRole === 'teacher' ? 'bg-maroon-50 text-maroon-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Briefcase className={`h-4 w-4 ${currentRole === 'teacher' ? 'text-maroon-700' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-semibold text-charcoal-900">Faculty Portal</div>
                    <div className="text-[10px] text-slate-500">Dr. Arvind Ramesh (FAC-2018-042)</div>
                  </div>
                </div>
                {currentRole === 'teacher' && <span className="text-[10px] text-maroon-700 font-bold">Active</span>}
              </button>

              <button
                onClick={() => {
                  onRoleChange('admin');
                  setShowRoleDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs transition ${
                  currentRole === 'admin' ? 'bg-maroon-50 text-maroon-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className={`h-4 w-4 ${currentRole === 'admin' ? 'text-maroon-700' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-semibold text-charcoal-900">Admin Console</div>
                    <div className="text-[10px] text-slate-500">Dean Margaret Sterling (Registrar)</div>
                  </div>
                </div>
                {currentRole === 'admin' && <span className="text-[10px] text-maroon-700 font-bold">Active</span>}
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={() => {
                  onOpenLoginModal();
                  setShowRoleDropdown(false);
                }}
                className="flex w-full items-center space-x-2 rounded px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-charcoal-900"
              >
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Single Sign-On (SSO) Credentials</span>
              </button>
            </div>
          )}
        </div>

        {/* Official Notices Bell Drawer */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDrawer(!showNotifDrawer)}
            className="relative rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 transition"
            title="Institutional Notices"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-maroon-700 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          {showNotifDrawer && (
            <div className="absolute right-0 mt-1.5 w-80 rounded-md border border-slate-200 bg-white p-3 shadow-lg z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-charcoal-900">Official Campus Notices</span>
                <span className="text-[10px] font-mono text-maroon-700 font-semibold">MET BKC Registrar</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {INITIAL_NOTICES.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="rounded border border-slate-100 bg-slate-50 p-2 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                      <span className="font-semibold text-maroon-800">{notice.authorRole}</span>
                      <span className="font-mono">{notice.timestamp}</span>
                    </div>
                    <div className="font-semibold text-charcoal-900 line-clamp-1">{notice.title}</div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{notice.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Display */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-7 w-7 rounded-full border border-slate-200 object-cover"
          />
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-charcoal-900 leading-tight truncate max-w-[130px]">
              {user.name}
            </div>
            <div className="text-[10px] text-slate-500 truncate max-w-[130px] font-mono">
              {user.meta}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
