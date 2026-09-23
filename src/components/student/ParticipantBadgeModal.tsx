import React from 'react';
import { X, QrCode, Award, Download, Share2, CheckCircle2 } from 'lucide-react';
import { CURRENT_STUDENT, INITIAL_CAMPUS_EVENTS } from '../../data/mockData';

interface ParticipantBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParticipantBadgeModal: React.FC<ParticipantBadgeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const event = INITIAL_CAMPUS_EVENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Institutional Event Access Credential
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Badge Card */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-linear-to-b from-slate-900 to-slate-950 p-6 text-center text-white shadow-lg">
          <div className="inline-block rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[10px] font-bold text-blue-300 border border-blue-400/30 uppercase tracking-widest">
            OFFICIAL PARTICIPANT PASS
          </div>

          <h4 className="mt-3 text-lg font-black text-white">
            {event.title}
          </h4>

          <div className="mt-1 text-xs text-slate-300">
            {event.datesText} • Main Campus Auditorium 1
          </div>

          {/* QR Code Simulation */}
          <div className="my-5 mx-auto flex h-36 w-36 items-center justify-center rounded-xl bg-white p-2.5 shadow-md">
            <div className="relative flex h-full w-full flex-col items-center justify-center border-2 border-slate-900 rounded-lg">
              <QrCode className="h-24 w-24 text-slate-900" />
              <span className="font-mono text-[9px] font-bold text-slate-900">
                #HC-8819-2026
              </span>
            </div>
          </div>

          <div className="text-sm font-bold text-white">
            {CURRENT_STUDENT.name}
          </div>
          <div className="text-xs font-mono text-blue-300">
            {CURRENT_STUDENT.universityId} • {CURRENT_STUDENT.department}
          </div>

          <div className="mt-4 rounded-lg bg-slate-800/80 p-2.5 text-xs text-slate-300 border border-slate-700">
            <div>Team: <strong className="text-white">Kernel Panic</strong></div>
            <div className="text-[11px] text-slate-400">Track: Distributed Ledger Security</div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            onClick={() => alert('Participant pass saved to Apple / Google Wallet!')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Add to Mobile Wallet
          </button>
          <button
            onClick={() => alert('Official ticket downloaded as verified PDF with cryptographic signature.')}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
          >
            Download Badge PDF
          </button>
        </div>
      </div>
    </div>
  );
};
