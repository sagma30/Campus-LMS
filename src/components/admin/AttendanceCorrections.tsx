import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  ShieldAlert,
  Search,
  Lock,
  ExternalLink,
  Check,
  AlertTriangle
} from 'lucide-react';
import { ATTENDANCE_PETITIONS, RECENT_AUDIT_LEDGER } from '../../data/mockData';
import { AttendanceCorrectionPetition, AuditLedgerEntry } from '../../types';

interface AttendanceCorrectionsProps {
  onOpenDefconModal: () => void;
}

export const AttendanceCorrections: React.FC<AttendanceCorrectionsProps> = ({
  onOpenDefconModal,
}) => {
  const [petitions, setPetitions] = useState<AttendanceCorrectionPetition[]>(ATTENDANCE_PETITIONS);
  const [selectedPetitionId, setSelectedPetitionId] = useState<string>(ATTENDANCE_PETITIONS[0].id);
  const [ledger, setLedger] = useState<AuditLedgerEntry[]>(RECENT_AUDIT_LEDGER);
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const selectedPetition = petitions.find((p) => p.id === selectedPetitionId) || petitions[0];

  const handleApprove = () => {
    if (!selectedPetition) return;

    // Create new audit ledger block
    const newBlock: AuditLedgerEntry = {
      blockNumber: `#BLK-${Math.floor(88925 + Math.random() * 1000)}`,
      timestamp: 'Just now • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      studentName: selectedPetition.studentName,
      studentRoll: selectedPetition.studentRoll,
      courseCode: selectedPetition.courseCode,
      courseTitle: selectedPetition.courseName,
      sessionDesc: `Session #${selectedPetition.sessionNumber}`,
      stateTransition: { from: selectedPetition.priorStatus, to: selectedPetition.postStatus },
      grounds: selectedPetition.statutoryReasonCode.replace('Approved: ', ''),
      authorizedBy: 'Dean Sterling',
      sha256Hash: selectedPetition.sha256Hash.substring(0, 10) + '...commit',
    };

    setLedger([newBlock, ...ledger]);
    setPetitions((prev) => prev.filter((p) => p.id !== selectedPetition.id));
    setActionSuccessToast(`Petition ${selectedPetition.ticketNumber} authorized and cryptographically committed to Block ${newBlock.blockNumber}.`);
    setTimeout(() => setActionSuccessToast(null), 4000);
  };

  const handleReject = () => {
    if (!selectedPetition) return;

    const newBlock: AuditLedgerEntry = {
      blockNumber: `#BLK-${Math.floor(88925 + Math.random() * 1000)}`,
      timestamp: 'Just now',
      studentName: selectedPetition.studentName,
      studentRoll: selectedPetition.studentRoll,
      courseCode: selectedPetition.courseCode,
      courseTitle: selectedPetition.courseName,
      sessionDesc: `Session #${selectedPetition.sessionNumber}`,
      stateTransition: { from: selectedPetition.priorStatus, to: 'REJECTED' },
      grounds: 'Registrar Adjudication Denied',
      authorizedBy: 'Dean Sterling',
      sha256Hash: '0000000...denied',
    };

    setLedger([newBlock, ...ledger]);
    setPetitions((prev) => prev.filter((p) => p.id !== selectedPetition.id));
    setActionSuccessToast(`Petition ${selectedPetition.ticketNumber} rejected. Decision committed to ledger.`);
    setTimeout(() => setActionSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Attendance Corrections & Statutory Audit
            </h1>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-mono font-bold text-blue-800">
              PRD SEC-18
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Academic Registrar & Executive Governance Console • Fall 2026 Term
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => alert('Full WORM Ledger export generated.')}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Audit Reports (CSV)</span>
          </button>

          <button
            onClick={onOpenDefconModal}
            className="flex items-center space-x-1.5 rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-sm"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-white" />
            <span>DEFCON: Emergency Override</span>
          </button>
        </div>
      </div>

      {actionSuccessToast && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-800 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Top 4 Metrics Cards (matching Screen 3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            PENDING PETITIONS
          </div>
          <div className="mt-1 text-2xl font-black text-slate-900">
            {petitions.length} Pending
          </div>
          <div className="mt-1 text-xs font-semibold text-rose-600">
            3 Critical Threshold
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            ADJUDICATED THIS TERM
          </div>
          <div className="mt-1 text-2xl font-black text-slate-900">
            42 Decisions
          </div>
          <div className="mt-1 text-xs text-slate-500">
            94.2% Approval Rate
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            WORM LEDGER STATUS
          </div>
          <div className="mt-1 text-2xl font-black text-emerald-700">
            Active & Verified
          </div>
          <div className="mt-1 text-xs font-mono text-slate-500">
            Block #BLK-88924 Sealed
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            24H LOCK WINDOW
          </div>
          <div className="mt-1 text-2xl font-black text-slate-900">
            Enforced
          </div>
          <div className="mt-1 text-xs text-slate-500 font-mono">
            Rule 14.2.A Active
          </div>
        </div>
      </div>

      {/* Two Column Adjudication Workspace (matching Screen 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Correction Request Queue (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Correction Request Queue</h3>
            <span className="text-xs font-mono text-slate-500">{petitions.length} Items</span>
          </div>

          <div className="space-y-2.5">
            {petitions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                All correction petitions adjudicated!
              </div>
            ) : (
              petitions.map((pet) => {
                const isSelected = pet.id === selectedPetitionId;
                return (
                  <div
                    key={pet.id}
                    onClick={() => setSelectedPetitionId(pet.id)}
                    className={`rounded-xl border p-4 cursor-pointer text-xs transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        pet.urgentFlag
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {pet.urgencyLabel}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{pet.submittedAgo}</span>
                    </div>

                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{pet.studentName}</span>
                      <span className="font-mono text-blue-700">{pet.studentRoll}</span>
                    </div>

                    <div className="mt-1 text-slate-600 text-[11px]">
                      {pet.courseCode} • Session #{pet.sessionNumber} ({pet.sessionDate})
                    </div>

                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="inline-flex items-center space-x-1 font-mono font-bold">
                        <span className="text-rose-700">{pet.priorStatus}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-700">{pet.postStatus}</span>
                      </span>

                      <div className="text-right text-[11px]">
                        <span className="font-mono text-slate-500">{pet.priorAttendance}%</span>
                        <span className="text-slate-400"> → </span>
                        <span className="font-mono font-bold text-emerald-700">{pet.postAttendance}%</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Detailed Adjudication Workspace (7 cols) */}
        {selectedPetition && (
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500">
                  Adjudication Ticket: <strong className="text-slate-900">{selectedPetition.ticketNumber}</strong>
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Attendance Rectification & Statutory Override
                </h3>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                selectedPetition.urgentFlag ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedPetition.urgencyLabel}
              </span>
            </div>

            {/* Student & Session Data */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>
                <div className="text-slate-500 text-[11px]">Student Subject:</div>
                <div className="font-bold text-slate-900">{selectedPetition.studentName} ({selectedPetition.studentRoll})</div>
                <div className="text-slate-600 text-[11px]">B.Tech Computer Science • Sem 5</div>
              </div>
              <div>
                <div className="text-slate-500 text-[11px]">Course & Faculty:</div>
                <div className="font-bold text-slate-900">{selectedPetition.courseCode}: {selectedPetition.courseName}</div>
                <div className="text-slate-600 text-[11px]">{selectedPetition.facultyName} ({selectedPetition.facultyDept})</div>
              </div>
            </div>

            {/* Threshold Impact Comparison */}
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
              <div className="font-semibold text-slate-700 mb-2">Statutory Impact Analysis</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-rose-50/70 p-2.5 border border-rose-100">
                  <div className="text-[10px] uppercase font-mono text-rose-700 font-bold">PRIOR ATTENDANCE</div>
                  <div className="text-xl font-black text-rose-800">{selectedPetition.priorAttendance}%</div>
                  <div className="text-[11px] text-rose-600">Non-Eligible (&lt; 75% Statutory Floor)</div>
                </div>

                <div className="rounded bg-emerald-50/70 p-2.5 border border-emerald-100">
                  <div className="text-[10px] uppercase font-mono text-emerald-700 font-bold">POST-CORRECTION (PROJECTED)</div>
                  <div className="text-xl font-black text-emerald-800">{selectedPetition.postAttendance}%</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Compliant (+0.8% above Threshold)</div>
                </div>
              </div>
            </div>

            {/* Faculty Justification & Uploaded Medical Certificate */}
            <div className="text-xs space-y-2">
              <div className="font-semibold text-slate-700">Faculty Statement of Fact:</div>
              <p className="rounded-lg bg-slate-50 p-3 text-slate-700 border border-slate-200 leading-relaxed">
                "{selectedPetition.facultyJustification}"
              </p>

              {selectedPetition.medicalSlipDoc && (
                <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-blue-900">{selectedPetition.medicalSlipDoc.name}</div>
                      <div className="text-[10px] text-blue-700 font-mono">
                        {selectedPetition.medicalSlipDoc.size} • Cryptographically Verified by Infirmary
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Viewing attached certified document: ${selectedPetition.medicalSlipDoc?.name}`)}
                    className="rounded bg-white border border-blue-300 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100"
                  >
                    View Document
                  </button>
                </div>
              )}
            </div>

            {/* Registrar Adjudication Remark */}
            <div className="text-xs space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Registrar Statutory Grounds & Administrative Citation:
              </label>
              <textarea
                rows={2}
                defaultValue={selectedPetition.adminRemark || ''}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Cryptographic Seal & Nonce Box */}
            <div className="rounded-lg bg-slate-900 p-3 text-slate-300 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>DIGITAL SIGNATURE & LEDGER HASH:</span>
                <span className="text-emerald-400 font-bold">READY TO COMMIT</span>
              </div>
              <div className="truncate text-slate-200">SHA-256: {selectedPetition.sha256Hash}</div>
              <div className="text-slate-400">Signer: {selectedPetition.signerPublicKey || 'dean.sterling@campus.edu'}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleReject}
                className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition shadow-xs"
              >
                Reject Petition
              </button>

              <button
                onClick={handleApprove}
                className="flex items-center space-x-1.5 rounded-lg bg-emerald-700 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition shadow-sm"
              >
                <Check className="h-4 w-4 text-white" />
                <span>Authorize & Commit to Ledger</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Recent Immutable Audit Ledger (matching Screen 3) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Immutable Audit Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Cryptographically chained blocks recording all administrative modifications
            </p>
          </div>
          <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-mono text-slate-700 font-bold">
            Audit Trail Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Block ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Course & Session</th>
                <th className="py-2.5 px-3">State Transition</th>
                <th className="py-2.5 px-3">Adjudication Grounds</th>
                <th className="py-2.5 px-3">Authorized By</th>
                <th className="py-2.5 px-3">SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map((log) => (
                <tr key={log.blockNumber} className="hover:bg-slate-50 font-mono">
                  <td className="py-3 px-3 font-bold text-blue-700">{log.blockNumber}</td>
                  <td className="py-3 px-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-900">
                    {log.studentName} ({log.studentRoll})
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-700">
                    <strong>{log.courseCode}</strong> • {log.sessionDesc}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center space-x-1 font-bold">
                      <span className="text-rose-700">{log.stateTransition.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-emerald-700">{log.stateTransition.to}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-600">{log.grounds}</td>
                  <td className="py-3 px-3 font-sans text-slate-800 font-semibold">{log.authorizedBy}</td>
                  <td className="py-3 px-3 text-[10px] text-slate-400">{log.sha256Hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
