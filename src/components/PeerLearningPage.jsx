import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  FileText,
  Code2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  UploadCloud,
  Sun,
  Moon,
  Landmark,
  BookOpen,
  Lock,
  Trash2,
} from 'lucide-react';
import { getResources, uploadResource, deleteResource } from '../utils/resourcesStorage';

export default function PeerLearningPage({
  theme = 'dark',
  toggleTheme = () => {},
  navigate = () => {},
}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Form State for uploading new resources
  const [formData, setFormData] = useState({
    password: '',
    title: '',
    category: 'Workshop',
    date: '',
    duration: '',
    description: '',
    tags: '',
    slidesUrl: '',
    codeUrl: '',
    docsUrl: '',
  });

  // Load resources from code repository file via API
  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await getResources();
      setResources(data || []);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = resources;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (modalError) setModalError('');
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setModalError('');

    if (!formData.password) {
      setModalError('Please enter the upload password.');
      return;
    }

    if (!formData.title || !formData.description) {
      setModalError('Title and description are required.');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadResource({
        password: formData.password,
        title: formData.title,
        category: formData.category || 'Workshop',
        date: formData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        duration: formData.duration || 'Session',
        description: formData.description,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : ['Workshop'],
        slidesUrl: formData.slidesUrl || '',
        codeUrl: formData.codeUrl || '',
        docsUrl: formData.docsUrl || '',
      });

      if (result && result.resources) {
        setResources(result.resources);
      } else {
        await fetchResources();
      }

      setIsUploadModalOpen(false);
      setFormData({
        password: '',
        title: '',
        category: 'Workshop',
        date: '',
        duration: '',
        description: '',
        tags: '',
        slidesUrl: '',
        codeUrl: '',
        docsUrl: '',
      });

      setSuccessToast('Resource uploaded and saved to code file successfully!');
      setTimeout(() => setSuccessToast(''), 5000);
    } catch (err) {
      setModalError(err.message || 'Incorrect password! Only authorized users can upload resources.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteTarget) return;

    if (deletePassword !== 'MayureshPassword') {
      setDeleteError('Incorrect password! Enter the admin password to delete.');
      return;
    }

    setDeleting(true);
    setDeleteError('');

    try {
      await deleteResource({ id: deleteTarget.id, password: deletePassword });
      setResources((prev) => prev.filter((r) => String(r.id) !== String(deleteTarget.id)));
      const deletedTitle = deleteTarget.title;
      setDeleteTarget(null);
      setDeletePassword('');
      setSuccessToast(`Deleted "${deletedTitle}" successfully.`);
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete resource');
    } finally {
      setDeleting(false);
    }
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'workshop':
        return 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400';
      case 'bootcamp':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      case 'hackathon':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
      case 'tech session':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-100 dark:bg-[#07080a] text-slate-900 dark:text-white font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'dark' : ''
      } flex flex-col justify-between`}
    >
      {/* ── Top Floating Header ── */}
      <header className="sticky top-3 sm:top-6 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-[1500px] w-full mx-auto bg-white/95 dark:bg-[#121318] text-slate-900 dark:text-white rounded-full px-3 sm:px-6 md:px-7 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200 dark:border-[#22242c] pointer-events-auto flex items-center justify-between transition-colors duration-200">
          {/* Brand Logo & Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer min-w-0 pr-2"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:border-sky-500 group-hover:text-sky-500 transition-all shrink-0">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-900 dark:text-white truncate">
                  Peer Learning
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-semibold">
                  RAC
                </span>
              </div>
            </div>
          </button>

          {/* Right Action Controls: Theme + Add Resource */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#191a21] text-slate-700 dark:text-neutral-300 hover:text-sky-500 border border-slate-200 dark:border-[#2b2d38] transition-all cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => {
                setModalError('');
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-xs sm:text-sm font-bold shadow-md hover:bg-slate-800 dark:hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span>Add Resource</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Body ── */}
      <main className="flex-grow max-w-[1540px] w-[94%] mx-auto py-10 sm:py-14 lg:py-16">
        
        {/* Success Alert Toast */}
        {successToast && (
          <div className="mb-6 mx-auto max-w-xl p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">{successToast}</span>
          </div>
        )}

        {/* ── Hero Heading Section ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-mono font-semibold mb-4 tracking-wider uppercase shadow-sm">
            <Landmark className="w-4 h-4" />
            <span>Peer Learning Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            Events & Workshops{' '}
            <span className="text-sky-600 dark:text-sky-400">Resources</span>
          </h1>
        </div>

        {/* ── Resources Grid or Empty State ── */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 dark:text-neutral-400">Loading resources from repository...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 dark:border-[#262832] bg-white/50 dark:bg-[#111216]/50">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-neutral-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {resources.length === 0 ? 'No resources uploaded yet' : 'No matching resources found'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
              {resources.length === 0
                ? 'Workshop presentations, slides, starter code, and documentation will appear here once uploaded with the admin password.'
                : 'No resources match your search query. Try different keywords or select a different category.'}
            </p>
            <button
              onClick={() => {
                setModalError('');
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Resource</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 dark:border-[#262832] bg-white dark:bg-[#111216] p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-[#383b48] group"
              >
                <div>
                  {/* Top Row: Category Pill + Date + Delete */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                      <button
                        onClick={() => {
                          setDeleteTarget(item);
                          setDeletePassword('');
                          setDeleteError('');
                        }}
                        title="Delete workshop"
                        aria-label={`Delete ${item.title}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 dark:text-neutral-500 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Resource Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-[#191a21] text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-[#2a2d38]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resource Links / Action Buttons */}
                <div className="pt-5 border-t border-slate-100 dark:border-[#22242c] flex flex-wrap items-center gap-2">
                  {item.slidesUrl && (
                    <a
                      href={item.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-500" />
                      <span>Slides</span>
                    </a>
                  )}

                  {item.codeUrl && (
                    <a
                      href={item.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Code Repo</span>
                    </a>
                  )}

                  {item.docsUrl && (
                    <a
                      href={item.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                      <span>Guide & Notes</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ── Upload Resource Modal (Protected by Password) ── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#2b2e3a] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Upload Event / Workshop Resource
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
                  Only authorized users with the correct password can upload.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1d1f27] hover:bg-slate-200 dark:hover:bg-[#282b35] flex items-center justify-center text-slate-600 dark:text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Error Alert */}
            {modalError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="space-y-4 text-left">
              
              {/* Password Protection Field */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Upload Password *
                  </span>
                  <span className="text-[10px] font-normal lowercase">Required for submission</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter upload password"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-amber-500"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5">
                  Resource / Session Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Inverse Kinematics for Robotic Arms"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                />
              </div>

              {/* Category & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Tech Session">Tech Session</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5">
                    Date / Month
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. October 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5">
                  Overview / Topics Covered *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summary of key concepts, tools used, and what members will learn..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g. ROS 2, Kinematics, Python, Simulation"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                />
              </div>

              {/* Links: Slides, Code, Docs */}
              <div className="space-y-2.5 pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Resource Links (Optional)
                </span>

                <input
                  type="url"
                  name="slidesUrl"
                  value={formData.slidesUrl}
                  onChange={handleInputChange}
                  placeholder="Slides / Presentation URL (e.g. Google Slides / Drive link)"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none focus:border-sky-500"
                />

                <input
                  type="url"
                  name="codeUrl"
                  value={formData.codeUrl}
                  onChange={handleInputChange}
                  placeholder="GitHub Repository or Starter Code URL"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none focus:border-sky-500"
                />

                <input
                  type="url"
                  name="docsUrl"
                  value={formData.docsUrl}
                  onChange={handleInputChange}
                  placeholder="Lab Guide / Documentation URL"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0a0b0e] border border-slate-200 dark:border-[#242630] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none focus:border-sky-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-[#242630]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-black font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Publish Resource</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ── Delete Workshop Modal (Protected by Password) ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#2b2e3a] p-6 sm:p-7 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Delete Workshop</h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">Admin password required</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(null);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-neutral-300 mb-4">
              Are you sure you want to remove <span className="font-semibold text-slate-900 dark:text-white">"{deleteTarget.title}"</span>? This will permanently remove it from the repository CSV file.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{deleteError}</span>
              </div>
            )}

            <form onSubmit={handleDelete} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                  Admin Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={deletePassword}
                    onChange={(e) => {
                      setDeletePassword(e.target.value);
                      if (deleteError) setDeleteError('');
                    }}
                    placeholder="Enter MayureshPassword"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(null);
                    setDeletePassword('');
                    setDeleteError('');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-[#2a2d38] text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="w-full py-8 border-t border-slate-200 dark:border-[#18181c] bg-white dark:bg-[#08080a] text-center text-xs text-slate-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Robotics & Automation Club. Peer Learning & Workshop Resources.</p>
      </footer>
    </div>
  );
}
