import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  BookOpen,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Save,
  Building,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { CURRENT_TEACHER } from '../../data/mockData';
import { INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyProfileProps {
  onNavigateTab: (tab: string) => void;
}

export const FacultyProfile: React.FC<FacultyProfileProps> = ({ onNavigateTab }) => {
  const [phone, setPhone] = useState('+91 98230 55042');
  const [officeRoom, setOfficeRoom] = useState(CURRENT_TEACHER.officeRoom || 'Cabin 312, Turing Science Block');
  const [officeHours, setOfficeHours] = useState(CURRENT_TEACHER.officeHours || 'Mon & Wed 04:00 PM – 05:30 PM');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const publications = [
    {
      title: 'Scalable Byzantine State Machine Replication in Geo-Distributed Edge Clouds',
      venue: 'IEEE Transactions on Parallel and Distributed Systems (TPDS), 2025',
      citations: 48,
    },
    {
      title: 'Optimizing Log Compaction and Heartbeat Jitter in Raft Consensus Networks',
      venue: 'ACM Symposium on Principles of Distributed Computing (PODC), 2024',
      citations: 82,
    },
    {
      title: 'Formal Verification of Partition-Tolerant Distributed Key-Value Stores',
      venue: 'Journal of Systems Architecture, Elsevier, 2022',
      citations: 34,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
          <span>Faculty Console</span>
          <span>/</span>
          <span className="font-semibold text-charcoal-900">Faculty Dossier</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
          Faculty Profile & Academic Credentials
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          MET Bhujbal Knowledge City institutional tenure and official academic record.
        </p>
      </div>

      {/* Success Notification Alert */}
      {isSaved && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center space-x-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Office contact and consultation hours updated in the university registry.</span>
        </div>
      )}

      {/* Hero Profile Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={CURRENT_TEACHER.avatar}
            alt={CURRENT_TEACHER.name}
            className="h-24 w-24 rounded-2xl border-2 border-slate-200 object-cover shadow-xs shrink-0"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-charcoal-900">{CURRENT_TEACHER.name}</h2>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Tenured Faculty
              </span>
              <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                {CURRENT_TEACHER.facultyId}
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-700">
              {CURRENT_TEACHER.title} • {CURRENT_TEACHER.department}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
              <span className="flex items-center space-x-1">
                <Building className="h-3.5 w-3.5 text-slate-400" />
                <span>MET Bhujbal Knowledge City, Adgaon, Nashik</span>
              </span>
              <span className="flex items-center space-x-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{CURRENT_TEACHER.email}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Qualifications & Assigned Subjects (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Assigned Subjects Allotment */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-charcoal-900">Current Semester Allotments</h3>
              <button
                onClick={() => onNavigateTab('my-subjects')}
                className="text-xs font-semibold text-maroon-700 hover:underline"
              >
                View Curricula
              </button>
            </div>

            <div className="space-y-2">
              {INITIAL_FACULTY_SUBJECTS.map((sub) => (
                <div
                  key={sub.code}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 p-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-charcoal-900">
                      {sub.code}: {sub.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {sub.section} • {sub.totalStudents} Enrolled • Room: {sub.room}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-charcoal-900">{sub.credits} Credits</span>
                    <div className="text-[10px] text-emerald-700 font-semibold">{sub.avgAttendance}% Avg Att.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-charcoal-900 pb-2 border-b border-slate-100">
              Academic Background & Education
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <GraduationCap className="h-5 w-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-charcoal-900">Ph.D. in Distributed Systems & Computing</div>
                  <div className="text-slate-500">Indian Institute of Science (IISc), Bangalore • 2017</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Dissertation: High-Performance Consensus in Fault-Tolerant Replicated Stores.</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <GraduationCap className="h-5 w-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-charcoal-900">M.Tech in Computer Science & Engineering</div>
                  <div className="text-slate-500">Indian Institute of Technology (IIT) Bombay • 2012</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Institute Silver Medalist • Specialization in Computer Networks.</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <GraduationCap className="h-5 w-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-charcoal-900">B.Tech in Computer Engineering</div>
                  <div className="text-slate-500">Savitribai Phule Pune University (SPPU) • 2010</div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Publications */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-charcoal-900 pb-2 border-b border-slate-100">
              Peer-Reviewed Publications & Research
            </h3>

            <div className="space-y-3 text-xs">
              {publications.map((p, i) => (
                <div key={i} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <div className="font-bold text-charcoal-900 leading-snug">{p.title}</div>
                  <div className="text-slate-500 mt-0.5">{p.venue}</div>
                  <div className="text-[10px] text-maroon-700 font-bold mt-1">
                    {p.citations} Citations recorded
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Office Hours & Contact Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <form
            onSubmit={handleSaveProfile}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
          >
            <div className="pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-charcoal-900">Office & Consultation Settings</h3>
              <p className="text-xs text-slate-500">Visible to enrolled students on their dashboard.</p>
            </div>

            <div className="text-xs space-y-1">
              <label className="block font-bold text-charcoal-900">Official Office Cabin</label>
              <input
                type="text"
                value={officeRoom}
                onChange={(e) => setOfficeRoom(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-medium focus:border-maroon-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="block font-bold text-charcoal-900">Consultation / Student Office Hours</label>
              <input
                type="text"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-medium focus:border-maroon-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="block font-bold text-charcoal-900">Official Extension / Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

          {/* Statutory Role Badge */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-xs text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-charcoal-900">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Institutional Permissions & Scope</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dr. Arvind Ramesh holds authorized instructor credentials with statutory authority to sign attendance registers, publish continuous evaluation marks, and sponsor medical condonation petitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
