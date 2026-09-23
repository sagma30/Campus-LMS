import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  FileCheck,
  Code,
  Terminal,
  Download,
  Search,
  Filter,
  Save,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { StudentSubmission, INITIAL_STUDENT_SUBMISSIONS, INITIAL_FACULTY_ASSIGNMENTS } from '../../data/facultyService';

interface FacultySubmissionsProps {
  initialAssignmentId?: string;
  onNavigateTab?: (tab: string) => void;
}

export const FacultySubmissions: React.FC<FacultySubmissionsProps> = ({
  initialAssignmentId,
}) => {
  const [selectedAsgId, setSelectedAsgId] = useState<string>(
    initialAssignmentId || 'asg_01'
  );
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(
    INITIAL_STUDENT_SUBMISSIONS
  );
  const [selectedSubId, setSelectedSubId] = useState<string>('sub_01');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Current grading form inputs
  const currentSub =
    submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const [inputScore, setInputScore] = useState<number>(currentSub?.score || 90);
  const [inputGrade, setInputGrade] = useState<string>(currentSub?.grade || 'A');
  const [inputFeedback, setInputFeedback] = useState<string>(currentSub?.feedback || '');

  // When selected submission changes, update form fields
  const handleSelectSubmission = (sub: StudentSubmission) => {
    setSelectedSubId(sub.id);
    setInputScore(sub.score);
    setInputGrade(sub.grade);
    setInputFeedback(sub.feedback);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSub) return;

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === currentSub.id
          ? {
              ...s,
              score: Number(inputScore),
              grade: inputGrade,
              feedback: inputFeedback,
              status: 'reviewed',
            }
          : s
      )
    );

    setToastMessage(
      `Grade (${inputGrade} • ${inputScore}/100) saved for ${currentSub.studentName}.`
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentAssignment = INITIAL_FACULTY_ASSIGNMENTS.find(
    (a) => a.id === selectedAsgId
  );

  const filteredSubmissions = submissions.filter((s) => {
    const matchesAsg = s.assignmentId === selectedAsgId;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAsg && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="font-semibold text-charcoal-900">Evaluation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Student Submissions & Grading Workbench
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Inspect source code, review automated compiler harnesses, and assign grades.
          </p>
        </div>

        {/* Assignment Selector in Header */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Assignment:</label>
          <select
            value={selectedAsgId}
            onChange={(e) => {
              setSelectedAsgId(e.target.value);
              // Pick first sub for this asg if available
              const firstMatch = submissions.find((s) => s.assignmentId === e.target.value);
              if (firstMatch) handleSelectSubmission(firstMatch);
            }}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-bold text-charcoal-900 focus:border-maroon-700 focus:outline-none shadow-xs"
          >
            {INITIAL_FACULTY_ASSIGNMENTS.map((asg) => (
              <option key={asg.id} value={asg.id}>
                {asg.courseCode} - {asg.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Success Notification Alert */}
      {toastMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ×
          </button>
        </div>
      )}

      {/* Overview Stats for Selected Assignment */}
      {currentAssignment && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</div>
            <div className="text-xl font-black text-charcoal-900 mt-1">
              {currentAssignment.totalStudents} Students
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">{currentAssignment.courseCode}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-emerald-700">Submissions In</div>
            <div className="text-xl font-black text-emerald-700 mt-1">
              {currentAssignment.submittedCount} Files
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {Math.round(((currentAssignment.submittedCount || 0) / (currentAssignment.totalStudents || 1)) * 100)}% submission rate
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-maroon-700">Pending Review</div>
            <div className="text-xl font-black text-maroon-700 mt-1">
              {currentAssignment.pendingReviewCount || 0} Submissions
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Awaiting evaluation</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-500">Weightage</div>
            <div className="text-xl font-black text-charcoal-900 mt-1">
              {currentAssignment.weightage}% Grade
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Max {currentAssignment.totalMarks} Marks</div>
          </div>
        </div>
      )}

      {/* Main Workbench: Split View (List on Left, Inspector & Grading on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Submissions List (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-charcoal-900">Student Deliverables</h2>
            <div className="flex items-center space-x-1 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`rounded px-2 py-0.5 font-semibold transition ${
                  statusFilter === 'all'
                    ? 'bg-charcoal-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`rounded px-2 py-0.5 font-semibold transition ${
                  statusFilter === 'pending'
                    ? 'bg-maroon-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('reviewed')}
                className={`rounded px-2 py-0.5 font-semibold transition ${
                  statusFilter === 'reviewed'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Reviewed
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student or roll..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Submissions List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No submissions matching filter.
              </div>
            ) : (
              filteredSubmissions.map((sub) => {
                const isSelected = sub.id === selectedSubId;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubmission(sub)}
                    className={`rounded-lg border p-3 cursor-pointer transition text-xs ${
                      isSelected
                        ? 'border-maroon-700 bg-maroon-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-charcoal-900">
                          {sub.studentName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal-900">{sub.studentName}</div>
                          <div className="text-[10px] font-mono text-slate-500">{sub.rollNo}</div>
                        </div>
                      </div>

                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          sub.status === 'reviewed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-maroon-100 text-maroon-800'
                        }`}
                      >
                        {sub.status === 'reviewed' ? 'Reviewed' : 'Needs Review'}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="truncate max-w-[140px] font-mono text-slate-600">
                        {sub.fileName}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-emerald-700 font-bold">
                          {sub.testPassRate}% Pass
                        </span>
                        {sub.status === 'reviewed' && (
                          <span className="font-bold text-charcoal-900">
                            {sub.score}/100 ({sub.grade})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Code & Test Inspector + Grading Panel (7 cols) */}
        {currentSub ? (
          <div className="lg:col-span-7 space-y-4">
            {/* Student Info Banner */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-charcoal-900">{currentSub.studentName}</h2>
                  <span className="font-mono text-xs text-slate-500">({currentSub.rollNo})</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Submitted: <strong>{currentSub.submittedAt}</strong> • File: <strong>{currentSub.fileName}</strong> ({currentSub.fileSize})
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 text-xs font-mono font-bold">
                  Autograder: {currentSub.testPassRate}% Passed
                </span>
              </div>
            </div>

            {/* Code Snippet Viewer */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-100 p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Code className="h-4 w-4 text-maroon-400" />
                  <span className="font-mono font-semibold">Submitted Source Implementation</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">UTF-8 • Syntactically Verified</span>
              </div>
              <pre className="font-mono text-xs text-emerald-400 overflow-x-auto p-2 bg-slate-950/70 rounded-lg max-h-48">
                {currentSub.codeSnippet || '// No code preview available'}
              </pre>
            </div>

            {/* Test Harness Terminal Logs */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-2">
                <Terminal className="h-4 w-4 text-maroon-700" />
                <span>Compiler & Concurrency Test Results</span>
              </div>
              <pre className="font-mono text-[11px] text-slate-700 bg-white border border-slate-200 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {currentSub.executionLogs || 'No execution logs available.'}
              </pre>
            </div>

            {/* Interactive Grading Form */}
            <form
              onSubmit={handleSaveGrade}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-charcoal-900">Faculty Evaluation & Scoring</h3>
                  <p className="text-xs text-slate-500">Record score and descriptive feedback.</p>
                </div>
                <span className="text-xs font-mono font-bold text-maroon-700">
                  Out of {currentSub.maxScore} marks
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Score */}
                <div>
                  <label className="block font-bold text-charcoal-900 mb-1">Assigned Score</label>
                  <input
                    type="number"
                    min={0}
                    max={currentSub.maxScore}
                    value={inputScore}
                    onChange={(e) => setInputScore(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-sm font-bold text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block font-bold text-charcoal-900 mb-1">Letter Grade</label>
                  <select
                    value={inputGrade}
                    onChange={(e) => setInputGrade(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-bold text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
                  >
                    <option value="A+">A+ (Exceptional &gt;95%)</option>
                    <option value="A">A (Excellent 85-95%)</option>
                    <option value="B+">B+ (Very Good 75-84%)</option>
                    <option value="B">B (Above Average 65-74%)</option>
                    <option value="C">C (Pass 50-64%)</option>
                    <option value="F">F (Fail &lt;50%)</option>
                  </select>
                </div>
              </div>

              {/* Feedback */}
              <div className="text-xs">
                <label className="block font-bold text-charcoal-900 mb-1">
                  Qualitative Feedback & Diagnostic Notes
                </label>
                <textarea
                  rows={3}
                  value={inputFeedback}
                  onChange={(e) => setInputFeedback(e.target.value)}
                  placeholder="Comment on concurrency model, modular design, edge-case test failures, or algorithmic optimizations..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Save Action */}
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Evaluation & Publish Grade</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500 text-xs">
            Select a student submission from the list to begin evaluation.
          </div>
        )}
      </div>
    </div>
  );
};
