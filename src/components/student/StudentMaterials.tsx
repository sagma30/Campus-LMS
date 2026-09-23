import React, { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Download,
  Search,
  FileCode,
  FileArchive,
  BookOpen
} from 'lucide-react';
import { INITIAL_STUDY_MATERIALS } from '../../data/mockData';

export const StudentMaterials: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = INITIAL_STUDY_MATERIALS.filter((mat) => {
    const matchesCourse = selectedCourse === 'all' || mat.courseCode === selectedCourse;
    const matchesSearch =
      mat.title.toLowerCase().includes(search.toLowerCase()) ||
      mat.category.toLowerCase().includes(search.toLowerCase()) ||
      mat.courseCode.toLowerCase().includes(search.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Courseware & Study Materials Repository
            </h1>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-mono font-bold text-red-900">
              SPPU Curriculum
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            MET BKC Institute of Engineering • Lecture Notes, Practical Lab Manuals & Reference Testbeds
          </p>
        </div>

        <button
          onClick={() => alert('Downloading bundled semester notes (ZIP)...')}
          className="inline-flex items-center space-x-1.5 rounded bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-800 transition"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download All Course Notes (ZIP)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search slides, lab sheets, syllabi..."
            className="w-full rounded border border-slate-300 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-red-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {['all', 'CS501', 'CS502', 'CS505', 'CS508'].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCourse(code)}
              className={`rounded px-3 py-1 text-xs font-mono transition ${
                selectedCourse === code
                  ? 'bg-red-700 text-white font-bold shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              {code === 'all' ? 'All Subjects' : code}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Table / List */}
      <div className="rounded border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-4 w-28">Subject</th>
              <th className="py-2.5 px-4">Document Title & Summary</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4 font-mono">Size / Format</th>
              <th className="py-2.5 px-4">Faculty In-Charge</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((mat) => (
              <tr key={mat.id} className="hover:bg-slate-50/70">
                <td className="py-3 px-4 font-mono">
                  <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {mat.courseCode}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{mat.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{mat.description}</div>
                </td>
                <td className="py-3 px-4 text-slate-600">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                    {mat.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                  {mat.fileSize} • {mat.fileFormat}
                </td>
                <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                  {mat.uploadedBy}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => alert(`Downloading official notes: ${mat.title}`)}
                    className="inline-flex items-center space-x-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
