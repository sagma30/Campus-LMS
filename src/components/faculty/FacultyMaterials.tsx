import React, { useState } from 'react';
import {
  FolderOpen,
  Plus,
  Upload,
  Download,
  Trash2,
  Search,
  FileText,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  CheckCircle2,
  X,
  Filter,
  Eye,
  Sparkles
} from 'lucide-react';
import { StudyMaterial } from '../../types';
import { INITIAL_FACULTY_MATERIALS, INITIAL_FACULTY_SUBJECTS } from '../../data/facultyService';

interface FacultyMaterialsProps {
  onNavigateTab?: (tab: string) => void;
}

export const FacultyMaterials: React.FC<FacultyMaterialsProps> = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>(INITIAL_FACULTY_MATERIALS);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formSubject, setFormSubject] = useState<string>('CS502');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('Lecture Notes');
  const [formFormat, setFormFormat] = useState<string>('PDF');
  const [formSize, setFormSize] = useState<string>('3.2 MB');
  const [formFileName, setFormFileName] = useState<string>('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const courseObj = INITIAL_FACULTY_SUBJECTS.find((s) => s.code === formSubject);
    const newMaterial: StudyMaterial = {
      id: `mat_${Date.now()}`,
      courseCode: formSubject,
      courseName: courseObj ? courseObj.name : 'Computer Science Course',
      title: formTitle,
      category: formCategory as any,
      fileFormat: formFormat as any,
      fileSize: formSize,
      uploadDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      author: 'Dr. Arvind Ramesh',
      downloadUrl: '#',
      downloadsCount: 0,
    };

    setMaterials([newMaterial, ...materials]);
    setIsUploadOpen(false);
    setToastMessage(`"${formTitle}" uploaded and published to ${formSubject} students.`);
    setTimeout(() => setToastMessage(null), 4000);

    // Reset Form
    setFormTitle('');
    setFormFileName('');
  };

  const handleDeleteMaterial = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the course repository?`)) {
      setMaterials(materials.filter((m) => m.id !== id));
      setToastMessage(`Removed "${title}" from repository.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDownloadSimulation = (title: string, format: string) => {
    const dummyContent = `MET Bhujbal Knowledge City - Course Material\nTitle: ${title}\nInstructor: Dr. Arvind Ramesh\nVerified Institutional Artifact`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage(`Downloaded ${title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredMaterials = materials.filter((mat) => {
    const matchesSubject = selectedSubject === 'all' || mat.courseCode === selectedSubject;
    const matchesSearch =
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="font-semibold text-charcoal-900">Study Materials</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal-900">
            Courseware & Study Materials Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage lecture slide decks, syllabus manuals, reference source code, and problem sets.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <button
            onClick={() => setIsUploadOpen(!isUploadOpen)}
            className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-4 py-2 text-xs font-bold text-white hover:bg-maroon-800 transition shadow-sm"
          >
            {isUploadOpen ? <X className="h-3.5 w-3.5" /> : <Upload className="h-3.5 w-3.5" />}
            <span>{isUploadOpen ? 'Close Form' : 'Upload Study Material'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {toastMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Upload Material Inline Form */}
      {isUploadOpen && (
        <form
          onSubmit={handleUploadSubmit}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-charcoal-900">Upload Learning Material</h2>
              <p className="text-xs text-slate-500">Provide document metadata and distribute to enrolled students.</p>
            </div>
            <span className="rounded bg-maroon-50 text-maroon-700 font-mono text-xs px-2 py-0.5 font-bold">
              Direct Publication
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Subject */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Subject</label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
              >
                {INITIAL_FACULTY_SUBJECTS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} - {s.name} ({s.section})
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              >
                <option value="Lecture Notes">Lecture Notes / Slide Deck</option>
                <option value="Lab Manual">Lab Manual / Practicum</option>
                <option value="Reference Code">Reference Code / Scripts</option>
                <option value="Reference Paper">Academic Reference Paper</option>
                <option value="Tutorial">Problem Set Tutorial</option>
              </select>
            </div>

            {/* File Format */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">File Format</label>
              <select
                value={formFormat}
                onChange={(e) => setFormFormat(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-mono focus:border-maroon-700 focus:outline-none"
              >
                <option value="PDF">PDF Document</option>
                <option value="ZIP">ZIP Archive (Source Code)</option>
                <option value="PY">Python Script (.py)</option>
                <option value="PCAP">Wireshark Packet Trace (.pcap)</option>
                <option value="PPTX">PowerPoint Deck (.pptx)</option>
              </select>
            </div>

            {/* File Size */}
            <div>
              <label className="block font-bold text-charcoal-900 mb-1">Estimated Size</label>
              <input
                type="text"
                value={formSize}
                onChange={(e) => setFormSize(e.target.value)}
                placeholder="e.g. 2.4 MB"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-charcoal-900 focus:border-maroon-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">Material Title & Description</label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Module 3: Raft Consensus Protocol Architecture Slides"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-charcoal-900 font-semibold focus:border-maroon-700 focus:outline-none"
            />
          </div>

          {/* File Picker Simulation */}
          <div className="text-xs">
            <label className="block font-bold text-charcoal-900 mb-1">File Upload</label>
            <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 cursor-pointer hover:bg-slate-100 transition">
              <Upload className="h-6 w-6 text-slate-400 mb-1" />
              <span className="font-semibold text-charcoal-900">
                {formFileName ? formFileName : 'Click to select file from local drive'}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Supports PDF, ZIP, PY, PCAP up to 50MB
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormFileName(e.target.files[0].name);
                    if (!formTitle) setFormTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                  }
                }}
              />
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-lg bg-maroon-700 px-5 py-2 font-bold text-white hover:bg-maroon-800 transition shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Publish to Courseware</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Controls */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials by title or category..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-charcoal-900 focus:border-maroon-700 focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-maroon-700 focus:outline-none"
          >
            <option value="all">All Assigned Subjects</option>
            <option value="CS502">CS502 (Distributed OS)</option>
            <option value="CS508">CS508 (Computer Networks)</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Showing <strong>{filteredMaterials.length}</strong> items in repository
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-maroon-700 bg-maroon-50 px-2 py-0.5 rounded border border-maroon-200">
                    {mat.courseCode}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                    {mat.category}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-charcoal-900 bg-slate-100 px-2 py-0.5 rounded">
                  {mat.fileFormat}
                </span>
              </div>

              <h3 className="text-sm font-bold text-charcoal-900 leading-snug line-clamp-2">
                {mat.title}
              </h3>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-3">
                <span>Size: <strong>{mat.fileSize}</strong></span>
                <span>•</span>
                <span>Uploaded: {mat.uploadDate}</span>
                <span>•</span>
                <span>{mat.downloadsCount} downloads</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDownloadSimulation(mat.title, mat.fileFormat)}
                className="flex items-center space-x-1.5 text-xs font-bold text-maroon-700 hover:text-maroon-800 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Artifact</span>
              </button>

              <button
                onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                className="p-1 text-slate-400 hover:text-maroon-700 transition"
                title="Delete material"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
