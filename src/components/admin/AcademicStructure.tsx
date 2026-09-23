import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Calendar,
  Users,
  Plus,
  UserCheck,
  CheckCircle,
  Clock,
  Layers,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_COURSES } from '../../data/mockData';
import { Course } from '../../types';

export const AcademicStructure: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedSemester, setSelectedSemester] = useState<'Sem 5' | 'Sem 4' | 'Sem 6'>('Sem 5');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignCourse, setAssignCourse] = useState<Course | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState('Dr. Arvind Ramesh');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const semesters = [
    { id: 'Sem 5', label: 'Semester 5 (Fall 2026)', status: 'ACTIVE / CURRENT', credits: 24, subjectsCount: 5 },
    { id: 'Sem 4', label: 'Semester 4 (Spring 2026)', status: 'COMPLETED', credits: 23, subjectsCount: 6 },
    { id: 'Sem 6', label: 'Semester 6 (Spring 2027)', status: 'UPCOMING / PLANNING', credits: 22, subjectsCount: 5 },
  ];

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAssign = (course: Course) => {
    setAssignCourse(course);
    setSelectedFaculty(course.facultyName);
    setShowAssignModal(true);
  };

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignCourse) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.code === assignCourse.code
          ? { ...c, facultyName: selectedFaculty }
          : c
      )
    );

    setShowAssignModal(false);
    setSuccessToast(`Authorization boundary updated: ${selectedFaculty} assigned to ${assignCourse.code} (${assignCourse.name})`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Academic Structure & Course Allocations
            </h1>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-mono font-bold text-blue-800">
              PRD FR-SEM / FR-ADM-03
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Authoritative Semester Curricula, Course Catalogs & Faculty Teaching Scope
          </p>
        </div>
      </div>

      {successToast && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-medium text-emerald-800 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Semester Matrix Tabs (FR-SEM-01, FR-SEM-02) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {semesters.map((sem) => {
          const isSelected = selectedSemester === sem.id;
          const isActive = sem.status.includes('ACTIVE');
          const isCompleted = sem.status.includes('COMPLETED');

          return (
            <div
              key={sem.id}
              onClick={() => setSelectedSemester(sem.id as any)}
              className={`rounded-xl border p-4 cursor-pointer transition ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">{sem.label}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : isCompleted
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {sem.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Total Credits: {sem.credits}</span>
                <span>{sem.subjectsCount} Core Subjects</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Allocations Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Enrolled Course Units & Authorization Boundaries
            </h3>
            <p className="text-[11px] text-slate-500">
              Only appointed faculty can mark attendance and manage submissions for their assigned course (FR-TEA-01).
            </p>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search code, title, faculty..."
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Course Name & Curriculum</th>
                <th className="py-3 px-4">Type & Credits</th>
                <th className="py-3 px-4">Enrolled Cohort</th>
                <th className="py-3 px-4">Appointed Faculty (Scope)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.code} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {course.code}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{course.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Room: {course.room} • {course.syllabusModules.length} Modules
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {course.type} ({course.credits} Credits)
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-700 font-semibold">
                      {course.enrolledCount} / {course.capacity} Students
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="font-semibold text-slate-900">{course.facultyName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Faculty ID: {course.facultyId}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenAssign(course)}
                      className="rounded bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                    >
                      Reassign Faculty
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reassign Faculty Modal */}
      {showAssignModal && assignCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Assign Faculty Authorization Boundary
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Target: <strong className="text-slate-900">{assignCourse.code} • {assignCourse.name}</strong>
            </p>

            <form onSubmit={handleSaveAssignment} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Appointed Instructor
                </label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Dr. Arvind Ramesh">Dr. Arvind Ramesh (Assoc. Prof - CSE)</option>
                  <option value="Prof. David Thorne">Prof. David Thorne (Head of Dept - CSE)</option>
                  <option value="Prof. Sarah Jenkins">Prof. Sarah Jenkins (Assoc. Prof - CSE)</option>
                  <option value="Dr. Maya Lin">Dr. Maya Lin (Asst. Prof - CSE)</option>
                </select>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900">
                <strong>PRD Rule FR-ADM-04:</strong> This action re-keys the server-side scope. Only the selected faculty member will be permitted to mutate session attendance and grade submissions for this subject.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 transition"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
