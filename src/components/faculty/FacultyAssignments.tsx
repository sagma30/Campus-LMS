import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Upload,
  ArrowRight,
  Filter,
  CheckSquare,
  Sparkles,
  Paperclip,
  Trash2,
  X,
  FileCheck
} from 'lucide-react';
import { Assignment } from '../../types';
import { INITIAL_FACULTY_ASSIGNMENTS, INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyAssignmentsProps {
  onNavigateTab: (tab: string, param?: string) => void;
  onOpenReviewSubmissions: (asgTitle: string) => void;
}

export const FacultyAssignments: React.FC<FacultyAssignmentsProps> = ({
  onNavigateTab,
  onOpenReviewSubmissions,
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_FACULTY_ASSIGNMENTS);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('CS502');
  const [type, setType] = useState<'Lab' | 'Problem Set' | 'Project' | 'Report'>('Lab');
  const [numberLabel, setNumberLabel] = useState('LAB 4');
  const [dueDate, setDueDate] = useState('2026-10-05T23:59');
  const [weightage, setWeightage] = useState('15');
  const [totalMarks, setTotalMarks] = useState('100');
  const [description, setDescription] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string>('');
  const [rubricText, setRubricText] = useState('Code execution & test cases (40 marks)\nSystem architecture & design (30 marks)\nConcurrency & edge cases (30 marks)');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const courseObj = INITIAL_FACULTY_SUBJECTS.find((s) => s.code === courseCode);
    const newAsg: Assignment = {
      id: `asg_${Date.now()}`,
      courseCode,
      courseName: courseObj ? courseObj.name : 'Computer Science Course',
      type,
      numberLabel: numberLabel || 'ASSIGNMENT',
      title,
      dueDate,
      deadlineText: new Date(dueDate).toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      }) + ' • 11:59 PM',
      status: 'pending',
      description,
      weightage: Number(weightage) || 10,
      totalMarks: Number(totalMarks) || 100,
      submittedCount: 0,
      totalStudents: courseObj ? courseObj.totalStudents : 60,
      pendingReviewCount: 0,
      rubricCriteria: rubricText.split('\n').filter((l) => l.trim().length > 0),
    };

    setAssignments([newAsg, ...assignments]);
    setIsCreating(false);
    setSuccessToast(`Assignment "${title}" published successfully to ${courseCode}!`);
    setTimeout(() => setSuccessToast(null), 4000);

    // Reset Form
    setTitle('');
    setDescription('');
    setAttachedFileName('');
  };

  const handleDeleteAssignment = (id: string) => {
    if (confirm('Are you sure you want to remove this assignment from the curriculum?')) {
      setAssignments(assignments.filter((a) => a.id !== id));
      setSuccessToast('Assignment archived from syllabus.');
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  const filteredAssignments = assignments.filter((asg) => {
    const matchesSubject = filterSubject === 'all' || asg.courseCode === filterSubject;
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.numberLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="font-semibold text-charcoal-900">Assignments & Evaluation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Coursework & Assignments
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author assignments, configure grading rubrics, and evaluate student work.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
          >
            {isCreating ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            <span>{isCreating ? 'Cancel Creation' : 'Create New Assignment'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successToast && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Create New Assignment Form (Dedicated collapsible inline view) */}
      {isCreating && (
        <form
          onSubmit={handleCreateAssignment}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-charcoal-900">Publish New Coursework</h2>
              <p className="text-xs text-slate-500">Provide details, deadline, and evaluation rubric.</p>
            </div>
            <span className="rounded bg-maroon-50 text-maroon-700 font-mono text-xs px-2 py-0.5 font-bold">
              Draft Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Subject */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Subject Allotment</label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
              >
                {INITIAL_FACULTY_SUBJECTS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} ({s.section})
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Assignment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              >
                <option value="Lab">Lab Practical</option>
                <option value="Problem Set">Problem Set / Proofs</option>
                <option value="Project">Term Project</option>
                <option value="Report">Technical Report</option>
              </select>
            </div>

            {/* Code / Label */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Number / Tag Label</label>
              <input
                type="text"
                required
                value={numberLabel}
                onChange={(e) => setNumberLabel(e.target.value)}
                placeholder="e.g. LAB 4, PS 2"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Submission Deadline</label>
              <input
                type="datetime-local"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Assignment Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Consensus State Machine with Raft"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Problem Specification & Instructions</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain problem objectives, implementation guidelines, test case expectations, and submission file requirements..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Weightage */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Weightage (% of grade)</label>
              <input
                type="number"
                value={weightage}
                onChange={(e) => setWeightage(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              />
            </div>

            {/* Total Marks */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Total Marks</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              />
            </div>

            {/* Attachment Area */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Starter Harness / Specs File</label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 py-2 px-3 cursor-pointer hover:bg-slate-100 transition">
                  <Paperclip className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">{attachedFileName || 'Attach starter code/PDF'}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
                {attachedFileName && (
                  <button
                    type="button"
                    onClick={() => setAttachedFileName('')}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Rubric Criteria */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">
              Evaluation Rubric Criteria (One per line)
            </label>
            <textarea
              rows={2}
              value={rubricText}
              onChange={(e) => setRubricText(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-xs text-charcoal-900 focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-5 py-2 font-bold text-white hover:bg-maroon-800 transition shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Publish Assignment</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title or tag..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-maroon-700 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="CS502">CS502 (Distributed OS)</option>
            <option value="CS508">CS508 (Computer Networks)</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Showing <strong>{filteredAssignments.length}</strong> active assignments
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => (
          <div
            key={asg.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                    {asg.courseCode}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700 uppercase">
                    {asg.numberLabel}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {asg.courseName}
                  </span>
                  {asg.status === 'draft' && (
                    <span className="rounded bg-amber-50 text-amber-700 text-[10px] font-bold px-1.5 py-0.2">
                      Draft
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-charcoal-900">{asg.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{asg.description}</p>

                {/* Rubric Points Pills */}
                {asg.rubricCriteria && asg.rubricCriteria.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                    {asg.rubricCriteria.map((c, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-slate-600"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats & Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-500 font-mono">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Due: {asg.deadlineText}</span>
                  </div>
                  <div className="mt-1 font-semibold text-charcoal-900">
                    Weightage: {asg.weightage}% • Max: {asg.totalMarks} pts
                  </div>
                  <div className="mt-1 flex items-center space-x-2 text-xs">
                    <span className="text-slate-500">
                      Submissions: <strong className="text-charcoal-900">{asg.submittedCount}</strong>/{asg.totalStudents}
                    </span>
                    {asg.pendingReviewCount !== undefined && asg.pendingReviewCount > 0 && (
                      <span className="rounded bg-maroon-50 text-maroon-700 font-bold px-1.5 py-0.2 text-[10px]">
                        {asg.pendingReviewCount} pending review
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onOpenReviewSubmissions(asg.title);
                      onNavigateTab('submissions-review', asg.id);
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 rounded-lg bg-charcoal-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-charcoal-800 transition shadow-xs"
                  >
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Review Submissions</span>
                  </button>
                  <button
                    onClick={() => handleDeleteAssignment(asg.id)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-maroon-700 hover:bg-slate-50 transition"
                    title="Remove assignment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
