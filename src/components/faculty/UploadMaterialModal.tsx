import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import { StudyMaterial } from '../../types';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (material: Partial<StudyMaterial>) => void;
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [courseCode, setCourseCode] = useState('CS502');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudyMaterial['category']>('Lecture Slides');
  const [fileFormat, setFileFormat] = useState<'PDF' | 'ZIP' | 'PY'>('PDF');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onUpload({
      courseCode,
      courseName: courseCode === 'CS502' ? 'Distributed Operating Systems' : 'Computer Networks & Protocols',
      title,
      category,
      fileFormat,
      fileSize: '5.2 MB',
      uploadDate: 'Today',
      author: 'Dr. Arvind Ramesh',
      downloadsCount: 0,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Upload Course Material
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <h4 className="text-base font-bold text-slate-900">Document Uploaded</h4>
            <p className="text-xs text-slate-500">Material is immediately accessible to registered students.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Subject</label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="CS502">CS502: Distributed Operating Systems</option>
                <option value="CS508">CS508: Computer Networks & Protocols</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Material Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lecture Slides #9: Byzantine Fault Tolerance & PBFT"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Material Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Lecture Slides">Lecture Slides</option>
                  <option value="Lab Manual">Lab Manual</option>
                  <option value="Reference Code">Reference Code</option>
                  <option value="Lecture Notes">Lecture Notes</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Format</label>
                <select
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="ZIP">ZIP Archive</option>
                  <option value="PY">Python Script (.py)</option>
                </select>
              </div>
            </div>

            {/* Dropzone mockup */}
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center cursor-pointer hover:bg-slate-100 transition">
              <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
              <div className="font-semibold text-slate-700">Drop PDF / ZIP file here</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Maximum file size: 50MB</div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700 transition shadow-xs"
              >
                Publish Material
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
