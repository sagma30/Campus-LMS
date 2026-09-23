import React from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import { CURRENT_STUDENT, RECENT_AUDIT_LEDGER } from '../../data/mockData';
import { AcademicPerformance } from './AcademicPerformance';

export const StudentJourney: React.FC = () => {
  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Academic Journey & Transcripts
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              CGPA: {CURRENT_STUDENT.cgpa.toFixed(2)} / 10.0
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Department of Computer Engineering • Official Transcript & Ledger
          </p>
        </div>

        <div className="text-xs text-slate-600 font-mono">
          PRN: <strong className="text-slate-900">MET-CS-2024-819</strong>
        </div>
      </div>

      {/* Progress Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] uppercase">DEGREE CREDITS EARNED</span>
            <Layers className="h-4 w-4 text-slate-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {CURRENT_STUDENT.earnedCredits} <span className="text-xs font-normal text-slate-400">/ {CURRENT_STUDENT.totalDegreeCredits} Cr</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-red-700"
              style={{ width: `${(CURRENT_STUDENT.earnedCredits / CURRENT_STUDENT.totalDegreeCredits) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            57.5% Degree Requirement Satisfied (On Track)
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] uppercase">OVERALL ATTENDANCE</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-700">
            {CURRENT_STUDENT.aggregateAttendance}%
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${CURRENT_STUDENT.aggregateAttendance}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-emerald-800 font-semibold">
            Compliant (+13.4% above 75% Statutory Floor)
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] uppercase">ACADEMIC HONORS</span>
            <Award className="h-4 w-4 text-red-700" />
          </div>
          <div className="text-xl font-black text-slate-900">
            Dean's List Cohort
          </div>
          <div className="mt-1 text-xs text-red-800 font-semibold">
            Distinction in Semesters 1 – 4
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Advisor: {CURRENT_STUDENT.academicAdvisor}
          </div>
        </div>
      </div>

      {/* Recharts GPA Trend Chart */}
      <AcademicPerformance />

      {/* Semester Journey Milestones */}
      <div className="rounded border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
          Semester Transcript Milestones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {[
            { sem: 'Sem 1', gpa: '9.10', status: 'Completed', creds: '22 Cr', title: 'Foundations of Computing' },
            { sem: 'Sem 2', gpa: '8.85', status: 'Completed', creds: '20 Cr', title: 'Data Structures & Hardware' },
            { sem: 'Sem 3', gpa: '8.95', status: 'Completed', creds: '24 Cr', title: 'OS & OOP Paradigm' },
            { sem: 'Sem 4', gpa: '8.78', status: 'Completed', creds: '26 Cr', title: 'Theory of Computation' },
            { sem: 'Sem 5', gpa: 'Current', status: 'Active (Fall 2026)', creds: '17 Cr', title: 'Distributed Systems & Lab' },
          ].map((item, idx) => (
            <div
              key={item.sem}
              className={`rounded border p-3 text-xs ${
                idx === 4 ? 'border-red-600 bg-red-50/40 ring-1 ring-red-600' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">{item.sem}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  idx === 4 ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-1.5 text-base font-black text-slate-900 font-mono">
                {item.gpa === 'Current' ? '8.92 (Proj.)' : `GPA ${item.gpa}`}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-mono">{item.creds}</div>
              <div className="mt-1.5 text-[11px] text-slate-600 truncate">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Attendance Ledger Table */}
      <div className="rounded border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Institutional Statutory Attendance Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Immutable records anchored under university compliance rules (PRD SEC-18)
            </p>
          </div>
          <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-mono text-slate-600 font-semibold border border-slate-200">
            WORM Compliant
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Block / Timestamp</th>
                <th className="py-2.5 px-3">Subject & Session</th>
                <th className="py-2.5 px-3">State Transition</th>
                <th className="py-2.5 px-3">Adjudication Grounds</th>
                <th className="py-2.5 px-3">Authorized By</th>
                <th className="py-2.5 px-3">SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_AUDIT_LEDGER.map((log) => (
                <tr key={log.blockNumber} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono">
                    <div className="font-bold text-slate-900">{log.blockNumber}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900 font-mono">{log.courseCode}</span>
                    <span className="text-slate-600"> • {log.sessionDesc}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center space-x-1 font-mono font-bold">
                      <span className="text-red-700">{log.stateTransition.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-emerald-700">{log.stateTransition.to}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{log.grounds}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-medium">{log.authorizedBy}</td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{log.sha256Hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
