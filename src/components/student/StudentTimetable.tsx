import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  CheckCircle2,
  LayoutGrid,
  ListFilter,
  ArrowRight
} from 'lucide-react';
import { WEEKLY_TIMETABLE } from '../../data/mockData';
import { TimetableSlot } from '../../types';

export const StudentTimetable: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
  const [selectedDay, setSelectedDay] = useState<typeof days[number]>('Tuesday');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const currentSlots = WEEKLY_TIMETABLE[selectedDay] || [];

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Academic Timetable & Class Schedule
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              Sem V • Sec A
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Department of Computer Engineering • Academic Year 2026–27
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View mode toggle */}
          <div className="flex items-center rounded border border-slate-300 bg-white p-0.5 text-xs">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
                viewMode === 'daily'
                  ? 'bg-slate-900 font-bold text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>Daily List</span>
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
                viewMode === 'weekly'
                  ? 'bg-slate-900 font-bold text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Weekly Matrix</span>
            </button>
          </div>

          <button
            onClick={() => alert('Downloading official MET BKC Timetable PDF...')}
            className="flex items-center space-x-1.5 rounded border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Download Timetable PDF</span>
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        <>
          {/* Day Selector Tabs */}
          <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-2">
            {days.map((day) => {
              const isSelected = selectedDay === day;
              const isToday = day === 'Tuesday';
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex items-center space-x-1.5 rounded px-3.5 py-1.5 text-xs transition ${
                    isSelected
                      ? 'bg-red-700 font-bold text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span
                      className={`rounded px-1 text-[9px] font-mono uppercase ${
                        isSelected ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      Today
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Daily Schedule Table */}
          <div className="rounded border border-slate-200 bg-white">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wide">
                {selectedDay}'s Class Schedule
              </span>
              <span className="font-mono text-slate-500">{currentSlots.length} Total Sessions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-2.5 px-4 w-36">Time Slot</th>
                    <th className="py-2.5 px-4">Course & Code</th>
                    <th className="py-2.5 px-4">Faculty In-Charge</th>
                    <th className="py-2.5 px-4">Classroom / Lab</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentSlots.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        No lectures scheduled for {selectedDay}.
                      </td>
                    </tr>
                  ) : (
                    currentSlots.map((slot) => {
                      if (slot.isRecess) {
                        return (
                          <tr key={slot.id} className="bg-slate-50/80 text-slate-500">
                            <td className="py-2 px-4 font-mono font-medium">{slot.timeWindow}</td>
                            <td colSpan={3} className="py-2 px-4 italic">
                              {slot.courseName} (Intermission)
                            </td>
                            <td className="py-2 px-4 font-mono text-[11px]">60 Mins</td>
                          </tr>
                        );
                      }

                      const isLive = slot.status === 'in_progress';

                      return (
                        <tr
                          key={slot.id}
                          className={`hover:bg-slate-50/60 ${
                            isLive ? 'bg-red-50/40 font-medium' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                            {slot.timeWindow}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-mono font-bold text-slate-900">{slot.courseCode}</div>
                            <div className="text-slate-600">{slot.courseName}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-700">{slot.faculty}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{slot.room}</td>
                          <td className="py-3 px-4">
                            {isLive ? (
                              <span className="inline-flex items-center space-x-1.5 rounded bg-red-100 text-red-900 px-2 py-0.5 font-bold font-mono text-[11px]">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                <span>In Progress</span>
                              </span>
                            ) : slot.attendanceStatus === 'Present' ? (
                              <span className="inline-flex items-center space-x-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[11px] font-semibold">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                <span>Present</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px]">
                                Upcoming
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Weekly Matrix Grid View (FR-TIME-01) */
        <div className="overflow-x-auto rounded border border-slate-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200">Day</th>
                <th className="py-2.5 px-3 border-r border-slate-200">08:30 – 10:00</th>
                <th className="py-2.5 px-3 border-r border-slate-200">10:00 – 11:30</th>
                <th className="py-2.5 px-3 border-r border-slate-200">11:30 – 12:45</th>
                <th className="py-2.5 px-3 border-r border-slate-200">12:45 – 02:15</th>
                <th className="py-2.5 px-3">02:15 – 03:45</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {days.map((day) => {
                const slots = WEEKLY_TIMETABLE[day] || [];
                const isToday = day === 'Tuesday';

                return (
                  <tr key={day} className={`hover:bg-slate-50/70 ${isToday ? 'bg-red-50/20' : ''}`}>
                    <td className="py-3 px-3 font-bold text-slate-900 border-r border-slate-200 align-top">
                      <div className="flex items-center space-x-1.5">
                        <span>{day}</span>
                        {isToday && (
                          <span className="rounded bg-red-700 px-1 py-0.2 text-[9px] font-mono text-white">
                            Today
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Slot Columns */}
                    {slots.map((s) => (
                      <td key={s.id} className="py-2.5 px-2.5 align-top border-r border-slate-200">
                        {s.isRecess ? (
                          <div className="rounded bg-slate-100 p-2 text-center text-slate-500 font-mono text-[10px]">
                            LUNCH RECESS
                          </div>
                        ) : (
                          <div className="rounded border border-slate-200 bg-slate-50/70 p-2 space-y-1">
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="font-bold text-slate-900">{s.courseCode}</span>
                              <span className="text-slate-500 text-[10px]">{s.room}</span>
                            </div>
                            <div className="font-medium text-slate-800 line-clamp-1">{s.courseName}</div>
                            <div className="text-[10px] text-slate-500 truncate">{s.faculty}</div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
