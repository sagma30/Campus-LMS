import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ACADEMIC_HOLIDAYS } from '../../data/mockData';

interface FacultyCalendarProps {
  onNavigateTab: (tab: string) => void;
}

export const FacultyCalendar: React.FC<FacultyCalendarProps> = ({ onNavigateTab }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Tuesday');

  const weeklySchedule = [
    {
      day: 'Monday',
      slots: [
        {
          id: 'mon_1',
          time: '10:00 AM – 11:30 AM',
          course: 'CS502',
          title: 'Distributed Operating Systems (Tutorial Group 1)',
          room: 'Hall 304, Turing Block',
          type: 'Discussion / Problem Solving',
        },
        {
          id: 'mon_2',
          time: '02:15 PM – 03:45 PM',
          course: 'CS508',
          title: 'Computer Networks & Protocols (Section B)',
          room: 'Cisco Lab 4',
          type: 'Theory Lecture',
        },
      ],
    },
    {
      day: 'Tuesday',
      slots: [
        {
          id: 'tue_1',
          time: '10:00 AM – 11:30 AM',
          course: 'CS502',
          title: 'Distributed Operating Systems (Section A)',
          room: 'Hall 304, Turing Block',
          type: 'Core Theory & Consensus Models',
          isLiveNow: true,
        },
        {
          id: 'tue_2',
          time: '04:00 PM – 05:30 PM',
          course: 'OFFICE',
          title: 'Student Academic Advisory & Office Hours',
          room: 'Cabin 312',
          type: 'Consultation',
        },
      ],
    },
    {
      day: 'Wednesday',
      slots: [
        {
          id: 'wed_1',
          time: '10:00 AM – 11:30 AM',
          course: 'CS502',
          title: 'Distributed Consensus Models (Panel)',
          room: 'Hall 304',
          type: 'Discussion Session',
        },
        {
          id: 'wed_2',
          time: '02:15 PM – 03:45 PM',
          course: 'CS508',
          title: 'Computer Networks (Section B Practicum)',
          room: 'Cisco Lab 4',
          type: 'Practicum',
        },
      ],
    },
    {
      day: 'Thursday',
      slots: [
        {
          id: 'thu_1',
          time: '10:00 AM – 11:30 AM',
          course: 'CS502',
          title: 'Paxos & Raft Implementations',
          room: 'Hall 304',
          type: 'Guest Panel / Theory',
        },
        {
          id: 'thu_2',
          time: '02:15 PM – 03:45 PM',
          course: 'DEPT',
          title: 'Departmental Faculty & Curriculum Review Board',
          room: 'Boardroom A, Academic Block',
          type: 'Administrative Meeting',
        },
      ],
    },
    {
      day: 'Friday',
      slots: [
        {
          id: 'fri_1',
          time: '02:15 PM – 04:00 PM',
          course: 'RESEARCH',
          title: 'High Performance Computing Lab Research Colloquium',
          room: 'Lab 2B Systems Wing',
          type: 'Research & Mentorship',
        },
      ],
    },
  ];

  const currentDaySlots =
    weeklySchedule.find((d) => d.day === selectedDay)?.slots || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
          <span>Faculty Console</span>
          <span>/</span>
          <span className="font-semibold text-charcoal-900">Teaching Calendar</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
          Weekly Teaching Timetable & University Schedule
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Synchronized lecture slots, laboratory hours, and MET BKC institutional calendar.
        </p>
      </div>

      {/* Weekday Switcher Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        {weeklySchedule.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`rounded-lg px-4 py-2 font-bold transition whitespace-nowrap ${
              selectedDay === d.day
                ? 'bg-maroon-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Daily Slots List */}
      <div className="space-y-3">
        {currentDaySlots.map((slot) => (
          <div
            key={slot.id}
            className={`rounded-xl border p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition ${
              slot.isLiveNow
                ? 'border-maroon-700 bg-maroon-50/20 ring-1 ring-maroon-700/20'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                  {slot.course}
                </span>
                <span className="text-xs font-semibold text-slate-500">{slot.type}</span>
                {slot.isLiveNow && (
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 animate-pulse">
                    Live Today
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-charcoal-900">{slot.title}</h3>
              <div className="flex items-center space-x-4 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{slot.time}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{slot.room}</span>
                </span>
              </div>
            </div>

            {slot.course.startsWith('CS') && (
              <button
                onClick={() => onNavigateTab('attendance-marker')}
                className="flex items-center space-x-1.5 rounded-lg bg-charcoal-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-charcoal-800 transition shadow-xs shrink-0 self-start sm:self-center"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Mark Attendance</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* University Holiday Calendar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-charcoal-900 pb-2 border-b border-slate-100">
          Upcoming Statutory Holidays & University Recesses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {ACADEMIC_HOLIDAYS.map((hol) => (
            <div key={hol.id} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal-900">{hol.name}</span>
                <span className="font-mono text-[10px] text-slate-500">{hol.dateRange}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{hol.description}</div>
              <div className="mt-1 text-[10px] font-semibold text-maroon-700">{hol.engineImpact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
