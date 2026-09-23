import React, { useState } from 'react';
import { X, Plus, Calendar, FileText, CheckCircle } from 'lucide-react';
import { Assignment } from '../../types';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (assignment: Partial<Assignment>) => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [courseCode, setCourseCode] = useState('CS502');
  const [title, setTitle] = useState('');
  const [numberLabel, setNumberLabel] = useState('LAB 4');
  const [dueDate, setDueDate] = useState('2026-10-05T23:59');
  const [description, setDescription] = useState('');
  const [rubricNotes, setRubricNotes] = useState('Automated pytest suite; memory leak verification enforced.');
  const [type, setType] = useState<Assignment['type']>('Lab');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onCreate({
      courseCode,
      courseName: courseCode === 'CS502' ? 'Distributed Operating Systems' : 'Computer Networks & Protocols',
      type,
      numberLabel,
      title,
      deadlineText: 'Oct 05, 11:59 PM',
      dueDate,
      status: 'pending',
      description,
      rubricNotes,
      submittedCount: 0,
      totalStudents: 62,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Create Coursework Deliverable
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <h4 className="text-base font-bold text-slate-900">Assignment Created & Published</h4>
            <p className="text-xs text-slate-500">Students have received automated portal notification.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Subject</label>
                <select
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="CS502">CS502: Distributed OS</option>
                  <option value="CS508">CS508: Computer Networks</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deliverable Tag</label>
                <input
                  type="text"
                  value={numberLabel}
                  onChange={(e) => setNumberLabel(e.target.value)}
                  placeholder="e.g. LAB 4"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assignment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Two-Phase Commit Distributed Transaction Engine"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deliverable Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Lab">Practical Lab</option>
                  <option value="Project">Course Project</option>
                  <option value="Problem Set">Problem Set</option>
                  <option value="Report">Technical Report</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deadline Date & Time</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Brief & Implementation Scope</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify architectural constraints, expected APIs, and input test cases..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Automated Grading / Rubric Criteria</label>
              <input
                type="text"
                value={rubricNotes}
                onChange={(e) => setRubricNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700 transition shadow-xs"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
