import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { CURRENT_STUDENT, SEMESTER_GPA_HISTORY } from '../../data/mockData';
import { SemesterGpaRecord } from '../../types';

interface AcademicPerformanceProps {
  onNavigateJourney?: () => void;
  compact?: boolean;
}

export const AcademicPerformance: React.FC<AcademicPerformanceProps> = ({
  onNavigateJourney,
}) => {
  const [metricView, setMetricView] = useState<'both' | 'sgpa' | 'cgpa'>('both');
  const [showThreshold, setShowThreshold] = useState<boolean>(true);

  // Clean institutional tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: SemesterGpaRecord = payload[0].payload;
      return (
        <div className="rounded border border-slate-300 bg-white p-2.5 shadow-md text-xs font-sans">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 gap-4">
            <span className="font-bold text-slate-900">{data.semester} ({data.semesterLabel})</span>
            <span className="font-mono text-[10px] text-slate-500 font-semibold">{data.status}</span>
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Semester SGPA:</span>
              <span className="font-bold text-charcoal-900">{data.sgpa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Cumulative CGPA:</span>
              <span className="font-bold text-maroon-800">{data.cgpa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-slate-100 text-[10px]">
              <span className="text-slate-500">Earned Credits:</span>
              <span className="font-semibold text-slate-700">{data.creditsEarned} / {data.totalCredits} Cr</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded border border-slate-200 bg-white p-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wide">
              Semester GPA & Academic Performance Trajectory
            </h3>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              10.0 Scale
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Undergraduate credit transcript trend across Semesters 1 to 5 (B.Tech Computer Engineering)
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              onClick={() => setMetricView('both')}
              className={`px-2 py-0.5 rounded text-xs transition ${
                metricView === 'both' ? 'bg-white font-bold text-charcoal-900 shadow-xs' : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMetricView('sgpa')}
              className={`px-2 py-0.5 rounded text-xs transition ${
                metricView === 'sgpa' ? 'bg-white font-bold text-charcoal-900 shadow-xs' : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              SGPA
            </button>
            <button
              onClick={() => setMetricView('cgpa')}
              className={`px-2 py-0.5 rounded text-xs transition ${
                metricView === 'cgpa' ? 'bg-white font-bold text-charcoal-900 shadow-xs' : 'text-slate-600 hover:text-charcoal-900'
              }`}
            >
              CGPA
            </button>
          </div>

          <button
            onClick={() => setShowThreshold(!showThreshold)}
            className={`px-2 py-1 rounded border text-xs font-medium transition ${
              showThreshold ? 'border-maroon-300 bg-maroon-50 text-maroon-900 font-semibold' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Dean's Floor (8.50)
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="border border-slate-200 bg-slate-50/60 p-2.5 rounded">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Current CGPA</div>
          <div className="mt-0.5 text-lg font-black text-charcoal-900">
            {CURRENT_STUDENT.cgpa.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 10.0</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-medium">First Class with Distinction</div>
        </div>

        <div className="border border-slate-200 bg-slate-50/60 p-2.5 rounded">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Sem 5 Projected</div>
          <div className="mt-0.5 text-lg font-black text-charcoal-900">
            8.92 <span className="text-[10px] font-mono font-normal text-slate-500">(Mid-term)</span>
          </div>
          <div className="text-[10px] text-slate-500">5 Courses in Progress</div>
        </div>

        <div className="border border-slate-200 bg-slate-50/60 p-2.5 rounded">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Earned Credits</div>
          <div className="mt-0.5 text-lg font-black text-charcoal-900">
            {CURRENT_STUDENT.earnedCredits} <span className="text-xs font-normal text-slate-400">/ {CURRENT_STUDENT.totalDegreeCredits} Cr</span>
          </div>
          <div className="text-[10px] text-slate-500">57.5% Completed</div>
        </div>

        <div className="border border-slate-200 bg-slate-50/60 p-2.5 rounded">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Honors Standing</div>
          <div className="mt-0.5 text-sm font-bold text-charcoal-900 truncate">
            Dean's List Cohort
          </div>
          <div className="text-[10px] text-slate-500 truncate">Advisor: {CURRENT_STUDENT.academicAdvisor}</div>
        </div>
      </div>

      {/* Recharts Line Trend */}
      <div className="mt-3 border border-slate-200 bg-white p-3 rounded">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <div className="flex items-center space-x-4">
            {(metricView === 'both' || metricView === 'sgpa') && (
              <span className="flex items-center space-x-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-slate-800" />
                <span>Semester GPA (SGPA)</span>
              </span>
            )}
            {(metricView === 'both' || metricView === 'cgpa') && (
              <span className="flex items-center space-x-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-maroon-700" />
                <span className="text-maroon-900">Cumulative GPA (CGPA)</span>
              </span>
            )}
            {showThreshold && (
              <span className="flex items-center space-x-1.5 font-medium text-slate-500">
                <span className="h-0.5 w-3 border-t border-dashed border-maroon-600 inline-block" />
                <span>Dean's Floor (8.50)</span>
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-400">Min 7.5 — Max 10.0</span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={SEMESTER_GPA_HISTORY}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="semester"
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis
                domain={[7.5, 10.0]}
                ticks={[8.0, 8.5, 9.0, 9.5, 10.0]}
                tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {showThreshold && (
                <ReferenceLine
                  y={8.50}
                  stroke="#7a1526"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              )}
              {(metricView === 'both' || metricView === 'sgpa') && (
                <Line
                  type="monotone"
                  dataKey="sgpa"
                  name="SGPA"
                  stroke="#334155"
                  strokeWidth={2}
                  dot={{ r: 3.5, stroke: '#334155', strokeWidth: 1.5, fill: '#ffffff' }}
                  activeDot={{ r: 5, stroke: '#0f172a', strokeWidth: 2, fill: '#ffffff' }}
                />
              )}
              {(metricView === 'both' || metricView === 'cgpa') && (
                <Line
                  type="monotone"
                  dataKey="cgpa"
                  name="CGPA"
                  stroke="#7a1526"
                  strokeWidth={2.5}
                  dot={{ r: 4, stroke: '#7a1526', strokeWidth: 1.5, fill: '#ffffff' }}
                  activeDot={{ r: 5, stroke: '#581522', strokeWidth: 2, fill: '#ffffff' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer link */}
      {onNavigateJourney && (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Official Grade Report verified by MET BKC Examination Registry</span>
          <button
            onClick={onNavigateJourney}
            className="font-semibold text-red-800 hover:text-red-950 inline-flex items-center space-x-1"
          >
            <span>Full Semester Transcripts</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};
