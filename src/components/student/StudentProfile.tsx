import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  MapPin,
  Lock,
  CheckCircle,
  Building,
  GraduationCap
} from 'lucide-react';
import { CURRENT_STUDENT } from '../../data/mockData';

export const StudentProfile: React.FC = () => {
  const [phone, setPhone] = useState(CURRENT_STUDENT.phone);
  const [emergencyContact, setEmergencyContact] = useState(CURRENT_STUDENT.emergencyContact);
  const [hostelRoom, setHostelRoom] = useState(CURRENT_STUDENT.hostelRoom);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 pb-12 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Student Institutional Registry & PRN Dossier
          </h1>
          <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
            Active Enrolment
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          MET Bhujbal Knowledge City • Institute of Engineering, Adgaon, Nashik (Affiliated to SPPU)
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900 flex items-center space-x-2 font-medium">
          <CheckCircle className="h-4 w-4 text-emerald-700" />
          <span>Contact details verified and synced to Registrar Database.</span>
        </div>
      )}

      {/* Identity Summary Card */}
      <div className="rounded border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-5">
        <img
          src={CURRENT_STUDENT.avatar}
          alt={CURRENT_STUDENT.name}
          className="h-16 w-16 rounded border border-slate-300 object-cover"
        />

        <div className="flex-1 text-xs">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-base font-bold text-slate-900">{CURRENT_STUDENT.name}</h2>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono font-bold text-slate-800 border border-slate-200">
              PRN: MET-CS-2024-819
            </span>
          </div>

          <div className="mt-1 text-slate-600">
            {CURRENT_STUDENT.degree} • {CURRENT_STUDENT.department} • Semester {CURRENT_STUDENT.semester} ({CURRENT_STUDENT.section})
          </div>

          <div className="mt-1.5 flex flex-wrap gap-x-4 text-slate-500 font-mono text-[11px]">
            <span>Email: <strong className="text-slate-700">{CURRENT_STUDENT.email}</strong></span>
            <span>•</span>
            <span>Faculty Advisor: <strong className="text-slate-700">{CURRENT_STUDENT.academicAdvisor}</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editable Personal Contact Form */}
        <div className="rounded border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
            Communication Coordinates
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">
            Official emergency and contact details for dispatch
          </p>

          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded border border-slate-300 bg-slate-50 p-2 text-slate-800 focus:border-red-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Parent / Guardian Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full rounded border border-slate-300 bg-slate-50 p-2 text-slate-800 focus:border-red-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus Hostel / Residential Address</label>
              <input
                type="text"
                value={hostelRoom}
                onChange={(e) => setHostelRoom(e.target.value)}
                className="w-full rounded border border-slate-300 bg-slate-50 p-2 text-slate-800 focus:border-red-700 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800 transition"
            >
              Update Contact Records
            </button>
          </form>
        </div>

        {/* Immutable Registrar Institutional Record */}
        <div className="rounded border border-slate-200 bg-white p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
              Statutory Registrar Dossier
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Official records maintained by MET BKC Examination Registry
            </p>

            <div className="space-y-2 text-xs divide-y divide-slate-100 font-mono">
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">University PRN:</span>
                <span className="font-bold text-slate-900">MET-CS-2024-819</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">SPPU Institute Code:</span>
                <span className="text-slate-900">4012 (MET BKC IOE)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">Admission Batch:</span>
                <span className="text-slate-900">2024–2028 (Regular)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">Statutory Attendance Status:</span>
                <span className="text-emerald-700 font-bold">Compliant (88.4%)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">Examination Hall Ticket:</span>
                <span className="text-slate-900">Eligible (Cleared)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-sans">Two-Factor Authentication:</span>
                <span className="text-slate-900">Enforced (YubiKey / TOTP)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-sans flex items-center justify-between">
            <span>Identity Record v3.1</span>
            <span className="text-red-700 font-semibold">Institutional Confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
};
