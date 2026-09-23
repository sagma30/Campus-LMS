import React from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Award,
  QrCode,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { INITIAL_CAMPUS_EVENTS } from '../../data/mockData';

interface StudentEventsProps {
  onOpenBadgeModal: () => void;
}

export const StudentEvents: React.FC<StudentEventsProps> = ({ onOpenBadgeModal }) => {
  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Campus Events & Technical Symposia
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              SPPU Sanctioned
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Approved Technical Hackathons & Academic On-Duty (OD) Dispensations
          </p>
        </div>

        <button
          onClick={onOpenBadgeModal}
          className="inline-flex items-center space-x-1.5 rounded bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>View Student Participant Pass</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_CAMPUS_EVENTS.map((event) => {
          return (
            <div
              key={event.id}
              className="rounded border border-slate-200 bg-white overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded bg-slate-900/90 text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>

                  {event.confirmedEntry && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="rounded bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        CONFIRMED PARTICIPANT
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h3 className="text-sm font-bold text-white drop-shadow">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Calendar className="h-3 w-3 text-red-700" />
                      {event.datesText}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <MapPin className="h-3 w-3 text-red-700" />
                      {event.venue}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  {event.teamName && (
                    <div className="rounded border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800">
                      <div>
                        Registered Team: <strong>{event.teamName}</strong> • Track: {event.track}
                      </div>
                      <div className="mt-1 flex items-center space-x-3 text-[11px] font-mono text-slate-600">
                        <span>Sanctioned OD Code: <strong className="text-red-800">{event.odSanctionedCode}</strong></span>
                        <span>•</span>
                        <span>+{event.activityCredits} Activity Credits</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-500">
                  {event.eventCode}
                </span>

                {event.confirmedEntry ? (
                  <button
                    onClick={onOpenBadgeModal}
                    className="inline-flex items-center space-x-1 font-bold text-red-800 hover:text-red-950"
                  >
                    <span>View QR Pass</span>
                    <QrCode className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Registration request submitted for ${event.title}`)}
                    className="rounded border border-slate-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
