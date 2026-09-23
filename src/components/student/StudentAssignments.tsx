import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  ExternalLink,
  FileCode,
  Download,
  Filter
} from 'lucide-react';
import { INITIAL_ASSIGNMENTS } from '../../data/mockData';
import { Assignment } from '../../types';

interface StudentAssignmentsProps {
  onOpenUploadModal: (assignment?: Assignment) => void;
}

export const StudentAssignments: React.FC<StudentAssignmentsProps> = ({
  onOpenUploadModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);

  const filtered = assignments.filter((asg) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return asg.status === 'pending' || asg.status === 'draft';
    return asg.status === activeFilter;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Assignments & Laboratory Coursework
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              Internal Evaluation
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Department of Computer Engineering
          </p>
        </div>

        <button
          onClick={() => onOpenUploadModal()}
          className="inline-flex items-center space-x-1.5 rounded bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-800 transition"
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Submit Solution</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-2">
        {[
          { key: 'all', label: 'All Coursework' },
          { key: 'pending', label: 'Pending / Due Soon' },
          { key: 'submitted', label: 'Submitted (Under Review)' },
          { key: 'graded', label: 'Graded & Evaluated' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key as any)}
            className={`rounded px-3 py-1 text-xs transition ${
              activeFilter === f.key
                ? 'bg-red-700 text-white font-bold shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table of Coursework */}
      <div className="rounded border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2.5 px-4 w-28">Course</th>
                <th className="py-2.5 px-4">Assignment Title & Description</th>
                <th className="py-2.5 px-4 font-mono">Submission Deadline</th>
                <th className="py-2.5 px-4 font-mono">Weightage</th>
                <th className="py-2.5 px-4">Status & Grade</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((asg) => {
                const isPending = asg.status === 'pending';
                const isDraft = asg.status === 'draft';
                const isGraded = asg.status === 'graded';
                const isSubmitted = asg.status === 'submitted';

                return (
                  <tr key={asg.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {asg.courseCode}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-1">{asg.numberLabel}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{asg.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-1">{asg.description}</p>
                      {asg.rubricCriteria && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                          Rubric: {asg.rubricCriteria.join(' • ')}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {asg.dueDate}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {asg.weightage}% Internal
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isGraded ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[11px] font-semibold">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Marks: {asg.score} / {asg.totalMarks}</span>
                        </span>
                      ) : isSubmitted ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 text-[11px] font-medium">
                          <CheckCircle2 className="h-3 w-3 text-blue-600" />
                          <span>Submitted (v{asg.submissionVersion || 1})</span>
                        </span>
                      ) : isDraft ? (
                        <span className="inline-flex items-center rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[11px] font-medium">
                          Draft Saved
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 rounded bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 text-[11px] font-medium">
                          <Clock className="h-3 w-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenUploadModal(asg)}
                        className="inline-flex items-center space-x-1 rounded bg-slate-900 px-2.5 py-1 text-white font-medium text-xs hover:bg-slate-800 transition"
                      >
                        <Upload className="h-3 w-3" />
                        <span>{isSubmitted ? 'Resubmit' : 'Upload'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
