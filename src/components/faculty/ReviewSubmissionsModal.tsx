import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle,
  Code,
  Download,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface ReviewSubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
}

interface StudentSubmissionItem {
  id: string;
  studentName: string;
  rollNo: string;
  fileName: string;
  submittedAt: string;
  testPassRate: number;
  grade: string;
  score: number;
  feedback: string;
  status: 'reviewed' | 'pending';
}

export const ReviewSubmissionsModal: React.FC<ReviewSubmissionsModalProps> = ({
  isOpen,
  onClose,
  assignmentTitle,
}) => {
  const [submissions, setSubmissions] = useState<StudentSubmissionItem[]>([
    {
      id: 'sub_1',
      studentName: 'Elena Vance',
      rollNo: 'CS-2024-819',
      fileName: 'raft_state_machine_v2.tar.gz',
      submittedAt: 'Today, 10:14 AM',
      testPassRate: 100,
      grade: 'A+',
      score: 98,
      feedback: 'Flawless election timeouts and log reconciliation. Excellent modularity in RPC handlers.',
      status: 'reviewed',
    },
    {
      id: 'sub_2',
      studentName: 'Marcus Brody',
      rollNo: 'CS-2024-802',
      fileName: 'brody_cs502_lab3.zip',
      submittedAt: 'Yesterday, 8:40 PM',
      testPassRate: 92,
      grade: 'A',
      score: 91,
      feedback: 'Passed 23/25 test cases. Minor uncommitted log duplication on partitioned leader reconnect.',
      status: 'reviewed',
    },
    {
      id: 'sub_3',
      studentName: 'Priya Sharma',
      rollNo: 'CS-2024-815',
      fileName: 'priya_raft_impl.tar.gz',
      submittedAt: 'Yesterday, 11:15 PM',
      testPassRate: 95,
      grade: 'A',
      score: 94,
      feedback: 'Passed election race stress test. Great documentation.',
      status: 'pending',
    },
    {
      id: 'sub_4',
      studentName: 'Alex Chen',
      rollNo: 'CS-2024-822',
      fileName: 'cs502_alex_chen.zip',
      submittedAt: 'Sep 20, 2026',
      testPassRate: 80,
      grade: 'B+',
      score: 83,
      feedback: 'Needs work on candidate split-vote randomized timers.',
      status: 'pending',
    },
  ]);

  const [selectedSubId, setSelectedSubId] = useState<string>('sub_1');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const current = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const handleUpdateGrade = (score: number, grade: string, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubId ? { ...s, score, grade, feedback, status: 'reviewed' } : s
      )
    );
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs">
      <div className="flex h-[88vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Submissions & Grading Console
              </h3>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Target: <strong className="text-slate-800">{assignmentTitle}</strong> • Automated Test Suite Integrated
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Student Submission List */}
          <div className="w-80 border-r border-slate-200 bg-slate-50/50 p-3 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              Submissions ({submissions.length})
            </div>

            <div className="space-y-1.5">
              {submissions.map((sub) => {
                const isSelected = sub.id === selectedSubId;
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className={`rounded-lg p-3 cursor-pointer text-xs transition border ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                        : 'border-transparent bg-white hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{sub.studentName}</span>
                      <span className="font-mono text-[10px] text-blue-700">{sub.rollNo}</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono">Test Pass: {sub.testPassRate}%</span>
                      <span className={`px-1.5 py-0.2 rounded font-semibold ${
                        sub.status === 'reviewed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sub.status === 'reviewed' ? `${sub.grade} (${sub.score})` : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detailed Grading Stage */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {saveToast && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Grade and rubric feedback recorded successfully!</span>
              </div>
            )}

            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{current.studentName}</h4>
                <div className="text-xs font-mono text-slate-500">
                  {current.rollNo} • Submitted: {current.submittedAt}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Downloading student package: ${current.fileName}`)}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  <span>{current.fileName}</span>
                </button>
              </div>
            </div>

            {/* Test Harness Terminal Output */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 shadow-inner">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>Pytest / Go Test Harness Execution Log</span>
                </div>
                <span className="text-emerald-400 font-bold">ALL PASS (25/25)</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <div className="text-slate-400">&gt; pytest -v --timeout=30 tests/test_raft_election.py</div>
                <div className="text-emerald-400">PASSED TestInitialElection: Leader selected within 300ms</div>
                <div className="text-emerald-400">PASSED TestReElectionOnLeaderKill: Quorum triggers term + 1</div>
                <div className="text-emerald-400">PASSED TestSplitVoteRandomizedDelay: No split-brain partition</div>
                <div className="text-emerald-400">PASSED TestUncommittedEntriesTruncation: Invariants held</div>
                <div className="text-slate-400">&gt; Valgrind memory leak inspection: 0 bytes leaked in 4 allocs</div>
              </div>
            </div>

            {/* Faculty Grade & Feedback Input Form */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-xs">
              <h5 className="font-bold text-slate-900">Faculty Rubric Assessment</h5>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Score (out of 100)</label>
                  <input
                    type="number"
                    value={current.score}
                    onChange={(e) =>
                      handleUpdateGrade(Number(e.target.value), current.grade, current.feedback)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 font-mono text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Letter Grade</label>
                  <select
                    value={current.grade}
                    onChange={(e) =>
                      handleUpdateGrade(current.score, e.target.value, current.feedback)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm text-slate-900 font-bold"
                  >
                    <option value="A+">A+ (Exceptional)</option>
                    <option value="A">A (Excellent)</option>
                    <option value="B+">B+ (Good)</option>
                    <option value="B">B (Satisfactory)</option>
                    <option value="C">C (Pass)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Feedback to Student</label>
                <textarea
                  rows={3}
                  value={current.feedback}
                  onChange={(e) =>
                    handleUpdateGrade(current.score, current.grade, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() =>
                    handleUpdateGrade(current.score, current.grade, current.feedback)
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 shadow-xs"
                >
                  Save & Publish Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
