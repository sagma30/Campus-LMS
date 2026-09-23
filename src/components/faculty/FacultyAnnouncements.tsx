import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Send,
  Trash2,
  Search,
  CheckCircle2,
  X,
  AlertTriangle,
  Paperclip,
  Clock,
  Users,
  Eye,
  Calendar
} from 'lucide-react';
import { Notice } from '../../types';
import { INITIAL_FACULTY_ANNOUNCEMENTS, INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyAnnouncementsProps {
  onNavigateTab?: (tab: string) => void;
}

export const FacultyAnnouncements: React.FC<FacultyAnnouncementsProps> = () => {
  const [announcements, setAnnouncements] = useState<Notice[]>(INITIAL_FACULTY_ANNOUNCEMENTS);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [targetSubject, setTargetSubject] = useState<string>('CS502 (Section A)');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Lab Announcement');
  const [priority, setPriority] = useState<'normal' | 'high_priority' | 'urgent_mandatory'>('normal');
  const [summary, setSummary] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const circularNo = `#NOT-${targetSubject.split(' ')[0]}-${String(announcements.length + 1).padStart(2, '0')}`;
    const newNotice: Notice = {
      id: `not_fac_${Date.now()}`,
      circularNo,
      title,
      category,
      priority,
      timestamp: 'Just now',
      publishDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      author: 'Dr. Arvind Ramesh',
      authorRole: 'Assoc. Professor • Dept. of CSE',
      summary,
      details: details || summary,
      targetScope: `${targetSubject} Students`,
      channels: ['Portal Notice Board', 'Student Push'],
      isUrgentMandatoryRead: priority === 'urgent_mandatory',
      hasAttachment: !!attachmentName,
      attachmentName: attachmentName || undefined,
      attachmentSize: attachmentName ? '450 KB' : undefined,
    };

    setAnnouncements([newNotice, ...announcements]);
    setIsComposerOpen(false);
    setToastMessage(`Notice "${title}" broadcasted to ${targetSubject}.`);
    setTimeout(() => setToastMessage(null), 4000);

    // Reset Form
    setTitle('');
    setSummary('');
    setDetails('');
    setAttachmentName('');
  };

  const handleDeleteAnnouncement = (id: string, noticeTitle: string) => {
    if (confirm(`Withdraw notice "${noticeTitle}" from the student portal?`)) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
      setToastMessage(`Notice withdrawn.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filteredAnnouncements = announcements.filter((notice) => {
    const matchesSubject =
      filterSubject === 'all' || notice.targetScope.includes(filterSubject);
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.circularNo.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span className="font-semibold text-charcoal-900">Announcements</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Course Announcements & Circulars
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Broadcast class notifications, schedule changes, lab instructions, and colloquium alerts.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
          >
            {isComposerOpen ? <X className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
            <span>{isComposerOpen ? 'Close Composer' : 'Draft New Announcement'}</span>
          </button>
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
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Composer Form */}
      {isComposerOpen && (
        <form
          onSubmit={handlePublishAnnouncement}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-charcoal-900">Compose Notice / Announcement</h2>
              <p className="text-xs text-slate-500">Will be pinned to student portal and LMS feed.</p>
            </div>
            <span className="rounded bg-maroon-50 text-maroon-700 font-mono text-xs px-2 py-0.5 font-bold">
              Broadcast System
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Target Class */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Target Audience</label>
              <select
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
              >
                <option value="CS502 (Section A)">CS502 (Section A - 62 Students)</option>
                <option value="CS508 (Section B)">CS508 (Section B - 58 Students)</option>
                <option value="CS502 & CS508">All My Cohorts (120 Students)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              >
                <option value="Lab Announcement">Lab Announcement / Deadline</option>
                <option value="Lecture Notice">Lecture Schedule & Rooms</option>
                <option value="Guest Colloquium">Guest Lecture / Seminar</option>
                <option value="Examination">Midterm / Quiz Schedule</option>
                <option value="General Directive">General Course Notice</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Notice Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
              >
                <option value="normal">Normal Priority</option>
                <option value="high_priority">High Priority (Banner Pin)</option>
                <option value="urgent_mandatory">Urgent / Critical Directive</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Notice Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lab 3 Submission Window Extended by 24h & Test Suite Patch"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* Summary */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Executive Summary (Brief Overview)</label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1-2 sentences shown on student dashboard notice cards..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* Details */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Full Announcement Body</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Elaborate with specific room numbers, technical prerequisites, submission URLs, or policy notes..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* Attachment */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Optional Attached Document</label>
            <div className="flex items-center space-x-2">
              <label className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 py-2 px-3 cursor-pointer hover:bg-slate-100 transition">
                <Paperclip className="h-3.5 w-3.5 text-slate-500" />
                <span className="truncate">{attachmentName || 'Attach circular document/patch (PDF/ZIP)'}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachmentName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
              {attachmentName && (
                <button
                  type="button"
                  onClick={() => setAttachmentName('')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-5 py-2 font-bold text-white hover:bg-maroon-800 transition shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Notice</span>
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
              placeholder="Search announcements..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-maroon-700 focus:outline-none"
          >
            <option value="all">All Cohort Notices</option>
            <option value="CS502">CS502 Notices</option>
            <option value="CS508">CS508 Notices</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Showing <strong>{filteredAnnouncements.length}</strong> active announcements
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                  {item.circularNo}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                  {item.category}
                </span>
                {item.priority === 'urgent_mandatory' ? (
                  <span className="rounded bg-maroon-700 text-white text-[10px] font-bold px-2 py-0.5 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="h-3 w-3" /> Urgent
                  </span>
                ) : item.priority === 'high_priority' ? (
                  <span className="rounded bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5">
                    High Priority
                  </span>
                ) : null}
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span>{item.timestamp}</span>
                <button
                  onClick={() => handleDeleteAnnouncement(item.id, item.title)}
                  className="p-1 text-slate-400 hover:text-maroon-700 transition"
                  title="Withdraw notice"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-charcoal-900">{item.title}</h3>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{item.summary}</p>
              {item.details && item.details !== item.summary && (
                <p className="text-xs text-slate-500 mt-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {item.details}
                </p>
              )}
            </div>

            {/* Footer Specs */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center space-x-2">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                <span>Audience: <strong>{item.targetScope}</strong></span>
              </div>

              {item.hasAttachment && (
                <div className="flex items-center space-x-1 text-maroon-700 font-mono font-medium">
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>{item.attachmentName} ({item.attachmentSize})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
