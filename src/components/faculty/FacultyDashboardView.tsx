import React from 'react';
import {
  CalendarCheck,
  BookOpen,
  FileText,
  Users,
  CheckSquare,
  FolderOpen,
  Megaphone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CURRENT_TEACHER } from '../../data/mockData';
import {
  INITIAL_FACULTY_SUBJECTS,
  INITIAL_FACULTY_ASSIGNMENTS,
  INITIAL_STUDENT_SUBMISSIONS,
  INITIAL_FACULTY_ANNOUNCEMENTS
} from '../../data/facultyService';

interface FacultyDashboardViewProps {
  onNavigateTab: (tab: string, param?: string) => void;
  onOpenReviewSubmissions: (asgTitle: string) => void;
}

export const FacultyDashboardView: React.FC<FacultyDashboardViewProps> = ({
  onNavigateTab,
  onOpenReviewSubmissions,
}) => {
  const pendingSubmissionsCount = INITIAL_STUDENT_SUBMISSIONS.filter(
    (s) => s.status === 'pending'
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="font-semibold text-charcoal-900">Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Welcome, {CURRENT_TEACHER.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {CURRENT_TEACHER.title} • {CURRENT_TEACHER.department} • MET Bhujbal Knowledge City
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateTab('attendance-marker')}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Launch Daily Roll Call</span>
          </button>
        </div>
      </div>

      {/* Live Lecture Banner */}
      <div className="rounded-xl border border-maroon-700/30 bg-maroon-50/30 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-maroon-700">
              Live Teaching Slot • Slot 2 (10:00 AM – 11:30 AM)
            </span>
          </div>
          <h2 className="text-base font-bold text-charcoal-900">
            CS502: Distributed Operating Systems (Section A)
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span className="flex items-center space-x-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>Hall 304, Turing Science Block (Cap 75)</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>62 Enrolled Students</span>
            </span>
            <span className="text-slate-400 font-mono">Topic: Raft Consensus State Machine</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onNavigateTab('attendance-marker')}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Mark Slot Attendance</span>
          </button>
        </div>
      </div>

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div
          onClick={() => onNavigateTab('my-subjects')}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Allotted Subjects</span>
            <BookOpen className="h-4 w-4 text-maroon-700" />
          </div>
          <div className="text-2xl font-black text-charcoal-900 mt-2">2 Courses</div>
          <div className="text-slate-500 text-[11px] mt-1">CS502 (Sec A) & CS508 (Sec B)</div>
        </div>

        <div
          onClick={() => onNavigateTab('students')}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Enrolled Students</span>
            <Users className="h-4 w-4 text-maroon-700" />
          </div>
          <div className="text-2xl font-black text-charcoal-900 mt-2">120 Students</div>
          <div className="text-emerald-700 font-semibold text-[11px] mt-1">87.4% Avg Attendance</div>
        </div>

        <div
          onClick={() => onNavigateTab('submissions-review')}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Submissions Queue</span>
            <CheckSquare className="h-4 w-4 text-maroon-700" />
          </div>
          <div className="text-2xl font-black text-charcoal-900 mt-2">
            {pendingSubmissionsCount} Pending
          </div>
          <div className="text-maroon-700 font-semibold text-[11px] mt-1">Requires review</div>
        </div>

        <div
          onClick={() => onNavigateTab('materials-repo')}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Courseware Artifacts</span>
            <FolderOpen className="h-4 w-4 text-maroon-700" />
          </div>
          <div className="text-2xl font-black text-charcoal-900 mt-2">18 Files</div>
          <div className="text-slate-500 text-[11px] mt-1">Slides, manuals & scripts</div>
        </div>
      </div>

      {/* Quick Access Actions Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Instant Navigation Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <button
            onClick={() => onNavigateTab('attendance-marker')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <CalendarCheck className="h-5 w-5 text-maroon-700" />
            <span>Roll Call</span>
          </button>
          <button
            onClick={() => onNavigateTab('my-subjects')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <BookOpen className="h-5 w-5 text-maroon-700" />
            <span>My Subjects</span>
          </button>
          <button
            onClick={() => onNavigateTab('coursework')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <FileText className="h-5 w-5 text-maroon-700" />
            <span>Assignments</span>
          </button>
          <button
            onClick={() => onNavigateTab('submissions-review')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <CheckSquare className="h-5 w-5 text-maroon-700" />
            <span>Submissions</span>
          </button>
          <button
            onClick={() => onNavigateTab('materials-repo')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <FolderOpen className="h-5 w-5 text-maroon-700" />
            <span>Materials</span>
          </button>
          <button
            onClick={() => onNavigateTab('announcements')}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-maroon-700 transition font-bold text-charcoal-900 text-center gap-1.5"
          >
            <Megaphone className="h-5 w-5 text-maroon-700" />
            <span>Announcements</span>
          </button>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Active Assignments & Syllabus (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Assignments */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-charcoal-900">Current Coursework</h3>
              <button
                onClick={() => onNavigateTab('coursework')}
                className="text-xs font-semibold text-maroon-700 hover:underline flex items-center space-x-1"
              >
                <span>Manage Assignments</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {INITIAL_FACULTY_ASSIGNMENTS.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs hover:bg-white transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-1.5 py-0.2 rounded border border-maroon-200">
                        {asg.courseCode}
                      </span>
                      <span className="font-bold text-charcoal-900">{asg.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Due: {asg.deadlineText} • Weightage: {asg.weightage}%
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onOpenReviewSubmissions(asg.title);
                      onNavigateTab('submissions-review', asg.id);
                    }}
                    className="flex items-center space-x-1 rounded-lg bg-charcoal-900 px-3 py-1.5 font-bold text-white hover:bg-charcoal-800 transition shrink-0 self-start sm:self-center text-[11px]"
                  >
                    <span>{asg.submittedCount} Submissions</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Progression */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-charcoal-900">Syllabus Delivery Progress</h3>
              <button
                onClick={() => onNavigateTab('my-subjects')}
                className="text-xs font-semibold text-maroon-700 hover:underline"
              >
                View Modules
              </button>
            </div>

            {INITIAL_FACULTY_SUBJECTS.map((sub) => {
              const completed = sub.syllabusModules.filter((m) => m.completed).length;
              const pct = Math.round((completed / sub.syllabusModules.length) * 100);
              return (
                <div key={sub.code} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal-900">
                      {sub.code}: {sub.name} ({sub.section})
                    </span>
                    <span className="font-mono font-bold text-slate-600">
                      {completed}/{sub.syllabusModules.length} Modules ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-maroon-700 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Notices & Office Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Recent Notices */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-charcoal-900">Recent Class Circulars</h3>
              <button
                onClick={() => onNavigateTab('announcements')}
                className="text-xs font-semibold text-maroon-700 hover:underline"
              >
                Draft Notice
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {INITIAL_FACULTY_ANNOUNCEMENTS.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-maroon-700">
                      {notice.circularNo}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {notice.timestamp}
                    </span>
                  </div>
                  <h4 className="font-bold text-charcoal-900 line-clamp-1">{notice.title}</h4>
                  <p className="text-slate-600 text-[11px] line-clamp-2">{notice.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Hours */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-xs text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-charcoal-900">
              <Clock className="h-4 w-4 text-maroon-700" />
              <span>Consultation & Office Hours</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              {CURRENT_TEACHER.officeHours} in Cabin 312, Turing Science Block.
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => onNavigateTab('profile')}
                className="text-xs font-bold text-maroon-700 hover:underline"
              >
                Edit Office Hours
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
