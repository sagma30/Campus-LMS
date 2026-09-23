import React from 'react';
import {
  Building2,
  Users,
  FileCheck2,
  ShieldAlert,
  Server,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { ATTENDANCE_PETITIONS, RECENT_AUDIT_LEDGER, CURRENT_ADMIN } from '../../data/mockData';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenDefconModal: () => void;
  isDefconActive: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenDefconModal,
  isDefconActive,
}) => {
  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Institutional Governance & Registrar Registry
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              SPPU AFFILIATED (CODE: 4012)
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET Bhujbal Knowledge City • Dean Margaret Sterling • Super Administrator & Academic Registrar Console
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenDefconModal}
            className={`flex items-center space-x-1.5 rounded px-3 py-1.5 text-xs font-bold text-white transition ${
              isDefconActive ? 'bg-red-700 animate-pulse' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>{isDefconActive ? 'DEFCON LOCKDOWN ARMED' : 'Emergency Lockdown'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="rounded border border-slate-200 bg-white p-3.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="uppercase font-mono text-[10px]">TOTAL IDENTITIES</span>
            <Users className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-1 text-xl font-black text-slate-900">1,548</div>
          <div className="mt-0.5 text-[11px] text-slate-500">1,420 Students • 128 Faculty</div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="uppercase font-mono text-[10px]">PENDING CORRECTIONS</span>
            <FileCheck2 className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-1 text-xl font-black text-slate-900">{ATTENDANCE_PETITIONS.length} Queued</div>
          <div className="mt-0.5 text-[11px] font-semibold text-red-800">3 Threshold Flags</div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="uppercase font-mono text-[10px]">STATUTORY COMPLIANCE</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-1 text-xl font-black text-emerald-700">92.4%</div>
          <div className="mt-0.5 text-[11px] text-slate-500">Above 75% Statutory Floor</div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="uppercase font-mono text-[10px]">LEDGER STATUS</span>
            <Server className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-1 text-xl font-black text-slate-900">Block #88924</div>
          <div className="mt-0.5 text-[11px] font-mono text-emerald-700 font-semibold">Immutable WORM Seal</div>
        </div>
      </div>

      {/* Main Governance Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Academic Structure Card */}
        <div className="rounded border border-slate-200 bg-white p-4 flex flex-col justify-between text-xs">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
              <Building2 className="h-4 w-4 text-red-700" />
              <span>Academic Departments & Curriculum</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Configure engineering departments, programs (B.Tech / M.Tech), semester cohorts, and statutory syllabus structures.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('academic-structure')}
            className="mt-3 inline-flex items-center space-x-1 font-bold text-red-800 hover:text-red-950"
          >
            <span>Manage Academic Units</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* User Management Card */}
        <div className="rounded border border-slate-200 bg-white p-4 flex flex-col justify-between text-xs">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
              <Users className="h-4 w-4 text-red-700" />
              <span>Student & Faculty Registry</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              PRN issuance, directory provisioning, role-based access control (RBAC), and authentication credential controls.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('user-management')}
            className="mt-3 inline-flex items-center space-x-1 font-bold text-red-800 hover:text-red-950"
          >
            <span>Open User Registry</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Attendance Audit & Petitions */}
        <div className="rounded border border-slate-200 bg-white p-4 flex flex-col justify-between text-xs">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
              <FileCheck2 className="h-4 w-4 text-red-700" />
              <span>Attendance Audit & Petitions</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Adjudicate medical leave, biometrics desync issues, and inter-collegiate sports OD dispensations with SHA-256 seals.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('attendance-corrections')}
            className="mt-3 inline-flex items-center space-x-1 font-bold text-red-800 hover:text-red-950"
          >
            <span>Review Pending Petitions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Recent WORM Ledger Entries */}
      <div className="rounded border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Official University Attendance Ledger Stream
            </h2>
            <p className="text-[11px] text-slate-500">
              Immutable state transitions sealed under Section 18 governance
            </p>
          </div>
          <span className="font-mono text-[10px] text-slate-500">Live Mirror</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2 px-3">Block</th>
                <th className="py-2 px-3">Student & PRN</th>
                <th className="py-2 px-3">Subject</th>
                <th className="py-2 px-3">Transition</th>
                <th className="py-2 px-3">Authorized By</th>
                <th className="py-2 px-3">SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_AUDIT_LEDGER.map((log) => (
                <tr key={log.blockNumber} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono font-bold text-slate-900">{log.blockNumber}</td>
                  <td className="py-2 px-3">
                    <span className="font-semibold text-slate-900">{log.studentName}</span>
                    <span className="text-slate-500 text-[10px] ml-1">({log.studentRoll})</span>
                  </td>
                  <td className="py-2 px-3 font-mono">{log.courseCode}</td>
                  <td className="py-2 px-3">
                    <span className="font-mono font-bold text-red-700">{log.stateTransition.from}</span>
                    <span className="text-slate-400 mx-1">→</span>
                    <span className="font-mono font-bold text-emerald-700">{log.stateTransition.to}</span>
                  </td>
                  <td className="py-2 px-3 text-slate-700">{log.authorizedBy}</td>
                  <td className="py-2 px-3 font-mono text-[10px] text-slate-500">{log.sha256Hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
