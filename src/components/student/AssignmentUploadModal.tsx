import React, { useState } from 'react';
import {
  X,
  Upload,
  FileCode,
  CheckCircle,
  GitBranch,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Assignment } from '../../types';
import { INITIAL_ASSIGNMENTS } from '../../data/mockData';

interface AssignmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment?: Assignment | null;
  onSuccessSubmit: (assignmentId: string, version: string) => void;
}

export const AssignmentUploadModal: React.FC<AssignmentUploadModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSuccessSubmit,
}) => {
  const [selectedAsgId, setSelectedAsgId] = useState<string>(
    assignment ? assignment.id : INITIAL_ASSIGNMENTS[0].id
  );
  const [githubUrl, setGithubUrl] = useState('https://github.com/elena-vance/cs502-raft-consensus');
  const [fileName, setFileName] = useState('raft_state_machine_v2.tar.gz');
  const [comments, setComments] = useState('Added split-vote election test cases and uncommitted log truncate fix.');
  const [honorPledge, setHonorPledge] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentAssignment =
    INITIAL_ASSIGNMENTS.find((a) => a.id === selectedAsgId) || INITIAL_ASSIGNMENTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!honorPledge) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSuccessSubmit(selectedAsgId, 'v2');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Submit Academic Deliverable
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Deliverable Successfully Submitted!
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Automated grading daemon has queued test harness verification. Artifact recorded under SHA-256 seal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            {/* Target Assignment Selector */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Deliverable
              </label>
              <select
                value={selectedAsgId}
                onChange={(e) => setSelectedAsgId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-medium text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                {INITIAL_ASSIGNMENTS.map((asg) => (
                  <option key={asg.id} value={asg.id}>
                    {asg.courseCode} • {asg.numberLabel}: {asg.title} (Due: {asg.deadlineText})
                  </option>
                ))}
              </select>
            </div>

            {/* Drag & Drop Box */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Archive / Implementation Package (.zip, .tar.gz, .pdf)
              </label>
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center hover:bg-slate-100 transition cursor-pointer">
                <FileCode className="h-8 w-8 text-blue-600 mb-2" />
                <div className="font-semibold text-slate-800">{fileName}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  12.4 MB • Click to replace file or drop here
                </div>
              </div>
            </div>

            {/* Git Repo URL */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Git Repository Link (Optional CI Verification)
              </label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Notes / Comments */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Release Notes / Submission Comments
              </label>
              <textarea
                rows={2}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Honor Code */}
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-3">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={honorPledge}
                  onChange={(e) => setHonorPledge(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[11px] text-blue-900 leading-tight">
                  <strong>Academic Honor Pledge:</strong> I certify that this submission represents my own authentic work in compliance with the university academic integrity code.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!honorPledge || isSubmitting}
                className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition shadow-xs"
              >
                {isSubmitting ? 'Uploading to Repository...' : 'Authorize Submission (v2)'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
