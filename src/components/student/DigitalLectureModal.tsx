import React, { useState } from 'react';
import {
  X,
  Video,
  Mic,
  MicOff,
  ScreenShare,
  MessageSquare,
  Users,
  Layers,
  FileText,
  Play,
  Share2
} from 'lucide-react';

interface DigitalLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalLectureModal: React.FC<DigitalLectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'slides' | 'chat'>('stream');
  const [micMuted, setMicMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-slate-900 text-white shadow-2xl overflow-hidden border border-slate-800">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3.5 bg-slate-900">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-blue-400">CS502</span>
                <span className="text-sm font-bold text-white">Distributed Operating Systems</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Hall 304 (Live Feed) • Dr. Arvind Ramesh • 62 Connected Peers
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('stream')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'stream' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lecture Stream
            </button>
            <button
              onClick={() => setActiveTab('slides')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'slides' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Slides (#8)
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Feed */}
          <div className="flex-1 relative flex items-center justify-center bg-slate-950 p-6">
            {activeTab === 'stream' ? (
              <div className="relative h-full w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Live Lecture"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4 rounded bg-slate-950/80 px-3 py-1.5 backdrop-blur-sm border border-slate-700 font-mono text-xs text-white">
                  Topic: Raft Consensus Protocol & Leader Election (Session #28)
                </div>
                <div className="absolute bottom-4 left-4 rounded bg-slate-950/80 px-3 py-1 backdrop-blur-sm border border-slate-700 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Presence Authenticated (Elena Vance - CS-2024-819)
                </div>
              </div>
            ) : (
              <div className="h-full w-full rounded-xl bg-slate-900 p-8 flex flex-col justify-between border border-slate-800">
                <div>
                  <span className="rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 font-mono text-xs">
                    Slide 14 of 42
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Raft Invariants & Election Safety
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-2xl">
                    At most one leader can be elected in a given term. If a server receives a RequestVote RPC with term &lt; currentTerm, it rejects the vote immediately.
                  </p>
                  <div className="mt-6 rounded-lg bg-slate-950 p-4 font-mono text-xs text-emerald-400 border border-slate-800">
                    {`func (rf *Raft) RequestVote(args *RequestVoteArgs, reply *RequestVoteReply) {
  if args.Term < rf.currentTerm {
    reply.VoteGranted = false
    return
  }
}`}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Press Space to advance slides</span>
                  <button
                    onClick={() => alert('PDF downloaded')}
                    className="rounded bg-slate-800 px-3 py-1.5 text-white hover:bg-slate-700"
                  >
                    Download Annotated Slides
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side Discussion Panel */}
          <div className="w-80 border-l border-slate-800 bg-slate-900 p-4 flex flex-col justify-between hidden md:flex">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 pb-3 border-b border-slate-800">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span>Class Discussion & Inquiries</span>
              </div>
              <div className="mt-3 space-y-3 text-xs overflow-y-auto max-h-[50vh]">
                <div className="rounded bg-slate-800/80 p-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <strong className="text-white">Marcus Brody</strong>
                    <span>10:14 AM</span>
                  </div>
                  <p className="text-slate-300">
                    What happens if a candidate disconnects right after receiving a quorum of votes?
                  </p>
                </div>
                <div className="rounded bg-blue-950/60 border border-blue-900 p-2.5">
                  <div className="flex items-center justify-between text-[11px] text-blue-300 mb-1">
                    <strong className="text-white">Dr. Arvind Ramesh</strong>
                    <span>10:16 AM</span>
                  </div>
                  <p className="text-blue-200">
                    Good question, Marcus. The remaining cluster triggers election timeout again.
                  </p>
                </div>
                <div className="rounded bg-slate-800/80 p-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <strong className="text-white">Elena Vance (You)</strong>
                    <span>10:20 AM</span>
                  </div>
                  <p className="text-slate-300">
                    Testing this exact case in Lab 3 test harness right now!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <input
                type="text"
                placeholder="Ask faculty or peers..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Control Strip */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`rounded-full p-2.5 transition ${
                micMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title={micMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {micMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <span className="text-xs text-slate-400">
              {micMuted ? 'Microphone Muted' : 'Microphone Active'}
            </span>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Latency: 18ms • HD 1080p WebRTC
          </div>

          <div>
            <button
              onClick={onClose}
              className="rounded-lg bg-rose-600/90 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition"
            >
              Leave Digital Lecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
