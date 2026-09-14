import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  Youtube,
  Video,
  Book,
  FileText,
  ExternalLink,
  GraduationCap,
  Trash2,
  Lock,
  X,
  AlertCircle,
  CheckCircle2,
  Sun,
  Moon,
  Library,
  Bookmark,
} from 'lucide-react';
import { getLibraryItems, uploadLibraryItem, deleteLibraryItem } from '../utils/libraryStorage';

export default function DigitalLibraryPage({
  theme = 'dark',
  toggleTheme = () => {},
  navigate = () => {},
}) {
  const [items, setItems] = useState([]);
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

  // Form state
  const [formData, setFormData] = useState({
    password: '',
    title: '',
    type: 'YouTube Playlist',
    author: '',
    url: '',
    description: '',
    tags: '',
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getLibraryItems();
      setItems(data || []);
    } catch (err) {
      console.error('Failed to fetch library items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setModalError('');

    if (formData.password !== 'MayureshPassword') {
      setModalError('Incorrect password! Enter the admin password to upload.');
      return;
    }

    if (!formData.title.trim() || !formData.url.trim()) {
      setModalError('Please provide both a Title and a URL.');
      return;
    }

    setUploading(true);

    try {
      const result = await uploadLibraryItem(formData);
      if (result && result.item) {
        setItems((prev) => [result.item, ...prev]);
      } else {
        await fetchItems();
      }

      setIsUploadModalOpen(false);
      setFormData({
        password: '',
        title: '',
        type: 'YouTube Playlist',
        author: '',
        url: '',
        description: '',
        tags: '',
      });

      setSuccessToast('Resource uploaded and saved to repository file successfully!');
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (err) {
      setModalError(err.message || 'Incorrect password! Only authorized users can upload.');
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
      await deleteLibraryItem({ id: deleteTarget.id, password: deletePassword });
      setItems((prev) => prev.filter((item) => String(item.id) !== String(deleteTarget.id)));
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'YouTube Playlist':
        return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case 'YouTube Video':
        return <Video className="w-3.5 h-3.5 text-red-400" />;
      case 'Book':
        return <Book className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Documentation / Guide':
        return <FileText className="w-3.5 h-3.5 text-sky-500" />;
      case 'Course / Tutorial':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'YouTube Playlist':
        return 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400';
      case 'YouTube Video':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400';
      case 'Book':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      case 'Documentation / Guide':
        return 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400';
      case 'Course / Tutorial':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-neutral-400';
    }
  };

  const getActionButtonLabel = (type) => {
    switch (type) {
      case 'YouTube Playlist':
        return 'Open Playlist';
      case 'YouTube Video':
        return 'Watch Video';
      case 'Book':
        return 'Read Book';
      case 'Course / Tutorial':
        return 'Open Course';
      default:
        return 'Open Resource';
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
                  Digital Library
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-semibold">
                  RAC
                </span>
              </div>
            </div>
          </button>

          {/* Right Action Controls: Theme + Upload */}
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

        {/* ── Hero Heading (Clean & Direct) ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-mono font-semibold mb-4 tracking-wider uppercase shadow-sm">
            <Library className="w-4 h-4" />
            <span>Curated Knowledge Vault</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-2">
            Digital <span className="text-sky-600 dark:text-sky-400">Library</span>
          </h1>
        </div>

        {/* ── Resources Grid or Empty State ── */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 dark:text-neutral-400 font-mono">Loading library resources...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 dark:border-[#262832] bg-white/50 dark:bg-[#111216]/50">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-neutral-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No resources in Digital Library yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
              Upload YouTube playlists, tutorials, books, or documentation to populate the library.
            </p>
            <button
              onClick={() => {
                setModalError('');
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 dark:border-[#262832] bg-white dark:bg-[#111216] p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-[#383b48] group"
              >
                <div>
                  {/* Top Row: Type Badge + Delete */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${getTypeBadgeClass(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </span>

                    <button
                      onClick={() => {
                        setDeleteTarget(item);
                        setDeletePassword('');
                        setDeleteError('');
                      }}
                      title="Delete resource"
                      aria-label={`Delete ${item.title}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 dark:text-neutral-500 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Resource Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Author / Creator */}
                  {item.author && (
                    <p className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-3 font-medium">
                      By {item.author}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-5 font-normal line-clamp-3">
                      {item.description}
                    </p>
                  )}

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

                {/* Bottom Action Button */}
                <div className="pt-5 border-t border-slate-100 dark:border-[#22242c] flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    {getTypeIcon(item.type)}
                    <span>{getActionButtonLabel(item.type)}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Add Resource Modal (Protected by Password) ── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#2b2e3a] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Add Library Resource
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                    Admin password required
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Message Alert */}
            {modalError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-medium">{modalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleUpload} className="space-y-4">
              {/* Admin Password */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161820] border border-slate-200 dark:border-[#282a36]">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1.5 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-sky-500" />
                  <span>Admin Password</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter MayureshPassword"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#0e0f14] border border-slate-200 dark:border-[#2b2d3a] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              {/* Resource Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                  Resource Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. ROS 2 Full Course / Modern Robotics Book"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                />
              </div>

              {/* Resource Type & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500"
                  >
                    <option value="YouTube Playlist">YouTube Playlist</option>
                    <option value="YouTube Video">YouTube Video</option>
                    <option value="Book">Book / PDF</option>
                    <option value="Documentation / Guide">Documentation / Guide</option>
                    <option value="Course / Tutorial">Course / Tutorial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                    Author / Channel (Optional)
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="e.g. Articulated Robotics / Kevin Lynch"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* URL / Link */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                  Resource Link / URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/playlist?list=... or PDF URL"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                  Brief Description (Optional)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summary of concepts covered, topics, or key highlights..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-medium">
                  Tags (comma-separated, optional)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="ROS 2, Kinematics, Python, OpenCV"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#191a22] border border-slate-200 dark:border-[#2a2d38] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm outline-none focus:border-sky-500"
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
                      <span>Saving...</span>
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

      {/* ── Delete Resource Modal (Protected by Password) ── */}
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
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Delete Resource</h2>
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
        <p>© {new Date().getFullYear()} Robotics & Automation Club. Digital Library & Knowledge Vault.</p>
      </footer>
    </div>
  );
}

