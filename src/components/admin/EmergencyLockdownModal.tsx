import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Radio,
  CheckSquare,
  Square
} from 'lucide-react';

interface EmergencyLockdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLockdown: (reason: string) => void;
  isCurrentlyLocked: boolean;
  onLiftLockdown: () => void;
}

export const EmergencyLockdownModal: React.FC<EmergencyLockdownModalProps> = ({
  isOpen,
  onClose,
  onConfirmLockdown,
  isCurrentlyLocked,
  onLiftLockdown,
}) => {
  const [selectedReason, setSelectedReason] = useState('Severe Inclement Weather & Regional Flood Warning');
  const [confirmText, setConfirmText] = useState('');
  const [freezeSubmissions, setFreezeSubmissions] = useState(true);
  const [suspendTimetable, setSuspendTimetable] = useState(true);
  const [lockBiometrics, setLockBiometrics] = useState(true);
  const [dispatchAlerts, setDispatchAlerts] = useState(true);

  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === 'CONFIRM LOCKDOWN';

  const handleTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;
    onConfirmLockdown(selectedReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl border-2 border-maroon-700 bg-white p-6 shadow-2xl overflow-hidden">
        {/* Top Warning Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-maroon-100">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-700 text-white animate-pulse">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-maroon-700">
                CRITICAL SECURITY DIRECTIVE (DEFCON-1)
              </div>
              <h3 className="text-lg font-black text-charcoal-900">
                {isCurrentlyLocked ? 'Institutional Lockdown Currently Active' : 'Initiate Institutional Emergency Lockdown'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isCurrentlyLocked ? (
          <div className="py-6 space-y-4 text-xs">
            <div className="rounded-xl bg-maroon-50 border border-maroon-200 p-4 text-maroon-900 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm text-maroon-900">
                <AlertTriangle className="h-4 w-4 text-maroon-700" />
                Emergency Lockdown In Force
              </div>
              All academic operations, attendance sessions, and lab turnstiles are currently suspended campus-wide.
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close Window
              </button>
              <button
                type="button"
                onClick={() => {
                  onLiftLockdown();
                  onClose();
                }}
                className="rounded-lg bg-emerald-700 px-5 py-2 font-bold text-white hover:bg-emerald-800 shadow-xs"
              >
                Deactivate & Lift Emergency Lockdown
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTrigger} className="mt-4 space-y-4 text-xs">
            {/* Reason Selection */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-2">
                Grounds for Administrative Lock:
              </label>
              <div className="space-y-2">
                {[
                  'Severe Inclement Weather & Regional Flood Warning',
                  'Public Health Directive & Remote Quarantine',
                  'Critical Physical Security or Infrastructure Incident',
                  'Emergency IT & WORM Database Recovery Window',
                ].map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center space-x-2.5 rounded-lg border p-2.5 cursor-pointer transition ${
                      selectedReason === reason
                        ? 'border-maroon-600 bg-maroon-50/60 font-bold text-maroon-950'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="lockdown_reason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-maroon-700"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Affected Systems Checklist */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-2">
                Emergency System Directives:
              </label>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <label className="flex items-center space-x-2 rounded border border-slate-200 p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={suspendTimetable}
                    onChange={(e) => setSuspendTimetable(e.target.checked)}
                    className="accent-maroon-700"
                  />
                  <span>Suspend all timetable classes</span>
                </label>

                <label className="flex items-center space-x-2 rounded border border-slate-200 p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freezeSubmissions}
                    onChange={(e) => setFreezeSubmissions(e.target.checked)}
                    className="accent-maroon-700"
                  />
                  <span>Extend assignment deadlines</span>
                </label>

                <label className="flex items-center space-x-2 rounded border border-slate-200 p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lockBiometrics}
                    onChange={(e) => setLockBiometrics(e.target.checked)}
                    className="accent-maroon-700"
                  />
                  <span>Lock physical turnstiles</span>
                </label>

                <label className="flex items-center space-x-2 rounded border border-slate-200 p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dispatchAlerts}
                    onChange={(e) => setDispatchAlerts(e.target.checked)}
                    className="accent-maroon-700"
                  />
                  <span>Broadcast SMS & Push to 1,548 users</span>
                </label>
              </div>
            </div>

            {/* Type confirmation code */}
            <div className="rounded-lg bg-maroon-50 border border-maroon-200 p-3.5 space-y-2">
              <label className="block font-bold text-maroon-950">
                To arm emergency lockdown, type <span className="font-mono underline font-black">CONFIRM LOCKDOWN</span> below:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="CONFIRM LOCKDOWN"
                className="w-full rounded border border-maroon-300 bg-white p-2 font-mono text-xs text-maroon-950 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-maroon-700"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Abort
              </button>
              <button
                type="submit"
                disabled={!isConfirmed}
                className="rounded-lg bg-maroon-700 px-5 py-2 font-bold text-white hover:bg-maroon-800 disabled:opacity-40 transition shadow-sm"
              >
                TRIGGER DEFCON OVERRIDE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
