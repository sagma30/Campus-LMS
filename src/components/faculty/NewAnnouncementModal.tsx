import React, { useState } from 'react';
import { X, Megaphone, CheckCircle, Bell } from 'lucide-react';
import { Notice } from '../../types';

interface NewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (notice: Partial<Notice>) => void;
}

export const NewAnnouncementModal: React.FC<NewAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coursework Directive');
  const [priority, setPriority] = useState<Notice['priority']>('normal');
  const [summary, setSummary] = useState('');
  const [targetScope, setTargetScope] = useState('CS502 Section A Students');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onCreate({
      circularNo: `#CIR-2026-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      priority,
      timestamp: 'Just now',
      publishDate: 'Sep 22, 2026',
      author: 'Dr. Arvind Ramesh',
      authorRole: 'Assoc. Professor CSE',
      summary,
      targetScope,
      channels: ['Student Portal', 'Push Notification'],
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
            <Megaphone className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Broadcast Subject Announcement
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
            <h4 className="text-base font-bold text-slate-900">Announcement Broadcasted</h4>
            <p className="text-xs text-slate-500">Students have received the bulletin in real-time.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Office Hours Rescheduled & Extra Discussion Session"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Coursework Directive">Coursework Directive</option>
                  <option value="Schedule Change">Schedule Change</option>
                  <option value="Lab Guideline">Lab Guideline</option>
                  <option value="Exam Preparation">Exam Preparation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notification Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="normal">Normal Bulletin</option>
                  <option value="high_priority">High Priority</option>
                  <option value="urgent_mandatory">Urgent Mandatory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Audience Scope</label>
              <input
                type="text"
                value={targetScope}
                onChange={(e) => setTargetScope(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Announcement Body</label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Compose announcement text for enrolled students..."
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
                Send Notice
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
