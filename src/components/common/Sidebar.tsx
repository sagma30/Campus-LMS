import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  FileText,
  FolderOpen,
  CalendarCheck,
  Award,
  User,
  CheckSquare,
  Users,
  Building2,
  CalendarDays,
  FileCheck2,
  CheckCircle2,
  Megaphone,
  Settings,
  ShieldAlert,
  ShieldCheck,
  GraduationCap,
  HelpCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentRole: UserRole;
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDefconArmed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  alert?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  currentTab,
  onTabChange,
  isDefconArmed = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  // Navigation lists for each role
  const studentNav: NavItem[] = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'timetable', label: 'Academic Timetable', icon: Calendar },
    { id: 'subjects', label: 'Enrolled Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments & Submissions', icon: FileText, badge: '2 Due' },
    { id: 'materials', label: 'Course Materials & LMS', icon: FolderOpen },
    { id: 'events', label: 'Academic & Campus Events', icon: CalendarCheck, badge: '1 Entry' },
    { id: 'journey', label: 'Academic Journey & Ledger', icon: Award },
    { id: 'profile', label: 'Student Profile & PRN', icon: User },
  ];

  const teacherNav: NavItem[] = [
    { id: 'teaching-console', label: 'Faculty Dashboard', icon: LayoutDashboard },
    { id: 'my-subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'attendance-marker', label: 'Attendance & Roll Call', icon: CalendarCheck, badge: 'Active' },
    { id: 'coursework', label: 'Assignments', icon: FileText, badge: '2 Active' },
    { id: 'submissions-review', label: 'Student Submissions', icon: CheckSquare, badge: '18 New' },
    { id: 'materials-repo', label: 'Study Materials', icon: FolderOpen },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'students', label: 'Enrolled Students', icon: Users, badge: '120' },
    { id: 'profile', label: 'Faculty Profile', icon: User },
    { id: 'calendar', label: 'Academic Calendar', icon: CalendarDays },
  ];

  const adminNav: NavItem[] = [
    { id: 'admin-dashboard', label: 'Institutional Overview', icon: LayoutDashboard },
    { id: 'academic-structure', label: 'Academic Departments & Structure', icon: Building2 },
    { id: 'timetable-scheduling', label: 'Timetable & Room Scheduling', icon: CalendarDays },
    { id: 'user-management', label: 'Student & Faculty Registry', icon: Users, badge: '1,548' },
    { id: 'attendance-corrections', label: 'Attendance Audit & Petitions', icon: FileCheck2, badge: '5 Pending' },
    { id: 'examination-registry', label: 'Examination Registry', icon: CheckCircle2 },
    { id: 'campus-events-notices', label: 'Official Notices & Events', icon: Megaphone },
    { id: 'institutional-settings', label: 'University Regulations & SLA', icon: Settings },
    { id: 'emergency-lockdown', label: 'DEFCON Emergency Lockdown', icon: ShieldAlert, alert: isDefconArmed },
  ];

  const currentNav =
    currentRole === 'student' ? studentNav : currentRole === 'teacher' ? teacherNav : adminNav;

  const handleItemClick = (id: string) => {
    onTabChange(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full overflow-y-auto">
      <div>
        {/* MET BKC Institutional Header / Brand Section */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* MET Red Block Brand Mark */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-maroon-700 text-white shadow-xs">
              <span className="font-extrabold text-sm tracking-wider font-serif">MET</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-charcoal-900 tracking-tight leading-tight truncate">
                Bhujbal Knowledge City
              </div>
              <div className="text-[10px] text-maroon-700 font-semibold tracking-wide uppercase">
                MET BKC • Nashik
              </div>
              <div className="text-[9px] text-slate-500 font-mono">
                Institute of Engineering
              </div>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Academic Role & Term Indicator */}
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px]">
            <span className="text-slate-500 font-medium">Portal:</span>
            <span className="font-bold text-charcoal-900">
              {currentRole === 'student'
                ? 'Student LMS'
                : currentRole === 'teacher'
                ? 'Faculty Console'
                : 'Registrar Admin'}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="py-3">
          <div className="mb-1.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {currentRole === 'student'
              ? 'Academic Modules'
              : currentRole === 'teacher'
              ? 'Faculty Management'
              : 'Institutional Governance'}
          </div>

          <nav className="space-y-0.5 px-2">
            {currentNav.map((item) => {
              const Icon = item.icon;
              // Allow matching tab or alias
              const isActive =
                currentTab === item.id ||
                (item.id === 'attendance-marker' && (currentTab === 'attendance' || currentTab === 'roll-call')) ||
                (item.id === 'teaching-console' && currentTab === 'dashboard') ||
                (item.id === 'coursework' && currentTab === 'assignments') ||
                (item.id === 'materials-repo' && currentTab === 'study-materials') ||
                (item.id === 'submissions-review' && currentTab === 'submissions');

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-xs transition-colors ${
                    isActive
                      ? 'border-l-3 border-maroon-700 bg-maroon-50/70 text-maroon-900 font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-charcoal-900 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive ? 'text-maroon-700' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        isActive
                          ? 'bg-maroon-700 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Role-Specific Institutional Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50 text-xs">
        {currentRole === 'student' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Statutory Attendance:</span>
              <span className="font-mono font-bold text-emerald-700">88.4%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: '88.4%' }} />
            </div>
            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
              <span>PRN: <strong className="font-mono text-slate-700">MET-CS-2024-819</strong></span>
              <span className="text-emerald-700 font-semibold">Compliant</span>
            </div>
          </div>
        )}

        {currentRole === 'teacher' && (
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-slate-700 font-semibold text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-maroon-700" />
              <span>Department of CSE</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Adgaon Campus • Faculty ID: FAC-2018-042
            </div>
          </div>
        )}

        {currentRole === 'admin' && (
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-charcoal-900 font-bold text-[11px]">
              <span className="h-2 w-2 rounded-full bg-maroon-700" />
              <span>Registrar Council Scope</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Institutional Governance • SPPU Affiliated
            </div>
          </div>
        )}

        <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
          <span>SPPU Code: 4012</span>
          <span>ERP v2.6.4</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-slate-200 bg-white flex-col justify-between h-screen sticky top-0 overflow-y-auto select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50 select-none animate-fadeIn">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
