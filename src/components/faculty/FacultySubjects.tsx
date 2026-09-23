import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  FolderOpen,
  FileText,
  Megaphone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MapPin,
  Award,
  CheckSquare
} from 'lucide-react';
import {
  INITIAL_FACULTY_SUBJECTS,
  FacultySubject,
  INITIAL_ENROLLED_STUDENTS,
  INITIAL_FACULTY_ASSIGNMENTS
} from '../../data/facultyService';

interface FacultySubjectsProps {
  onNavigateTab: (tab: string, param?: string) => void;
}

export const FacultySubjects: React.FC<FacultySubjectsProps> = ({ onNavigateTab }) => {
  const [subjects, setSubjects] = useState<FacultySubject[]>(INITIAL_FACULTY_SUBJECTS);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('CS502');

  const selectedSubject =
    subjects.find((s) => s.code === selectedSubjectCode) || subjects[0];

  const enrolledStudents = INITIAL_ENROLLED_STUDENTS.filter(
    (s) => s.courseCode === selectedSubject.code
  );

  const subjectAssignments = INITIAL_FACULTY_ASSIGNMENTS.filter(
    (a) => a.courseCode === selectedSubject.code
  );

  const toggleModuleCompletion = (moduleId: number) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.code !== selectedSubjectCode) return sub;
        return {
          ...sub,
          syllabusModules: sub.syllabusModules.map((m) =>
            m.id === moduleId ? { ...m, completed: !m.completed } : m
          ),
        };
      })
    );
  };

  const completedModulesCount = selectedSubject.syllabusModules.filter((m) => m.completed).length;
  const syllabusProgress = Math.round(
    (completedModulesCount / selectedSubject.syllabusModules.length) * 100
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
          <span>Faculty Console</span>
          <span>/</span>
          <span className="font-semibold text-charcoal-900">Assigned Subjects</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
          My Teaching Subjects & Curricula
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Courses officially allotted by Academic Administration for Fall 2026.
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub) => {
          const isSelected = sub.code === selectedSubjectCode;
          const completedCount = sub.syllabusModules.filter((m) => m.completed).length;
          const progress = Math.round((completedCount / sub.syllabusModules.length) * 100);

          return (
            <div
              key={sub.code}
              onClick={() => setSelectedSubjectCode(sub.code)}
              className={`rounded-xl border p-5 cursor-pointer transition shadow-xs ${
                isSelected
                  ? 'border-maroon-700 bg-white ring-2 ring-maroon-700/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                      {sub.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Semester {sub.semester} • {sub.section}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-charcoal-900 mt-1.5">
                    {sub.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">{sub.type}</div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isSelected
                      ? 'bg-maroon-700 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSelected ? 'Viewing' : 'Select'}
                </span>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Enrolled</div>
                  <div className="font-bold text-charcoal-900">{sub.totalStudents} Students</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Attendance</div>
                  <div className="font-bold text-emerald-700">{sub.avgAttendance}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Credits</div>
                  <div className="font-bold text-charcoal-900">{sub.credits} Units</div>
                </div>
              </div>

              {/* Syllabus Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span>Syllabus Completion</span>
                  <span className="font-mono font-bold text-charcoal-900">
                    {completedCount}/{sub.syllabusModules.length} Modules ({progress}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-maroon-700 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Selected Subject Drawer/Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-6">
        {/* Subject Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-charcoal-900">
                {selectedSubject.code}: {selectedSubject.name}
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {selectedSubject.section}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="flex items-center space-x-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedSubject.room}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedSubject.schedule}</span>
              </span>
            </div>
          </div>

          {/* Quick Actions for this course */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('attendance-marker')}
              className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-xs"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>Launch Roll Call</span>
            </button>
            <button
              onClick={() => onNavigateTab('coursework')}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-900 hover:bg-slate-50 transition shadow-xs"
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>Assignments</span>
            </button>
            <button
              onClick={() => onNavigateTab('materials-repo')}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-900 hover:bg-slate-50 transition shadow-xs"
            >
              <FolderOpen className="h-3.5 w-3.5 text-slate-500" />
              <span>Materials</span>
            </button>
          </div>
        </div>

        {/* Syllabus Modules Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-charcoal-900">
              Syllabus Units & Module Progression ({syllabusProgress}% completed)
            </h3>
            <span className="text-[11px] text-slate-500">
              Click checkbox to toggle topic delivery status
            </span>
          </div>

          <div className="space-y-2">
            {selectedSubject.syllabusModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => toggleModuleCompletion(mod.id)}
                className={`flex items-start justify-between rounded-lg border p-3 cursor-pointer transition text-xs ${
                  mod.completed
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white text-charcoal-900'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={mod.completed}
                    onChange={() => {}} // handled by parent onClick
                    className="mt-0.5 rounded border-slate-300 accent-emerald-700 h-4 w-4"
                  />
                  <div>
                    <div className="font-bold flex items-center space-x-2">
                      <span>Module {mod.id}: {mod.title}</span>
                      {mod.completed && (
                        <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2">
                          Delivered
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{mod.description}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono text-[11px] text-slate-400">
                  {mod.lectureHours} hrs
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Students Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-charcoal-900">
              Enrolled Students ({enrolledStudents.length} showing in cohort)
            </h3>
            <button
              onClick={() => onNavigateTab('students')}
              className="text-xs font-semibold text-maroon-700 hover:underline flex items-center space-x-1"
            >
              <span>View Full Student Registry</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {enrolledStudents.map((std) => (
              <div
                key={std.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 p-2.5 text-xs"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <img
                    src={std.avatar}
                    alt={std.name}
                    className="h-8 w-8 rounded-full border border-slate-200 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-charcoal-900 truncate">{std.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 truncate">{std.rollNo}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-charcoal-900">{std.attendanceRate}%</div>
                  <span
                    className={`text-[9px] font-semibold px-1 py-0.2 rounded ${
                      std.attendanceStanding === 'Compliant'
                        ? 'bg-emerald-50 text-emerald-700'
                        : std.attendanceStanding === 'Caution (<75%)'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-maroon-50 text-maroon-800'
                    }`}
                  >
                    {std.attendanceStanding}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
