import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  CalendarCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  FileText,
  UserCheck,
  ChevronRight,
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { EnrolledStudentDetail, INITIAL_ENROLLED_STUDENTS, INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyStudentsProps {
  onNavigateTab: (tab: string, param?: string) => void;
}

export const FacultyStudents: React.FC<FacultyStudentsProps> = ({ onNavigateTab }) => {
  const [students, setStudents] = useState<EnrolledStudentDetail[]>(INITIAL_ENROLLED_STUDENTS);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStanding, setFilterStanding] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudentDetail | null>(null);

  const totalCount = students.length;
  const compliantCount = students.filter((s) => s.attendanceStanding === 'Compliant').length;
  const cautionCount = students.filter((s) => s.attendanceStanding === 'Caution (<75%)').length;
  const criticalCount = students.filter((s) => s.attendanceStanding === 'Critical (<70%)').length;

  const filteredStudents = students.filter((std) => {
    const matchesSubject = filterSubject === 'all' || std.courseCode === filterSubject;
    const matchesStanding =
      filterStanding === 'all'
        ? true
        : filterStanding === 'compliant'
        ? std.attendanceStanding === 'Compliant'
        : filterStanding === 'caution'
        ? std.attendanceStanding === 'Caution (<75%)'
        : std.attendanceStanding === 'Critical (<70%)';
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesStanding && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
          <span>Faculty Console</span>
          <span>/</span>
          <span className="font-semibold text-charcoal-900">Student Directory</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
          Enrolled Cohort Roster
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete registry of students enrolled in CS502 and CS508 with attendance and academic standings.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled Cohort</div>
          <div className="text-xl font-black text-charcoal-900 mt-1">120 Students</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across 2 Sections</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-700">Compliant (&gt;80%)</div>
          <div className="text-xl font-black text-emerald-700 mt-1">{compliantCount}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Eligible for Hall Ticket</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-amber-600">Caution (75-80%)</div>
          <div className="text-xl font-black text-amber-600 mt-1">{cautionCount}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Counseling active</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-maroon-700">Critical (&lt;75%)</div>
          <div className="text-xl font-black text-maroon-700 mt-1">{criticalCount}</div>
          <div className="text-[11px] text-maroon-700 font-semibold mt-0.5">Barred from exam</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, PRN, or roll no..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-maroon-700 focus:outline-none"
          >
            <option value="all">All Allotted Courses</option>
            <option value="CS502">CS502 (Section A)</option>
            <option value="CS508">CS508 (Section B)</option>
          </select>

          <select
            value={filterStanding}
            onChange={(e) => setFilterStanding(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-maroon-700 focus:outline-none"
          >
            <option value="all">All Standings</option>
            <option value="compliant">Compliant (&gt;80%)</option>
            <option value="caution">Caution (75-80%)</option>
            <option value="critical">Critical (&lt;75%)</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Showing <strong>{filteredStudents.length}</strong> enrolled students
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student & PRN</th>
                <th className="py-3 px-4">Subject & Section</th>
                <th className="py-3 px-4">Attendance Rate</th>
                <th className="py-3 px-4">Assignments</th>
                <th className="py-3 px-4">Avg Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => (
                <tr
                  key={std.id}
                  onClick={() => setSelectedStudent(std)}
                  className="hover:bg-slate-50/70 transition cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={std.avatar}
                        alt={std.name}
                        className="h-8 w-8 rounded-full border border-slate-200 object-cover shrink-0"
                      />
                      <div>
                        <div className="font-bold text-charcoal-900">{std.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {std.rollNo} • PRN: {std.prn}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-maroon-700">{std.courseCode}</div>
                    <div className="text-[10px] text-slate-500">{std.section}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            std.attendanceRate >= 80
                              ? 'bg-emerald-600'
                              : std.attendanceRate >= 75
                              ? 'bg-amber-500'
                              : 'bg-maroon-700'
                          }`}
                          style={{ width: `${std.attendanceRate}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-charcoal-900">
                        {std.attendanceRate}%
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          std.attendanceStanding === 'Compliant'
                            ? 'bg-emerald-50 text-emerald-800'
                            : std.attendanceStanding === 'Caution (<75%)'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-maroon-50 text-maroon-800'
                        }`}
                      >
                        {std.attendanceStanding}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono font-semibold text-charcoal-900">
                      {std.assignmentsSubmitted}/{std.totalAssignments}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">submitted</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-charcoal-900">{std.averageScore}%</span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(std);
                      }}
                      className="rounded p-1 text-slate-400 hover:text-maroon-700 hover:bg-slate-100 transition"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Student Details Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-charcoal-900">{selectedStudent.name}</h3>
                  <div className="text-xs font-mono text-slate-500">
                    {selectedStudent.rollNo} • PRN: {selectedStudent.prn}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Course / Section</div>
                <div className="font-bold text-charcoal-900 mt-0.5">
                  {selectedStudent.courseCode} ({selectedStudent.section})
                </div>
                <div className="text-[11px] text-slate-500">Semester {selectedStudent.semester}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Attendance Standing</div>
                <div className="font-bold text-charcoal-900 mt-0.5">
                  {selectedStudent.attendanceRate}% ({selectedStudent.attendedHours}/{selectedStudent.totalHours} hrs)
                </div>
                <div
                  className={`text-[10px] font-bold ${
                    selectedStudent.attendanceStanding === 'Compliant'
                      ? 'text-emerald-700'
                      : 'text-maroon-700'
                  }`}
                >
                  {selectedStudent.attendanceStanding}
                </div>
              </div>
            </div>

            {/* Academic Notes */}
            <div className="text-xs">
              <div className="font-bold text-charcoal-900 mb-1">Faculty Academic Remark</div>
              <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                {selectedStudent.academicRemarks}
              </p>
            </div>

            {/* Contact Details */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedStudent.email}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedStudent.phone}</span>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  onNavigateTab('attendance-marker');
                }}
                className="flex items-center space-x-1.5 text-xs font-bold text-maroon-700 hover:underline"
              >
                <CalendarCheck className="h-3.5 w-3.5" />
                <span>Mark Attendance in Roll Call</span>
              </button>

              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg bg-charcoal-900 px-4 py-2 text-xs font-bold text-white hover:bg-charcoal-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
