import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  ChevronRight,
  Download,
  QrCode,
  ShieldCheck,
  MapPin,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  CURRENT_STUDENT,
  ENROLLED_COURSES,
  TODAY_TIMETABLE_SLOTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTICES,
  INITIAL_CAMPUS_EVENTS,
} from '../../data/mockData';
import { Assignment } from '../../types';
import { AcademicPerformance } from './AcademicPerformance';

interface StudentDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenUploadModal: (assignment?: Assignment) => void;
  onOpenDigitalLecture: () => void;
  onOpenBadgeModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenUploadModal,
  onOpenDigitalLecture,
  onOpenBadgeModal,
}) => {
  const [deliverablesTab, setDeliverablesTab] = useState<'due' | 'submitted' | 'graded'>('due');

  const inProgressSlot = TODAY_TIMETABLE_SLOTS.find((s) => s.status === 'in_progress');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome & Academic Identity Header Banner */}
      <div className="rounded border border-slate-200 bg-white p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-maroon-700" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-maroon-800 font-mono">
                MET BKC • STUDENT ACADEMIC PORTAL
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-charcoal-900 mt-1">
              Welcome, {CURRENT_STUDENT.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-600">
              <span className="font-mono font-medium text-charcoal-900">PRN: MET-CS-2024-819</span>
              <span>•</span>
              <span>B.Tech Computer Engineering</span>
              <span>•</span>
              <span className="font-semibold text-charcoal-900">
                Semester V (Section A)
              </span>
              <span>•</span>
              <span>Academic Year 2026–27</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <button
              onClick={() => onNavigateTab('timetable')}
              className="inline-flex items-center space-x-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>Full Timetable</span>
            </button>
            <button
              onClick={() => onOpenUploadModal()}
              className="inline-flex items-center space-x-1.5 rounded bg-charcoal-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-charcoal-800 transition"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Submit Assignment</span>
            </button>
          </div>
        </div>

        {/* Live Status Alert Strip if a Class is in progress */}
        {inProgressSlot && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded border border-maroon-200 bg-maroon-50/60 px-3.5 py-2.5 gap-2 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-2 w-2 rounded-full bg-maroon-700 animate-pulse" />
              <div>
                <span className="font-bold text-maroon-950 font-mono">{inProgressSlot.courseCode}</span>
                <span className="text-maroon-900 font-medium ml-1.5">{inProgressSlot.courseName}</span>
                <span className="text-maroon-800 ml-2 font-mono text-[11px]">
                  ({inProgressSlot.startTime} – {inProgressSlot.endTime} • {inProgressSlot.room})
                </span>
              </div>
            </div>
            <button
              onClick={onOpenDigitalLecture}
              className="self-start sm:self-auto inline-flex items-center space-x-1.5 rounded bg-maroon-700 px-3 py-1 text-xs font-bold text-white hover:bg-maroon-800 transition"
            >
              <span>Join Digital Class</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Today's Academic Schedule (Timetable) */}
      <div className="rounded border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide">
              Today's Academic Schedule
            </h2>
            <p className="text-xs text-slate-500">
              Tuesday, September 22, 2026 • 4 Scheduled Class Sessions
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('timetable')}
            className="text-xs font-semibold text-charcoal-800 hover:text-maroon-700 inline-flex items-center space-x-1"
          >
            <span>View Weekly Grid</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Schedule Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2.5 px-3">Time Window</th>
                <th className="py-2.5 px-3">Course Code & Subject</th>
                <th className="py-2.5 px-3">Faculty In-Charge</th>
                <th className="py-2.5 px-3">Venue / Room</th>
                <th className="py-2.5 px-3">Attendance Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {TODAY_TIMETABLE_SLOTS.map((slot) => {
                if (slot.isRecess) {
                  return (
                    <tr key={slot.id} className="bg-slate-50/70 text-slate-500">
                      <td className="py-2 px-3 font-mono font-medium">{slot.timeWindow}</td>
                      <td colSpan={4} className="py-2 px-3 italic font-medium">
                        {slot.courseName} (Institutional Intermission)
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-[11px]">60 Mins</td>
                    </tr>
                  );
                }

                const isInProgress = slot.status === 'in_progress';

                return (
                  <tr
                    key={slot.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isInProgress ? 'bg-maroon-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {slot.startTime} – {slot.endTime}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-charcoal-900">{slot.courseCode}</div>
                      <div className="text-slate-600">{slot.courseName}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{slot.faculty}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{slot.room}</td>
                    <td className="py-2.5 px-3">
                      {isInProgress ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-maroon-100 text-maroon-900 px-2 py-0.5 font-bold font-mono text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-maroon-700 animate-pulse" />
                          <span>Live Session</span>
                        </span>
                      ) : slot.attendanceStatus === 'Present' ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 font-semibold text-[11px]">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Present</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px]">
                          Scheduled
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {isInProgress ? (
                        <button
                          onClick={onOpenDigitalLecture}
                          className="inline-flex items-center space-x-1 rounded bg-maroon-700 px-2.5 py-1 text-white font-bold text-xs hover:bg-maroon-800 transition"
                        >
                          <span>Join</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateTab('materials')}
                          className="text-slate-600 hover:text-charcoal-900 text-xs font-medium"
                        >
                          Course Notes
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Attendance Summary (Simple, Readable Table & Compliance Banner) */}
      <div className="rounded border border-slate-200 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
          <div>
            <h2 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide">
              Statutory Attendance Summary
            </h2>
            <p className="text-xs text-slate-500">
              Institutional Requirement: Minimum 75% attendance per course under SPPU regulations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-xs">
              <span className="text-slate-500">Aggregate: </span>
              <span className="font-mono font-black text-charcoal-900 text-base">
                {CURRENT_STUDENT.aggregateAttendance}%
              </span>
              <span className="text-slate-400 text-[11px] ml-1">
                ({CURRENT_STUDENT.attendedSessions}/{CURRENT_STUDENT.totalSessions} hrs)
              </span>
            </div>
            <span className="rounded bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 text-xs">
              Compliant
            </span>
          </div>
        </div>

        {/* Subject-wise Attendance Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2 px-3">Subject Code</th>
                <th className="py-2 px-3">Course Title</th>
                <th className="py-2 px-3">Faculty In-Charge</th>
                <th className="py-2 px-3 font-mono">Attended / Total</th>
                <th className="py-2 px-3 w-40">Attendance Progress</th>
                <th className="py-2 px-3 font-mono">Rate</th>
                <th className="py-2 px-3 text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ENROLLED_COURSES.map((course) => {
                const isCaution = course.attendanceFlag === 'caution';
                return (
                  <tr key={course.code} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-mono font-bold text-charcoal-900">
                      {course.code}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{course.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{course.facultyName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {course.attendedHours} / {course.totalHours} hrs
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCaution ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${course.attendanceRate}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-charcoal-900">
                      {course.attendanceRate}%
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {isCaution ? (
                        <span className="rounded bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 text-[10px]">
                          Borderline
                        </span>
                      ) : (
                        <span className="rounded bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 text-[10px] border border-emerald-200">
                          Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Official attendance records updated automatically after each faculty roll call.</span>
          <button
            onClick={() => onNavigateTab('journey')}
            className="font-semibold text-charcoal-800 hover:text-maroon-700 inline-flex items-center space-x-1"
          >
            <span>View Statutory Attendance Audit Ledger</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 4. Academic Performance & GPA Trend Chart Component */}
      <AcademicPerformance onNavigateJourney={() => onNavigateTab('journey')} />

      {/* 5. Academic Deliverables & Upcoming Assignments */}
      <div className="rounded border border-slate-200 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
          <div>
            <h2 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide">
              Coursework Deliverables & Assignments
            </h2>
            <p className="text-xs text-slate-500">
              Submit code, laboratory write-ups, and project reports
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center rounded border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
            <button
              onClick={() => setDeliverablesTab('due')}
              className={`px-3 py-1 rounded transition ${
                deliverablesTab === 'due'
                  ? 'bg-white font-bold text-charcoal-900 shadow-xs'
                  : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              Pending Submissions (2)
            </button>
            <button
              onClick={() => setDeliverablesTab('submitted')}
              className={`px-3 py-1 rounded transition ${
                deliverablesTab === 'submitted'
                  ? 'bg-white font-bold text-charcoal-900 shadow-xs'
                  : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              Submitted (2)
            </button>
            <button
              onClick={() => setDeliverablesTab('graded')}
              className={`px-3 py-1 rounded transition ${
                deliverablesTab === 'graded'
                  ? 'bg-white font-bold text-charcoal-900 shadow-xs'
                  : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              Evaluated
            </button>
          </div>
        </div>

        {/* Deliverables Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Assignment Title</th>
                <th className="py-2.5 px-3 font-mono">Submission Deadline</th>
                <th className="py-2.5 px-3">Weightage</th>
                <th className="py-2.5 px-3">Submission Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_ASSIGNMENTS.filter((asg) => {
                if (deliverablesTab === 'due') return asg.status === 'pending';
                if (deliverablesTab === 'submitted') return asg.status === 'submitted';
                return asg.status === 'graded';
              }).map((asg) => (
                <tr key={asg.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-charcoal-900">
                    {asg.courseCode}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-charcoal-900">{asg.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{asg.description}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                    {asg.dueDate}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {asg.weightage}% of Internal
                  </td>
                  <td className="py-2.5 px-3">
                    {asg.status === 'submitted' ? (
                      <span className="inline-flex items-center space-x-1 rounded bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 text-[11px] font-medium">
                        <CheckCircle2 className="h-3 w-3 text-blue-600" />
                        <span>Submitted (v{asg.submissionVersion || 1})</span>
                      </span>
                    ) : asg.status === 'graded' ? (
                      <span className="inline-flex items-center space-x-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[11px] font-medium">
                        <span>Score: {asg.score}/{asg.totalMarks}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 rounded bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 text-[11px] font-medium">
                        <Clock className="h-3 w-3 text-amber-600" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onOpenUploadModal(asg)}
                      className="inline-flex items-center space-x-1 rounded bg-charcoal-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-charcoal-800 transition"
                    >
                      <Upload className="h-3 w-3" />
                      <span>{asg.status === 'submitted' ? 'Resubmit' : 'Upload'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6 & 7. Institutional Notices & Campus Events (Dual Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 6. Important Institutional Notices */}
        <div className="rounded border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
            <div>
              <h2 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide">
                Campus Notice Board
              </h2>
              <p className="text-xs text-slate-500">Official circulars from MET BKC Administration</p>
            </div>
            <span className="text-[11px] font-mono text-slate-700 font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {INITIAL_NOTICES.slice(0, 3).map((notice) => (
              <div key={notice.id} className="rounded border border-slate-200 bg-slate-50/60 p-3 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-maroon-800">{notice.authorRole}</span>
                  <span className="font-mono">{notice.timestamp}</span>
                </div>
                <h3 className="font-bold text-charcoal-900">{notice.title}</h3>
                <p className="text-slate-600 mt-1 leading-relaxed">{notice.summary}</p>
                {notice.hasAttachment && (
                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono truncate max-w-[200px]">
                      {notice.attachmentName}
                    </span>
                    <button
                      onClick={() => alert(`Downloading official circular: ${notice.attachmentName}`)}
                      className="inline-flex items-center space-x-1 font-semibold text-charcoal-800 hover:text-maroon-700"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7. Campus Events & On-Duty Dispensations */}
        <div className="rounded border border-slate-200 bg-white p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Academic & Technical Events
                </h2>
                <p className="text-xs text-slate-500">Approved extra-curriculars with On-Duty Attendance</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-600">SPPU Sanctioned</span>
            </div>

            {INITIAL_CAMPUS_EVENTS.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="mb-3 rounded border border-slate-200 bg-slate-50/60 p-3 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500">{event.eventCode}</span>
                  {event.isRegistered ? (
                    <span className="rounded bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 text-[10px]">
                      Registered (Confirmed)
                    </span>
                  ) : (
                    <span className="rounded bg-slate-200 text-slate-700 font-medium px-1.5 py-0.5 text-[10px]">
                      Open
                    </span>
                  )}
                </div>

                <div className="font-bold text-slate-900">{event.title}</div>
                <p className="text-slate-600 leading-snug line-clamp-2">{event.subtitle}</p>

                <div className="flex flex-wrap items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    {event.datesText}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    {event.venue.split('&')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Student Pass: #HC-8819-2026</span>
            <button
              onClick={onOpenBadgeModal}
              className="inline-flex items-center space-x-1.5 rounded border border-slate-300 bg-white px-2.5 py-1 font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              <QrCode className="h-3.5 w-3.5 text-slate-600" />
              <span>View Access Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
