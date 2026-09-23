import React, { useState } from 'react';
import {
  CalendarCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Download,
  Check,
  X,
  Clock,
  ShieldCheck,
  Filter,
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { StudentSessionAttendance } from '../../types';
import { FACULTY_CLASS_ROSTER } from '../../data/mockData';
import { INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyAttendanceProps {
  onNavigateTab?: (tab: string) => void;
}

export const FacultyAttendance: React.FC<FacultyAttendanceProps> = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('CS502');
  const [selectedSection, setSelectedSection] = useState<string>('Section A');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-22');
  const [selectedSlot, setSelectedSlot] = useState<string>('Slot 2 (10:00 AM – 11:30 AM)');
  const [sessionTopic, setSessionTopic] = useState<string>('Raft Consensus Protocol & Leader Election (Session #28)');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStanding, setFilterStanding] = useState<string>('all');

  // Local roster state
  const [roster, setRoster] = useState<StudentSessionAttendance[]>(FACULTY_CLASS_ROSTER);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [savedTimestamp, setSavedTimestamp] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Statistics
  const presentCount = roster.filter((s) => s.sessionStatus === 'Present').length;
  const absentCount = roster.filter((s) => s.sessionStatus === 'Absent').length;
  const excusedCount = roster.filter((s) => s.sessionStatus === 'Excused').length;
  const totalCount = roster.length;
  const currentRate = totalCount > 0 ? ((presentCount + excusedCount) / totalCount) * 100 : 0;

  // Toggle student session status
  const updateStudentStatus = (studentId: string, status: 'Present' | 'Absent' | 'Excused') => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, sessionStatus: status } : s))
    );
    setIsSaved(false);
  };

  const updateRemarks = (studentId: string, remarks: string) => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, remarks } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, sessionStatus: 'Present' })));
    setIsSaved(false);
  };

  const handleClearAll = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, sessionStatus: 'Absent' })));
    setIsSaved(false);
  };

  const handleSaveAttendance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      const now = new Date();
      setSavedTimestamp(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 500);
  };

  const handleExportCSV = () => {
    const csvHeader = 'RollNo,Name,Department,Section,SessionStatus,Remarks\n';
    const csvRows = roster
      .map(
        (s) =>
          `"${s.rollNo}","${s.name}","${s.department}","${s.section}","${s.sessionStatus}","${s.remarks || ''}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${selectedSubject}_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredRoster = roster.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStanding =
      filterStanding === 'all'
        ? true
        : filterStanding === 'compliant'
        ? student.overallAttendanceStatus === 'Compliant'
        : filterStanding === 'caution'
        ? student.overallAttendanceStatus === 'Under 75%'
        : student.overallAttendanceStatus.includes('Critical');
    return matchesSearch && matchesStanding;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="font-semibold text-charcoal-900">Attendance Roll Call</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Attendance & Digital Roll Call
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mark, audit, and publish statutory classroom attendance records for assigned subjects.
          </p>
        </div>

        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-charcoal-900 hover:bg-slate-50 transition shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleSaveAttendance}
            disabled={isSubmitting}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{isSubmitting ? 'Recording...' : 'Save & Publish Session'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {isSaved && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-900 flex items-start justify-between shadow-xs animate-fadeIn">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-emerald-950">
                Attendance Record Successfully Recorded & Sealed
              </div>
              <p className="text-emerald-800 mt-0.5">
                Attendance for <strong>{selectedSubject} ({selectedSection})</strong> on{' '}
                <strong>{selectedDate}</strong> has been saved at <strong>{savedTimestamp}</strong>.{' '}
                Present: {presentCount}, Absent: {absentCount}, Excused: {excusedCount}. (24h edit window active).
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSaved(false)}
            className="rounded p-1 text-emerald-700 hover:bg-emerald-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Configuration Controls Bar (Subject, Section, Date, Slot) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Subject Dropdown */}
          <div>
            <label className="block font-bold text-charcoal-900 mb-1.5">
              Subject Course
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-charcoal-900 font-semibold focus:border-maroon-700 focus:bg-white focus:outline-none"
            >
              {INITIAL_FACULTY_SUBJECTS.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div>
            <label className="block font-bold text-charcoal-900 mb-1.5">
              Class / Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-charcoal-900 font-semibold focus:border-maroon-700 focus:bg-white focus:outline-none"
            >
              <option value="Section A">Section A (62 Enrolled)</option>
              <option value="Section B">Section B (58 Enrolled)</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block font-bold text-charcoal-900 mb-1.5">
              Session Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-charcoal-900 font-mono font-semibold focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Lecture Slot */}
          <div>
            <label className="block font-bold text-charcoal-900 mb-1.5">
              Timetable Slot
            </label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-charcoal-900 font-semibold focus:border-maroon-700 focus:bg-white focus:outline-none"
            >
              <option value="Slot 1 (08:30 AM – 09:45 AM)">Slot 1 (08:30 AM – 09:45 AM)</option>
              <option value="Slot 2 (10:00 AM – 11:30 AM)">Slot 2 (10:00 AM – 11:30 AM)</option>
              <option value="Slot 3 (11:45 AM – 01:15 PM)">Slot 3 (11:45 AM – 01:15 PM)</option>
              <option value="Slot 4 (02:15 PM – 03:45 PM)">Slot 4 (02:15 PM – 03:45 PM)</option>
            </select>
          </div>
        </div>

        {/* Topic Input */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex-1">
            <span className="text-slate-500 font-medium mr-2">Topic / Module:</span>
            <input
              type="text"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              placeholder="e.g. Unit 2: Consensus & Leader Election"
              className="w-full sm:w-auto sm:min-w-[420px] rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Faculty ID: <strong>FAC-2018-042</strong> authorized for {selectedSubject}</span>
          </div>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Enrolled</div>
          <div className="mt-1 text-xl font-black text-charcoal-900">{totalCount} Students</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{selectedSection}</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Present</div>
          <div className="mt-1 text-xl font-black text-emerald-700">{presentCount}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
            {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}% of cohort
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-maroon-700">Absent</div>
          <div className="mt-1 text-xl font-black text-maroon-700">{absentCount}</div>
          <div className="text-[11px] text-maroon-700 font-semibold mt-0.5">
            {totalCount > 0 ? Math.round((absentCount / totalCount) * 100) : 0}% absent
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Excused / Medical</div>
          <div className="mt-1 text-xl font-black text-charcoal-900">{excusedCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">With approved slips</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs col-span-2 lg:col-span-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Session Attendance</div>
          <div className="mt-1 text-xl font-black text-charcoal-900">
            {currentRate.toFixed(1)}%
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 mt-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                currentRate >= 80 ? 'bg-emerald-600' : currentRate >= 75 ? 'bg-amber-500' : 'bg-maroon-700'
              }`}
              style={{ width: `${currentRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Roster Controls: Search, Quick Buttons */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student by name or roll number..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
              />
            </div>

            <select
              value={filterStanding}
              onChange={(e) => setFilterStanding(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-2.5 text-xs text-slate-700 focus:border-maroon-700 focus:outline-none"
            >
              <option value="all">All Attendance Standings</option>
              <option value="compliant">Compliant (&gt;80%)</option>
              <option value="caution">Caution (75-80%)</option>
              <option value="critical">Critical (&lt;75%)</option>
            </select>
          </div>

          {/* Fast Toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMarkAllPresent}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-900 hover:bg-slate-50 transition shadow-xs"
            >
              Mark All Present
            </button>
            <button
              onClick={handleClearAll}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-900 hover:bg-slate-50 transition shadow-xs"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Student List Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Roll / PRN</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-4">Cumulative Rate</th>
                <th className="py-2.5 px-4 text-center">Session Roll Call</th>
                <th className="py-2.5 px-4">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoster.map((student) => {
                const isPresent = student.sessionStatus === 'Present';
                const isAbsent = student.sessionStatus === 'Absent';
                const isExcused = student.sessionStatus === 'Excused';

                return (
                  <tr key={student.studentId} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-charcoal-900">
                      {student.rollNo}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 font-mono text-[10px] font-bold text-charcoal-900">
                          {student.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal-900">{student.name}</div>
                          <div className="text-[10px] text-slate-500">{student.department} • {student.section}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.overallAttendanceRate >= 80
                                ? 'bg-emerald-600'
                                : student.overallAttendanceRate >= 75
                                ? 'bg-amber-500'
                                : 'bg-maroon-700'
                            }`}
                            style={{ width: `${student.overallAttendanceRate}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-charcoal-900">
                          {student.overallAttendanceRate}%
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                            student.overallAttendanceStatus === 'Compliant'
                              ? 'bg-emerald-50 text-emerald-700'
                              : student.overallAttendanceStatus === 'Under 75%'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-maroon-50 text-maroon-800'
                          }`}
                        >
                          {student.overallAttendanceStatus}
                        </span>
                      </div>
                    </td>

                    {/* Interactive 3-way toggle buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1 rounded-md bg-slate-100 p-1 w-fit mx-auto border border-slate-200">
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.studentId, 'Present')}
                          className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${
                            isPresent
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'text-slate-600 hover:text-charcoal-900'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.studentId, 'Absent')}
                          className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${
                            isAbsent
                              ? 'bg-maroon-700 text-white shadow-xs'
                              : 'text-slate-600 hover:text-charcoal-900'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.studentId, 'Excused')}
                          className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${
                            isExcused
                              ? 'bg-charcoal-900 text-white shadow-xs'
                              : 'text-slate-600 hover:text-charcoal-900'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={student.remarks || ''}
                        onChange={(e) => updateRemarks(student.studentId, e.target.value)}
                        placeholder="Add remark..."
                        className="w-full rounded border border-transparent bg-transparent px-2 py-1 text-xs text-charcoal-900 hover:border-slate-300 focus:border-maroon-700 focus:bg-white focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-slate-100 gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <AlertCircle className="h-4 w-4 text-maroon-700 shrink-0" />
            <span>
              University Policy: Attendance records become immutable 24 hours after publishing.
            </span>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button
              onClick={handleSaveAttendance}
              disabled={isSubmitting}
              className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isSubmitting ? 'Recording Roll Call...' : 'Save & Publish Attendance'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
