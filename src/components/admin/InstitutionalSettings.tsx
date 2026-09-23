import React, { useState } from 'react';
import {
  Settings,
  Calendar,
  Shield,
  Server,
  CheckCircle,
  Database,
  Lock,
  Layers,
  Save
} from 'lucide-react';
import { ACADEMIC_HOLIDAYS } from '../../data/mockData';

export const InstitutionalSettings: React.FC = () => {
  const [minAttendance, setMinAttendance] = useState(75);
  const [condonationFloor, setCondonationFloor] = useState(65);
  const [lockWindowHours, setLockWindowHours] = useState(24);
  const [termName, setTermName] = useState('Fall 2026');
  const [apiGatewayEndpoint, setApiGatewayEndpoint] = useState('https://api.campus.edu/v1');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Institutional Settings & Academic Policies
            </h1>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-700">
              PRD SEC-08 / 14
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Term Governance, Statutory Attendance Thresholds & Server-Enforced Boundaries
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
        >
          <Save className="h-4 w-4 text-white" />
          <span>Commit System Policies</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-800 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>Institutional academic thresholds committed to master config!</span>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Thresholds */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base pb-2 border-b border-slate-100">
            <Shield className="h-4 w-4 text-blue-600" />
            <h3>Statutory Attendance Governance</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Institutional Minimum Attendance Floor
                </label>
                <span className="font-mono font-bold text-blue-700">{minAttendance}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="90"
                value={minAttendance}
                onChange={(e) => setMinAttendance(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Students below this percentage are automatically flagged Non-Eligible for semester examinations.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Adjudicated Condonation Floor (Medical / OD)
                </label>
                <span className="font-mono font-bold text-indigo-700">{condonationFloor}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="75"
                value={condonationFloor}
                onChange={(e) => setCondonationFloor(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Absolute minimum floor permitted for Dean-level condonations with validated medical proof.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Faculty Session Attendance Lock Window
                </label>
                <span className="font-mono font-bold text-slate-900">{lockWindowHours} Hours</span>
              </div>
              <select
                value={lockWindowHours}
                onChange={(e) => setLockWindowHours(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none"
              >
                <option value={12}>12 Hours (Strict)</option>
                <option value={24}>24 Hours (Standard Institutional)</option>
                <option value={48}>48 Hours (Relaxed)</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                After this window expires, attendance records are locked and require Admin petition adjudication.
              </p>
            </div>
          </div>
        </div>

        {/* Backend & Architectural Integration */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base pb-2 border-b border-slate-100">
            <Server className="h-4 w-4 text-emerald-600" />
            <h3>Spring Boot REST API & Infrastructure</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Java Spring Boot API Gateway Base URL
              </label>
              <input
                type="text"
                value={apiGatewayEndpoint}
                onChange={(e) => setApiGatewayEndpoint(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono text-slate-800 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Matches Java Spring Boot REST controllers: <code>/api/v1/auth</code>, <code>/api/v1/attendance</code>, <code>/api/v1/courses</code>.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Primary Relational Database:</span>
                <span className="font-mono text-emerald-700 font-bold">MySQL 8.4 LTS (InnoDB / JPA)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Multi-Tenant Isolation Strategy:</span>
                <span className="font-mono text-blue-700 font-bold">Shared DB + Separate Schemas / RLS</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Cache & Session Broker:</span>
                <span className="font-mono text-slate-700">Redis (Tenant Config & Fast Cache)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Object Storage Subsystem:</span>
                <span className="font-mono text-slate-700">S3 / MinIO (Protected File Assets)</span>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50/60 p-3 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
              <strong>Spring Boot + MySQL Architecture:</strong> Decoupled REST model contracts in <code>/src/services/api.ts</code> and <code>/src/types/index.ts</code> support the Java Spring Boot modular monolith with tenant-scoped authentication and transactional persistence.
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Holidays & Suspensions Schedule */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Institutional Academic Holidays & Recess Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Auto-suspends timetable slots and exempts roll call verification on statutory dates
            </p>
          </div>
          <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-slate-700">
            Fall 2026 Calendar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Date Range</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Observance / Name</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Timetable Engine Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ACADEMIC_HOLIDAYS.map((hol) => (
                <tr key={hol.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{hol.dateRange}</td>
                  <td className="py-3 px-3 text-slate-500">{hol.daysText}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{hol.name}</div>
                    <div className="text-[11px] text-slate-400">{hol.description}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {hol.classification}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-blue-700 font-semibold">{hol.engineImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
