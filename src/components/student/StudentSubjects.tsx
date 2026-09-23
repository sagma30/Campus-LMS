import React, { useState } from 'react';
import {
  BookOpen,
  User,
  MapPin,
  CheckCircle2,
  Clock,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  FolderOpen,
  Megaphone,
  Layers
} from 'lucide-react';
import { ENROLLED_COURSES, INITIAL_ASSIGNMENTS, INITIAL_STUDY_MATERIALS } from '../../data/mockData';
import { Course } from '../../types';

export const StudentSubjects: React.FC = () => {
  const semesters = [
    { sem: 1, label: 'Sem 1 (Fall 2024)' },
    { sem: 2, label: 'Sem 2 (Spring 2025)' },
    { sem: 3, label: 'Sem 3 (Fall 2025)' },
    { sem: 4, label: 'Sem 4 (Spring 2026)' },
    { sem: 5, label: 'Sem 5 (Current • Fall 2026)' },
  ];
  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [expandedCourse, setExpandedCourse] = useState<string>('CS502');
  const [courseActiveTab, setCourseActiveTab] = useState<Record<string, 'overview' | 'materials' | 'assignments'>>({
    CS502: 'overview'
  });

  const toggleCourse = (code: string) => {
    setExpandedCourse(expandedCourse === code ? '' : code);
  };

  const setTabForCourse = (code: string, tab: 'overview' | 'materials' | 'assignments') => {
    setCourseActiveTab(prev => ({ ...prev, [code]: tab }));
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Enrolled Courses & Academic Curriculum
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              SPPU Syllabus 2026
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Department of Computer Engineering
          </p>
        </div>

        <div className="text-xs text-slate-600 font-mono">
          Total Credits Enrolled: <strong className="text-slate-900">17.0 Cr</strong>
        </div>
      </div>

      {/* Semester Navigation Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto border-b border-slate-200 pb-2">
        {semesters.map((s) => {
          const isSelected = selectedSemester === s.sem;
          return (
            <button
              key={s.sem}
              onClick={() => setSelectedSemester(s.sem)}
              className={`rounded px-3.5 py-1.5 text-xs transition whitespace-nowrap ${
                isSelected
                  ? 'bg-red-700 font-bold text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              <span>{s.label}</span>
              {s.sem === 5 && (
                <span className={`ml-1.5 rounded px-1 text-[9px] font-mono uppercase ${
                  isSelected ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                }`}>
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Course List / Moodle-Style Accordions */}
      <div className="space-y-3">
        {ENROLLED_COURSES.map((course) => {
          const isExpanded = expandedCourse === course.code;
          const isCaution = course.attendanceFlag === 'caution';
          const activeTab = courseActiveTab[course.code] || 'overview';
          const courseAssignments = INITIAL_ASSIGNMENTS.filter(a => a.courseCode === course.code);
          const courseMaterials = INITIAL_STUDY_MATERIALS.filter(m => m.courseCode === course.code);

          return (
            <div
              key={course.code}
              className="rounded border border-slate-200 bg-white overflow-hidden"
            >
              {/* Summary Bar */}
              <div
                onClick={() => toggleCourse(course.code)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-slate-50/70 transition"
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-100 font-mono text-xs font-bold text-slate-900 border border-slate-200">
                    {course.code}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-bold text-slate-900">{course.name}</h2>
                      <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] text-slate-600 font-mono">
                        {course.type}
                      </span>
                    </div>

                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                      <span>Faculty: <strong className="text-slate-700">{course.facultyName}</strong></span>
                      <span>•</span>
                      <span>Venue: <span className="font-mono">{course.room}</span></span>
                      <span>•</span>
                      <span className="font-mono">{course.credits} Credits</span>
                    </div>
                  </div>
                </div>

                {/* Right Attendance Snapshot & Toggle Chevron */}
                <div className="mt-2 sm:mt-0 flex items-center justify-between sm:justify-end space-x-4 text-xs">
                  <div className="text-right">
                    <div className="flex items-center space-x-1.5 justify-end">
                      {isCaution && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                          CAUTION
                        </span>
                      )}
                      <span className="font-mono font-bold text-slate-900">
                        {course.attendanceRate}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {course.attendedHours} / {course.totalHours} hrs attended
                    </div>
                  </div>

                  <div className="rounded p-1 text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Course Modules & Materials */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/50 p-4 text-xs">
                  {/* Internal tabs for the course */}
                  <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                    <button
                      onClick={() => setTabForCourse(course.code, 'overview')}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        activeTab === 'overview'
                          ? 'bg-slate-900 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Course Syllabus & Structure
                    </button>
                    <button
                      onClick={() => setTabForCourse(course.code, 'materials')}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        activeTab === 'materials'
                          ? 'bg-slate-900 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Learning Materials ({courseMaterials.length})
                    </button>
                    <button
                      onClick={() => setTabForCourse(course.code, 'assignments')}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        activeTab === 'assignments'
                          ? 'bg-slate-900 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Coursework & Labs ({courseAssignments.length})
                    </button>
                  </div>

                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-slate-700 leading-relaxed">
                        {course.description ||
                          'Advanced theoretical and laboratory framework covering foundational principles, system specifications, and practical engineering implementations.'}
                      </p>

                      {course.syllabusUnits && (
                        <div className="mt-2">
                          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                            Curriculum Unit Progression:
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {course.syllabusUnits.map((unit: string, idx: number) => (
                              <div
                                key={idx}
                                className="rounded border border-slate-200 bg-white p-2.5 text-xs"
                              >
                                <span className="font-mono font-bold text-red-800">Unit {idx + 1}: </span>
                                <span className="text-slate-800">{unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'materials' && (
                    <div className="space-y-2">
                      {courseMaterials.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                          No downloadable notes uploaded yet for this course.
                        </div>
                      ) : (
                        courseMaterials.map((mat) => (
                          <div
                            key={mat.id}
                            className="flex items-center justify-between rounded border border-slate-200 bg-white p-2.5"
                          >
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-red-700 shrink-0" />
                              <div>
                                <div className="font-semibold text-slate-900">{mat.title}</div>
                                <div className="text-[11px] text-slate-500">
                                  {mat.fileSize} • Uploaded by {mat.uploadedBy}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => alert(`Downloading: ${mat.title}`)}
                              className="inline-flex items-center space-x-1 rounded border border-slate-300 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 font-medium text-xs"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeTab === 'assignments' && (
                    <div className="space-y-2">
                      {courseAssignments.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                          No active assignments due for this course.
                        </div>
                      ) : (
                        courseAssignments.map((asg) => (
                          <div
                            key={asg.id}
                            className="flex items-center justify-between rounded border border-slate-200 bg-white p-2.5"
                          >
                            <div>
                              <div className="font-semibold text-slate-900">{asg.title}</div>
                              <div className="text-[11px] text-slate-500">
                                Deadline: <span className="font-mono text-slate-700">{asg.dueDate}</span> • {asg.weightage}% Internal Weightage
                              </div>
                            </div>
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700">
                              {asg.status.toUpperCase()}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
