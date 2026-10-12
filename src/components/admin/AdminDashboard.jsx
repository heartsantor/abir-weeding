import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Save,
  RotateCcw,
  Download,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  Heart,
  MessageSquare,
  Code,
  MapPin,
  Sparkles,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDashboard({ isOpen, onClose }) {
  const { data, updateData, resetData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('wedding_admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('letter');
  const [rawJsonText, setRawJsonText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState(() => data || {});

  // Sync formData when data loads or modal opens
  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setRawJsonText(JSON.stringify(data, null, 2));
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'abir' && password === 'Trialvo@123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('wedding_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('ভুল ইউজারনেম অথবা পাসওয়ার্ড! সঠিক তথ্য দিন।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wedding_admin_auth');
    setUsername('');
    setPassword('');
  };

  // Helper getter for nested path
  const getVal = (path, fallback = '') => {
    if (!formData) return fallback;
    const parts = path.split('.');
    let cur = formData;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) {
        cur = cur[p];
      } else {
        return fallback;
      }
    }
    return cur ?? fallback;
  };

  // Helper setter for nested path
  const setVal = (path, value) => {
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      setRawJsonText(JSON.stringify(copy, null, 2));
      return copy;
    });
  };

  const handleSave = () => {
    try {
      let toSave;
      if (activeTab === 'raw') {
        toSave = JSON.parse(rawJsonText);
        setFormData(toSave);
      } else {
        toSave = formData;
        setRawJsonText(JSON.stringify(formData, null, 2));
      }
      updateData(toSave);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('JSON ফরম্যাটে সমস্যা আছে: ' + err.message);
    }
  };

  const handleReset = () => {
    if (window.confirm('আপনি কি পূর্বনির্ধারিত ডিফল্ট ডেটায় ফিরে যেতে চান?')) {
      resetData();
      alert('সফলভাবে রিসেট সম্পন্ন হয়েছে!');
      onClose();
    }
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reusable Dual-Language Input Field
  const BilingualField = ({
    title,
    helper,
    pathBn,
    pathEn,
    isTextarea = false,
    rows = 2,
    placeholderBn = '',
    placeholderEn = '',
  }) => {
    return (
      <div className="bg-white/95 p-3.5 sm:p-4 rounded-2xl border border-[#edd6de] shadow-xs hover:border-[#dfbac5] transition-colors space-y-2.5">
        <div className="flex items-baseline justify-between">
          <label className="text-xs sm:text-sm font-semibold text-[#663e4d] font-bengali-serif">
            {title}
          </label>
          {helper && <span className="text-[10.5px] text-[#9b7280]">{helper}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Bengali Field */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded-md bg-[#fdf0e0] border border-[#f3d7b8] text-[#915a20] font-bold text-[10px]">
                বাংলা (BN)
              </span>
            </div>
            {isTextarea ? (
              <textarea
                rows={rows}
                value={getVal(pathBn)}
                onChange={(e) => setVal(pathBn, e.target.value)}
                placeholder={placeholderBn}
                className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4a323b] placeholder-[#a78b95] text-xs outline-none transition-all leading-relaxed shadow-xs"
              />
            ) : (
              <input
                type="text"
                value={getVal(pathBn)}
                onChange={(e) => setVal(pathBn, e.target.value)}
                placeholder={placeholderBn}
                className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4a323b] placeholder-[#a78b95] text-xs outline-none transition-all shadow-xs"
              />
            )}
          </div>

          {/* English Field */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded-md bg-[#fcecf1] border border-[#f2c7d4] text-[#9e4663] font-bold text-[10px]">
                ENGLISH (EN)
              </span>
            </div>
            {isTextarea ? (
              <textarea
                rows={rows}
                value={getVal(pathEn)}
                onChange={(e) => setVal(pathEn, e.target.value)}
                placeholder={placeholderEn}
                className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4a323b] placeholder-[#a78b95] text-xs outline-none transition-all leading-relaxed shadow-xs"
              />
            ) : (
              <input
                type="text"
                value={getVal(pathEn)}
                onChange={(e) => setVal(pathEn, e.target.value)}
                placeholder={placeholderEn}
                className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4a323b] placeholder-[#a78b95] text-xs outline-none transition-all shadow-xs"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'letter', label: 'আমন্ত্রণপত্র', icon: FileText },
    { id: 'couple', label: 'বর ও কনে', icon: Users },
    { id: 'event', label: 'তারিখ ও ভেন্যু', icon: Calendar },
    { id: 'blessings', label: 'শুভেচ্ছান্তে ও পরিবার', icon: Heart },
    { id: 'gallery', label: 'ফটো গ্যালারি', icon: ImageIcon },
    { id: 'guest', label: 'অতিথি ও ফুটার', icon: MessageSquare },
    { id: 'raw', label: 'Raw JSON', icon: Code },
  ];

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#fffafd] to-[#fbf2f6] text-[#4a333d] rounded-3xl shadow-[0_25px_60px_-15px_rgba(115,55,75,0.35)] border border-[#e8c8d2] overflow-hidden p-6 sm:p-8 text-center">
          {/* Subtle decorative gold floral corners or glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-[#ffdbe5]/40 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-tl from-[#ffdbe5]/40 to-transparent blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f4dfe5]/80 hover:bg-[#ebd0d8] text-[#7d5060] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Monogram / Royal Emblem */}
          <div className="w-20 h-20 mx-auto mb-3 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f6d7e0] to-[#fdf4f7] blur-sm opacity-90" />
            <img
              src="/assets/monogram-an-transparent.png"
              alt="Royal Monogram"
              className="w-16 h-16 object-contain relative z-10 drop-shadow-sm transform hover:scale-105 transition-transform"
            />
          </div>

          {/* Title & Tagline */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#6d4453] font-bengali-serif mb-1 tracking-tight">
            অ্যাডমিন প্রবেশদ্বার
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9b6877] mb-2 font-montserrat">
            Wedding Invitation Control
          </p>
          <div className="w-20 h-[1.5px] mx-auto bg-gradient-to-r from-transparent via-[#c78a9a] to-transparent mb-5" />

          {/* Error message if any */}
          {authError && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#fae8ec] border border-[#e8b5c1] text-[#913b4e] text-xs font-medium text-center">
              {authError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#6d4453]">
                ইউজারনেম (Username)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#a77382] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ইউজারনেম লিখুন"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 border border-[#e0c2cb] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4c353e] placeholder-[#b096a0] text-xs outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#6d4453]">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#a77382] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 border border-[#e0c2cb] focus:border-[#b57a8d] focus:ring-2 focus:ring-[#c78a9a]/20 text-[#4c353e] placeholder-[#b096a0] text-xs outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#ba7b8e] via-[#a36577] to-[#8d4f61] hover:from-[#c5879a] hover:to-[#9a596c] shadow-[0_4px_14px_rgba(163,101,119,0.32)] hover:shadow-[0_6px_20px_rgba(163,101,119,0.45)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>লগইন করুন</span>
              <span>✦</span>
            </button>
          </form>

          <p className="text-[10px] text-[#9c7885] mt-5">
            অনুমোদিত অ্যাডমিন ব্যতীত প্রবেশ নিষেধ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-gradient-to-b from-[#fffafd] to-[#fcf4f7] text-[#4a333d] rounded-3xl shadow-[0_25px_70px_rgba(110,45,65,0.3)] border border-[#e8c8d2] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#edd2dc] bg-gradient-to-r from-[#faeef3] via-[#fff5f8] to-[#fbf0f4]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4dbe3] border border-[#e2b8c5] flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/assets/monogram-an-transparent.png"
                alt="AN"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold font-montserrat text-[#683f4e] leading-tight">
                  Wedding Admin Control Panel
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#c78a9a]/20 text-[#854558] text-[10px] font-semibold">
                  Live Sync
                </span>
              </div>
              <span className="text-[11px] text-[#946977]">
                বাংলা ও ইংরেজি উভয়ের জন্য ফিল্ডভিত্তিক লাইভ ডাটা ম্যানেজমেন্ট
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#f4dfe5]/70 hover:bg-[#ebd0d8] text-[#7d5060] transition-colors cursor-pointer shadow-sm"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 sm:px-6 py-2.5 bg-[#fdf5f8] border-b border-[#edd4dc] text-xs">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap text-xs cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ba7b8e] to-[#995b6e] text-white font-bold shadow-[0_2px_8px_rgba(163,101,119,0.35)]'
                        : 'bg-white/80 hover:bg-white text-[#7d5161] border border-[#ebd3db]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#fff9fa] text-[#825665] border border-[#e5ccd4] text-xs transition-colors shadow-xs cursor-pointer"
                title="Download data.json"
              >
                <Download className="w-3.5 h-3.5 text-[#b37587]" />
                <span className="hidden sm:inline">Export JSON</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#fff0f4] text-[#a64860] border border-[#f0c3cf] text-xs transition-colors shadow-xs cursor-pointer"
                title="Reset to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#c75e7a]" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-[#fae8eb] hover:bg-[#f6d4da] text-[#9e3346] border border-[#edb9c3] text-xs transition-colors font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Notification */}
          {saveSuccess && (
            <div className="bg-[#eafaf1] border-b border-[#a8e8c1] py-2 px-6 flex items-center gap-2 text-[#196b3a] text-xs font-semibold animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-[#229752]" />
              <span>
                ডেটা সফলভাবে সেভ হয়েছে! পাবলিক ওয়েবসাইটে তথ্য তৎক্ষণাৎ আপডেট হয়েছে।
              </span>
            </div>
          )}

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* TAB 1: আমন্ত্রণপত্র (Letter) */}
            {activeTab === 'letter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#ba7b8e]" />
                    <span>আমন্ত্রণপত্র ও বিসমিল্লাহ টেক্সট</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    ইনভিটেশন কার্ডের মূল চিঠি
                  </span>
                </div>

                <BilingualField
                  title="১. বিসমিল্লাহ শিরোনাম"
                  helper="আরবি/বাংলা ক্যালিগ্রাফির নিচের হেডিং"
                  pathBn="invitationLetter.bismillahTitle.bn"
                  pathEn="invitationLetter.bismillahTitle.en"
                  placeholderBn="বিসমিল্লাহির রাহমানির রাহীম"
                  placeholderEn="Bismillahir Rahmanir Rahim"
                />

                <BilingualField
                  title="২. বিসমিল্লাহ অর্থ / সাবটাইটেল"
                  helper="In the Name of Allah..."
                  pathBn="invitationLetter.bismillahSub.bn"
                  pathEn="invitationLetter.bismillahSub.en"
                  placeholderBn="পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে"
                  placeholderEn="In the Name of Allah, the Most Gracious, the Most Merciful"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BilingualField
                    title="৩. সম্বোধন (Salutation)"
                    helper="কার্ডের শুরুর ডাক"
                    pathBn="invitationLetter.salutation.bn"
                    pathEn="invitationLetter.salutation.en"
                    placeholderBn="জনাব / জনাবা,"
                    placeholderEn="Dear Sir / Madam,"
                  />

                  <BilingualField
                    title="৪. সালাম (Greeting)"
                    helper="ইসলামিক শুভেচ্ছা"
                    pathBn="invitationLetter.greeting.bn"
                    pathEn="invitationLetter.greeting.en"
                    placeholderBn="আসসালামু আলাইকুম,"
                    placeholderEn="Assalamu Alaikum,"
                  />
                </div>

                <BilingualField
                  title="৫. মূল আমন্ত্রণপত্র চিঠি (Body Text)"
                  helper="সম্পূর্ণ বর্ণনামূলক নিমন্ত্রণ টেক্সট"
                  pathBn="invitationLetter.body.bn"
                  pathEn="invitationLetter.body.en"
                  isTextarea={true}
                  rows={6}
                  placeholderBn="পরম করুনাময় আল্লাহ তা'য়ালার অশেষ রহমতে আসছে ২৫শে অক্টোবর..."
                  placeholderEn="By the grace and mercy of Almighty Allah, on Sunday, 25 October 2026..."
                />
              </div>
            )}

            {/* TAB 2: বর ও কনে (Couple) */}
            {activeTab === 'couple' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#ba7b8e]" />
                    <span>বর ও কনের পরিচিতি ও ঠিকানা</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    কার্ডের পরিচিতি সেকশন
                  </span>
                </div>

                <BilingualField
                  title="আমন্ত্রণ ভূমিকা বার্তা (Eyebrow Text)"
                  helper="নামের উপরের ভূমিকা"
                  pathBn="couple.eyebrow.bn"
                  pathEn="couple.eyebrow.en"
                  isTextarea={true}
                  rows={2}
                />

                {/* Groom Section */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/95 to-[#fff5f8] border border-[#ebd2dc] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f3dbe2] pb-2">
                    <div className="text-xs font-bold text-[#683f4e] uppercase tracking-wider flex items-center gap-1.5">
                      <span>🤵 বরের বিবরণ (Groom)</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fcedf2] text-[#93465e] border border-[#f2cad6] font-semibold">
                      The Groom
                    </span>
                  </div>

                  <BilingualField
                    title="বরের নাম"
                    pathBn="couple.groom.name.bn"
                    pathEn="couple.groom.name.en"
                    placeholderBn="মোঃ আব্দুল রামিম (আবির)"
                    placeholderEn="Md. Abdul Ramim (Abir)"
                  />

                  <BilingualField
                    title="বরের পিতা ও মাতার নাম"
                    helper="পিতা ও মাতা"
                    pathBn="couple.groom.parents.bn"
                    pathEn="couple.groom.parents.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="পিতা: মোঃ আমিনুর রহমান (আমিন)\nমাতা: রেহেনা বেগম"
                    placeholderEn="Son of Md. Aminur Rahman (Amin)\n& Rahana Begum"
                  />

                  <BilingualField
                    title="বরের স্থায়ী ঠিকানা"
                    helper="গ্রাম, পোস্ট, জেলা"
                    pathBn="couple.groom.address.bn"
                    pathEn="couple.groom.address.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="গ্রাম: নয়গাঁও পূর্বপাড়া, পোষ্ট: পঞ্চসার, থানা ও জেলা: মুন্সীগঞ্জ"
                    placeholderEn="Vill: Noyagaon Purbo Para, Post: Panchasar, Munshiganj"
                  />
                </div>

                {/* Bride Section */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/95 to-[#fff5f8] border border-[#ebd2dc] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f3dbe2] pb-2">
                    <div className="text-xs font-bold text-[#683f4e] uppercase tracking-wider flex items-center gap-1.5">
                      <span>👰 কনের বিবরণ (Bride)</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fcedf2] text-[#93465e] border border-[#f2cad6] font-semibold">
                      The Bride
                    </span>
                  </div>

                  <BilingualField
                    title="কনের নাম"
                    pathBn="couple.bride.name.bn"
                    pathEn="couple.bride.name.en"
                    placeholderBn="মোসাম্মৎ সোমাইয়া আক্তার (নিশি)"
                    placeholderEn="Mosammet Somaiya Akter (Nishi)"
                  />

                  <BilingualField
                    title="কনের পিতা ও মাতার নাম"
                    helper="পিতা ও মাতা"
                    pathBn="couple.bride.parents.bn"
                    pathEn="couple.bride.parents.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="পিতা: মোঃ মোস্তফা জামাল ভুঁইয়া\nমাতা: রোজিনা আক্তার"
                    placeholderEn="Daughter of Md. Mostofa Zamal Bhuiyan\n& Rojina Akter"
                  />

                  <BilingualField
                    title="কনের স্থায়ী ঠিকানা"
                    helper="বাড়ি, রোড, এলাকা"
                    pathBn="couple.bride.address.bn"
                    pathEn="couple.bride.address.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="ঠিকানা: রহিমা টাওয়ার, রোড-৩, ওয়ার্ড-৬২, ছনটেক, যাত্রাবাড়ী, ঢাকা।"
                    placeholderEn="Rahima Tower, Road-3, Ward-62, Jatrabari, Dhaka"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: তারিখ ও ভেন্যু (Event & Venue) */}
            {activeTab === 'event' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#ba7b8e]" />
                    <span>অনুষ্ঠানের সময়সূচী ও ভেন্যু (গায়ে হলুদ ও বৌ-ভাত)</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    ২৪ ও ২৫ অক্টোবরের অনুষ্ঠান তথ্য
                  </span>
                </div>

                {/* EVENT 1: গায়ে হলুদ (24 Oct) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/95 to-[#fff5f8] border border-[#ebd2dc] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f3dbe2] pb-2">
                    <div className="text-xs font-bold text-[#683f4e] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c78235]" />
                      <span>১. শুভ গায়ে হলুদ (২৪ অক্টোবর ২০২৬)</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fcedf2] text-[#93465e] border border-[#f2cad6] font-semibold">
                      Gaye Holud Ceremony
                    </span>
                  </div>

                  <BilingualField
                    title="অনুষ্ঠান ট্যাগ / পর্ব"
                    helper="হলুদ ব্যাজ"
                    pathBn="events.holud.tag.bn"
                    pathEn="events.holud.tag.en"
                    placeholderBn="গায়ে হলুদ"
                    placeholderEn="Gaye Holud"
                  />

                  <BilingualField
                    title="অনুষ্ঠানের শিরোনাম"
                    pathBn="events.holud.title.bn"
                    pathEn="events.holud.title.en"
                    placeholderBn="শুভ গায়ে হলুদ ও সঙ্গীত সন্ধ্যা"
                    placeholderEn="Gaye Holud & Sangeet Evening"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BilingualField
                      title="অনুষ্ঠানের তারিখ"
                      pathBn="events.holud.date.bn"
                      pathEn="events.holud.date.en"
                      placeholderBn="শনিবার, ২৪শে অক্টোবর ২০২৬ইং (৮ই কার্তিক ১৪৩৩বাং)"
                      placeholderEn="Saturday, 24 October 2026 (11 Kartik 1433 BE)"
                    />

                    <BilingualField
                      title="অনুষ্ঠানের সময়"
                      pathBn="events.holud.time.bn"
                      pathEn="events.holud.time.en"
                      placeholderBn="সন্ধ্যা ৭:০০ ঘটিকা"
                      placeholderEn="7:00 PM (Evening)"
                    />
                  </div>

                  <BilingualField
                    title="হলুদের ভেন্যু ও ঠিকানা"
                    pathBn="events.holud.place.bn"
                    pathEn="events.holud.place.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="বরের নিজ বাসস্থান\nগ্রাম: নয়াগাঁও পূর্বপাড়া, পঞ্চসার, মুন্সীগঞ্জ"
                    placeholderEn="Groom's Residence\nVill: Noyagaon Purbo Para, Panchasar, Munshiganj"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/95 p-3.5 rounded-2xl border border-[#edd6de] shadow-xs space-y-1">
                      <label className="text-xs font-semibold text-[#663e4d] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ba7b8e]" />
                        <span>হলুদ ভেন্যু Google Maps URL</span>
                      </label>
                      <input
                        type="url"
                        value={getVal('events.holud.mapUrl')}
                        onChange={(e) =>
                          setVal('events.holud.mapUrl', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] text-[#4a323b] text-xs outline-none shadow-xs"
                      />
                    </div>

                    <BilingualField
                      title="ম্যাপ বাটনের টেক্সট"
                      pathBn="events.holud.mapText.bn"
                      pathEn="events.holud.mapText.en"
                      placeholderBn="গুগল ম্যাপে লোকেশন দেখুন"
                      placeholderEn="Open Google Maps"
                    />
                  </div>
                </div>

                {/* EVENT 2: বৌ-ভাত ও প্রীতিভোজ (25 Oct) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/95 to-[#fff5f8] border border-[#ebd2dc] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f3dbe2] pb-2">
                    <div className="text-xs font-bold text-[#683f4e] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#ba7b8e]" />
                      <span>২. বিবাহোত্তর বৌ-ভাত (২৫ অক্টোবর ২০২৬)</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fcedf2] text-[#93465e] border border-[#f2cad6] font-semibold">
                      Wedding Reception
                    </span>
                  </div>

                  <BilingualField
                    title="অনুষ্ঠান ট্যাগ / পর্ব"
                    helper="বৌ-ভাত ব্যাজ"
                    pathBn="events.reception.tag.bn"
                    pathEn="events.reception.tag.en"
                    placeholderBn="বৌ-ভাত ও প্রীতিভোজ"
                    placeholderEn="Wedding Reception"
                  />

                  <BilingualField
                    title="অনুষ্ঠানের শিরোনাম"
                    pathBn="events.reception.title.bn"
                    pathEn="events.reception.title.en"
                    placeholderBn="শুভ বৌ-ভাত ও প্রীতিভোজ"
                    placeholderEn="Wedding Reception & Grand Feast"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BilingualField
                      title="অনুষ্ঠানের তারিখ"
                      pathBn="events.reception.date.bn"
                      pathEn="events.reception.date.en"
                      placeholderBn="রবিবার, ২৫শে অক্টোবর ২০২৬ইং"
                      placeholderEn="Sunday, 25 October 2026"
                    />

                    <BilingualField
                      title="বাংলা সন ও তারিখ"
                      pathBn="saveDate.bengaliEra.bn"
                      pathEn="saveDate.bengaliEra.en"
                      placeholderBn="৯ই কার্তিক ১৪৩৩ বাং"
                      placeholderEn="12 Kartik 1433 Bengali Era"
                    />
                  </div>

                  <BilingualField
                    title="অনুষ্ঠানের সময় ও পর্ব"
                    pathBn="events.reception.time.bn"
                    pathEn="events.reception.time.en"
                    placeholderBn="দুপুর ১:৩১ মিনিট (প্রীতিভোজ)"
                    placeholderEn="1:31 PM (Grand Feast)"
                  />

                  <BilingualField
                    title="ভেন্যুর নাম ও পূর্ণ ঠিকানা"
                    pathBn="events.reception.place.bn"
                    pathEn="events.reception.place.en"
                    isTextarea={true}
                    rows={3}
                    placeholderBn="ফ্রেন্ডস কিচেন এন্ড পার্টি সেন্টার\n১২০ কাজী প্লাজা, খালইষ্ট, জুবলী রোড, মুন্সীগঞ্জ"
                    placeholderEn="Friends Kitchen & Party Palace\n120 Kazi Plaza, Khalist, Jubilee Road, Munshiganj"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/95 p-3.5 rounded-2xl border border-[#edd6de] shadow-xs space-y-1">
                      <label className="text-xs font-semibold text-[#663e4d] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ba7b8e]" />
                        <span>বৌ-ভাত Google Maps URL</span>
                      </label>
                      <input
                        type="url"
                        value={getVal('events.reception.mapUrl')}
                        onChange={(e) =>
                          setVal('events.reception.mapUrl', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] text-[#4a323b] text-xs outline-none shadow-xs"
                      />
                    </div>

                    <div className="bg-white/95 p-3.5 rounded-2xl border border-[#edd6de] shadow-xs space-y-1">
                      <label className="text-xs font-semibold text-[#663e4d] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ba7b8e]" />
                        <span>কাউন্টডাউন টার্গেট ডেট (ISO)</span>
                      </label>
                      <input
                        type="text"
                        value={getVal('saveDate.targetDate')}
                        onChange={(e) =>
                          setVal('saveDate.targetDate', e.target.value)
                        }
                        placeholder="2026-10-25T13:30:00"
                        className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] text-[#4a323b] text-xs outline-none shadow-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: শুভেচ্ছান্তে ও পরিবার (Blessings) */}
            {activeTab === 'blessings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#ba7b8e]" />
                    <span>শুভেচ্ছান্তে, অভ্যর্থনা ও হৈ চৈ পরিবারবর্গ</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    কার্ডের শুভাকাঙ্ক্ষী তালিকা
                  </span>
                </div>

                {/* শুভেচ্ছান্তে */}
                <div className="space-y-2">
                  <BilingualField
                    title="১. শুভেচ্ছান্তে শিরোনাম"
                    pathBn="blessings.wishes.title.bn"
                    pathEn="blessings.wishes.title.en"
                    placeholderBn="-: শুভেচ্ছান্তে :-"
                    placeholderEn="Best Wishes From"
                  />
                  <BilingualField
                    title="শুভেচ্ছান্তে নামসমূহ"
                    helper="প্রতি লাইনে বা কমা দিয়ে নাম লিখুন"
                    pathBn="blessings.wishes.names.bn"
                    pathEn="blessings.wishes.names.en"
                    isTextarea={true}
                    rows={3}
                    placeholderBn="মোঃ আমিনুর রহমান (আমিন)\nরেহেনা বেগম\nনূরজাহান বেগম"
                    placeholderEn="Md. Aminur Rahman (Amin)\nRahana Begum\nNurjahan Begum"
                  />
                </div>

                {/* অভ্যর্থনায় */}
                <div className="space-y-2">
                  <BilingualField
                    title="২. অভ্যর্থনায় শিরোনাম"
                    pathBn="blessings.reception.title.bn"
                    pathEn="blessings.reception.title.en"
                    placeholderBn="-: অভ্যর্থনায় :-"
                    placeholderEn="Cordially Welcomed By"
                  />
                  <BilingualField
                    title="অভ্যর্থনায় নামসমূহ"
                    pathBn="blessings.reception.names.bn"
                    pathEn="blessings.reception.names.en"
                    isTextarea={true}
                    rows={2}
                    placeholderBn="মাহামুদ হোসেন, নাছির, আক্তার, রাসেল, শুভ, লিখন ও হাসান"
                    placeholderEn="Mahmud Hossain, Nasir, Akter, Rasel, Shuvo, Likhon & Hasan"
                  />
                </div>

                {/* হৈ চৈ */}
                <div className="space-y-2">
                  <BilingualField
                    title="৩. হৈ চৈ শিরোনাম"
                    pathBn="blessings.youngsters.title.bn"
                    pathEn="blessings.youngsters.title.en"
                    placeholderBn="হৈ চৈ ঃ"
                    placeholderEn="The Little Stars"
                  />
                  <BilingualField
                    title="হৈ চৈ কচিকাঁচাদের নাম"
                    pathBn="blessings.youngsters.names.bn"
                    pathEn="blessings.youngsters.names.en"
                    isTextarea={true}
                    rows={3}
                    placeholderBn="মায়ান, মুয়াজ, নুহাশ, রিয়ান, রাফা, রিমি, অর্নি..."
                    placeholderEn="Mayan, Muaz, Nuhash, Riyan, Rafa, Rimi, Oni..."
                  />
                </div>

                {/* ফোন নম্বর */}
                <div className="bg-white/95 p-3.5 sm:p-4 rounded-2xl border border-[#edd6de] shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#663e4d] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#ba7b8e]" />
                      <span>যোগাযোগের ফোন নম্বর (Contact Numbers)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(formData?.blessings?.contacts)
                          ? [...formData.blessings.contacts, '']
                          : [''];
                        setVal('blessings.contacts', current);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-xl bg-[#fcecf1] hover:bg-[#f8dde6] text-[#9e4663] border border-[#f0c0ce] transition-colors font-medium cursor-pointer"
                    >
                      + নম্বর যোগ করুন
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(Array.isArray(formData?.blessings?.contacts)
                      ? formData.blessings.contacts
                      : []
                    ).map((contact, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9b7280] w-14 shrink-0 font-medium">
                          নম্বর {idx + 1}:
                        </span>
                        <input
                          type="text"
                          value={contact}
                          onChange={(e) => {
                            const current = [...(formData?.blessings?.contacts || [])];
                            current[idx] = e.target.value;
                            setVal('blessings.contacts', current);
                          }}
                          placeholder="01715-106248"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-[#fffefd] border border-[#e2c7cf] text-[#4a323b] text-xs outline-none focus:border-[#b57a8d] shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const current = [...(formData?.blessings?.contacts || [])];
                            current.splice(idx, 1);
                            setVal('blessings.contacts', current);
                          }}
                          className="text-xs text-red-500 hover:text-red-700 px-2 py-1 cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ফটো গ্যালারি (Gallery) */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#ba7b8e]" />
                    <span>ফটো গ্যালারি সেটিংস ও ছবিসমূহ</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    গ্যালারি ভিজিবিলিটি ও ফটো URL কন্ট্রোল
                  </span>
                </div>

                {/* গ্যালারি ভিজিবিলিটি চেকবক্স */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-white/95 to-[#fff5f8] border border-[#ebd2dc] shadow-xs space-y-2">
                  <label className="flex items-start sm:items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(formData?.gallery?.show)}
                      onChange={(e) => setVal('gallery.show', e.target.checked)}
                      className="w-5 h-5 rounded mt-0.5 sm:mt-0 accent-[#ba7b8e] cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#683f4e] block">
                        ওয়েবসাইটে ফটো গ্যালারি সেকশন প্রদর্শন করুন (Show Photo Gallery)
                      </span>
                      <span className="text-xs">
                        {formData?.gallery?.show ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            বর্তমানে গ্যালারি সেকশনটি ওয়েবসাইটে দৃশ্যমান (Active)
                          </span>
                        ) : (
                          <span className="text-[#a46e27] font-semibold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                            বর্তমানে গ্যালারি সেকশনটি লুকায়িত রয়েছে (Hidden by default)
                          </span>
                        )}
                      </span>
                    </div>
                  </label>
                </div>

                {/* গ্যালারি টাইটেল */}
                <BilingualField
                  title="গ্যালারির শিরোনাম"
                  helper="হেডিং টেক্সট"
                  pathBn="gallery.title.bn"
                  pathEn="gallery.title.en"
                  placeholderBn="ফটো গ্যালারি"
                  placeholderEn="Photo Gallery"
                />

                {/* মাল্টিপল ফটো URL লিস্ট */}
                <div className="bg-white/95 p-3.5 sm:p-4 rounded-2xl border border-[#edd6de] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[#663e4d] block">
                        ছবির ইউআরএল / লিংকসমূহ (Image URLs)
                      </label>
                      <span className="text-[10px] text-[#9b7280]">
                        অনলাইন ইমেজ URL (https://...) বা লোকাল পাথ (assets/couple-1.jpg)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(formData?.gallery?.photos)
                          ? [...formData.gallery.photos, '']
                          : [''];
                        setVal('gallery.photos', current);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-xl bg-[#fcecf1] hover:bg-[#f8dde6] text-[#9e4663] border border-[#f0c0ce] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      + নতুন ফটো লিংক যোগ করুন
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(Array.isArray(formData?.gallery?.photos)
                      ? formData.gallery.photos
                      : []
                    ).map((photoUrl, idx) => {
                      const cleanUrl = String(photoUrl || '').trim();
                      const previewSrc =
                        cleanUrl.startsWith('http') || cleanUrl.startsWith('/')
                          ? cleanUrl
                          : cleanUrl
                          ? `/${cleanUrl}`
                          : '';

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-[#fffefd] border border-[#ebd2dc] shadow-xs"
                        >
                          <span className="text-[11px] text-[#9b7280] w-8 shrink-0 font-mono font-bold">
                            #{idx + 1}
                          </span>

                          {/* Thumbnail preview */}
                          <div className="w-10 h-10 rounded-lg bg-[#f8eef2] border border-[#e5cad2] overflow-hidden shrink-0 flex items-center justify-center">
                            {previewSrc ? (
                              <img
                                src={previewSrc}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-[#ba7b8e]" />
                            )}
                          </div>

                          <input
                            type="text"
                            value={photoUrl}
                            onChange={(e) => {
                              const current = [...(formData?.gallery?.photos || [])];
                              current[idx] = e.target.value;
                              setVal('gallery.photos', current);
                            }}
                            placeholder="https://example.com/photo.jpg অথবা assets/couple-1.jpg"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[#fffdfd] border border-[#e2c7cf] text-[#4a323b] text-xs outline-none focus:border-[#b57a8d]"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const current = [...(formData?.gallery?.photos || [])];
                              current.splice(idx, 1);
                              setVal('gallery.photos', current);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                            title="ছবি মুছে ফেলুন"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}

                    {(!formData?.gallery?.photos || formData.gallery.photos.length === 0) && (
                      <div className="text-center py-4 text-xs text-[#9b7280]">
                        কোনো ছবির লিংক যুক্ত করা নেই। "+ নতুন ফটো লিংক যোগ করুন" বাটনে ক্লিক করে ছবির URL যুক্ত করুন।
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: অতিথি ও ফুটার (Guest & Footer) */}
            {activeTab === 'guest' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#683f4e] font-bengali-serif flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#ba7b8e]" />
                    <span>ওপেনিং, অতিথি বার্তা ও ফুটার</span>
                  </h3>
                  <span className="text-[11px] text-[#9b7280]">
                    ওয়েবসাইটের শুভেচ্ছা ও কৃতজ্ঞতা বার্তা
                  </span>
                </div>

                <BilingualField
                  title="হোমপেজ ওপেনিং সাবটাইটেল"
                  pathBn="opening.subtitle.bn"
                  pathEn="opening.subtitle.en"
                  placeholderBn="শুভ বিবাহোত্তর বৌ-ভাত অনুষ্ঠান"
                  placeholderEn="Wedding Celebration & Reception"
                />

                <BilingualField
                  title="দাওয়াতনামা বাটন টেক্সট"
                  pathBn="opening.openButton.bn"
                  pathEn="opening.openButton.en"
                  placeholderBn="দাওয়াতনামা খুলুন"
                  placeholderEn="Open Invitation"
                />

                <BilingualField
                  title="প্রিয় অতিথি সেকশনের বার্তা"
                  pathBn="guest.message.bn"
                  pathEn="guest.message.en"
                  isTextarea={true}
                  rows={3}
                />

                <BilingualField
                  title="ধন্যবাদ ফুটার বার্তা"
                  pathBn="footer.message.bn"
                  pathEn="footer.message.en"
                  isTextarea={true}
                  rows={3}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/95 p-3.5 rounded-2xl border border-[#edd6de] shadow-xs space-y-1">
                    <label className="text-xs font-semibold text-[#663e4d]">
                      রেফারেন্স টেক্সট (Footer Reference)
                    </label>
                    <input
                      type="text"
                      value={getVal('footer.reference')}
                      onChange={(e) => setVal('footer.reference', e.target.value)}
                      placeholder="trialvo.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] text-[#4a323b] text-xs outline-none shadow-xs"
                    />
                  </div>
                  <div className="bg-white/95 p-3.5 rounded-2xl border border-[#edd6de] shadow-xs space-y-1">
                    <label className="text-xs font-semibold text-[#663e4d]">
                      রেফারেন্স লিংক (URL)
                    </label>
                    <input
                      type="url"
                      value={getVal('footer.referenceUrl')}
                      onChange={(e) => setVal('footer.referenceUrl', e.target.value)}
                      placeholder="https://trialvo.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#fffefd] border border-[#e2c7cf] focus:border-[#b57a8d] text-[#4a323b] text-xs outline-none shadow-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: Raw JSON Editor */}
            {activeTab === 'raw' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#825665]">
                  <span>
                    সম্পূর্ণ <code className="bg-[#fcecf1] px-1.5 py-0.5 rounded text-[#9e4663] font-mono">data.json</code>{' '}
                    সরাসরি এডিট করুন (বাংলা ও ইংরেজি উভয় ডাটা একসাথে):
                  </span>
                  <button
                    onClick={() => {
                      try {
                        const formatted = JSON.stringify(
                          JSON.parse(rawJsonText),
                          null,
                          2
                        );
                        setRawJsonText(formatted);
                        setFormData(JSON.parse(formatted));
                      } catch (e) {
                        alert('Invalid JSON: ' + e.message);
                      }
                    }}
                    className="px-2.5 py-1 rounded-xl bg-[#fcecf1] hover:bg-[#f8dde6] text-[#9e4663] border border-[#f0c0ce] font-semibold transition-colors cursor-pointer"
                  >
                    Format JSON
                  </button>
                </div>
                <textarea
                  value={rawJsonText}
                  onChange={(e) => {
                    setRawJsonText(e.target.value);
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData(parsed);
                    } catch (err) {
                      // ignore parsing while typing
                    }
                  }}
                  rows={19}
                  className="w-full font-mono text-xs p-4 rounded-2xl bg-[#201522] border border-[#4d2d40] text-emerald-300 focus:border-[#c78a9a] outline-none leading-relaxed shadow-inner"
                />
              </div>
            )}
          </div>

          {/* Bottom Sticky Action Bar */}
          <div className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#fbf1f5] via-[#fff6f9] to-[#fbf1f5] border-t border-[#edd2dc] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-[11px] text-[#8e6573] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>যেকোনো ফিল্ডে পরিবর্তন করে &ldquo;সেভ করুন&rdquo; চাপলে মূল ওয়েবসাইটে সাথে সাথে আপডেট কার্যকর হবে।</span>
            </div>
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-[#f8e6ec] text-[#7d5060] border border-[#e5ccd4] transition-colors shadow-xs cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#ba7b8e] via-[#a36577] to-[#8d4f61] hover:from-[#c5879a] hover:to-[#9a596c] text-white shadow-[0_3px_12px_rgba(163,101,119,0.35)] transition-transform active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>সেভ করুন (Save Changes)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
