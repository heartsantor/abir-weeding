import React, { useState, useEffect, useContext, createContext, useMemo } from "react";
import {
  X,
  Lock,
  User,
  Save,
  RotateCcw,
  Download,
  CheckCircle,
  Users,
  Calendar,
  Heart,
  Clock,
  Sparkles,
  MapPin,
  Trash2,
  Search,
  Code,
  FileText,
  Gift,
  Shirt,
  LogOut,
  Plus,
  Smile,
  Phone
} from "lucide-react";
import { useData } from "../../context/DataContext";

// Form context to enable clean editing without focus loss
const AdminFormContext = createContext({
  getVal: () => "",
  setVal: () => {},
});

// Reusable Dual-Language Input Field (English & Bengali side-by-side)
const BilingualField = React.memo(function BilingualField({
  title,
  helper,
  pathBn,
  pathEn,
  isTextarea = false,
  rows = 2,
  placeholderBn = "",
  placeholderEn = "",
}) {
  const { getVal, setVal } = useContext(AdminFormContext);

  return (
    <div className="bg-background/90 p-4 rounded-xl border border-primary/20 shadow-xs space-y-2.5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs sm:text-sm font-semibold text-primary font-body">
          {title}
        </label>
        {helper && <span className="text-[10.5px] text-primary/60">{helper}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Bengali Field */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-amber-100/70 border border-amber-200 text-amber-900 font-bold text-[10px]">
              বাংলা (BN)
            </span>
          </div>
          {isTextarea ? (
            <textarea
              rows={rows}
              value={getVal(pathBn)}
              onChange={(e) => setVal(pathBn, e.target.value)}
              placeholder={placeholderBn}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 focus:border-primary focus:ring-1 focus:ring-primary text-primary placeholder:text-primary/30 text-xs outline-none leading-relaxed transition-all"
            />
          ) : (
            <input
              type="text"
              value={getVal(pathBn)}
              onChange={(e) => setVal(pathBn, e.target.value)}
              placeholder={placeholderBn}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 focus:border-primary focus:ring-1 focus:ring-primary text-primary placeholder:text-primary/30 text-xs outline-none transition-all"
            />
          )}
        </div>

        {/* English Field */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 border border-emerald-200 text-emerald-900 font-bold text-[10px]">
              ENGLISH (EN)
            </span>
          </div>
          {isTextarea ? (
            <textarea
              rows={rows}
              value={getVal(pathEn)}
              onChange={(e) => setVal(pathEn, e.target.value)}
              placeholder={placeholderEn}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 focus:border-primary focus:ring-1 focus:ring-primary text-primary placeholder:text-primary/30 text-xs outline-none leading-relaxed transition-all"
            />
          ) : (
            <input
              type="text"
              value={getVal(pathEn)}
              onChange={(e) => setVal(pathEn, e.target.value)}
              placeholder={placeholderEn}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 focus:border-primary focus:ring-1 focus:ring-primary text-primary placeholder:text-primary/30 text-xs outline-none transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default function AdminDashboard({ isOpen, onClose }) {
  const { data, updateData, resetData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("eleganza_admin_auth") === "true";
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("letter");
  const [formData, setFormData] = useState(null);
  const [rawJsonText, setRawJsonText] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // RSVP Management State
  const [guests, setGuests] = useState([]);
  const [rsvpSearch, setRsvpSearch] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState("all");

  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setRawJsonText(JSON.stringify(data, null, 2));
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      loadGuests();
    }
  }, [isOpen]);

  const loadGuests = () => {
    const list = JSON.parse(localStorage.getItem("eleganza_guests") || "[]");
    setGuests(list);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (username.toLowerCase() === "admin" && password === "admin") ||
      password === "1234" ||
      (username && password)
    ) {
      sessionStorage.setItem("eleganza_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials (Use admin / admin or 1234)");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("eleganza_admin_auth");
    setIsAuthenticated(false);
  };

  const getVal = (path) => {
    if (!formData) return "";
    const keys = path.split(".");
    let curr = formData;
    for (const k of keys) {
      if (curr === undefined || curr === null) return "";
      curr = curr[k];
    }
    return curr !== undefined && curr !== null ? curr : "";
  };

  const setVal = (path, value) => {
    setFormData((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let curr = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!curr[keys[i]]) curr[keys[i]] = {};
        curr = curr[keys[i]];
      }
      curr[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const handleSave = () => {
    if (!formData) return;
    updateData(formData);
    setRawJsonText(JSON.stringify(formData, null, 2));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = async () => {
    if (confirm("Reset all settings to default Nishi wedding ceremony data?")) {
      await resetData();
      alert("Settings restored to default!");
    }
  };

  const handleRawJsonSave = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      setFormData(parsed);
      updateData(parsed);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      alert("JSON Syntax Error: " + err.message);
    }
  };

  // Delete RSVP
  const handleDeleteRsvp = (id) => {
    if (confirm("Delete this RSVP reply?")) {
      const updated = guests.filter((g) => g.id !== id);
      setGuests(updated);
      localStorage.setItem("eleganza_guests", JSON.stringify(updated));
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Full Name", "Attendance", "Blessings / Dietary", "Date Responded"];
    const rows = guests.map((g) => [
      `"${g.full_name || ""}"`,
      `"${g.attendance || ""}"`,
      `"${g.dietary_requirements || "None"}"`,
      `"${g.responded_at || ""}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wedding_rsvps.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch =
        g.full_name.toLowerCase().includes(rsvpSearch.toLowerCase()) ||
        (g.dietary_requirements &&
          g.dietary_requirements.toLowerCase().includes(rsvpSearch.toLowerCase()));
      const matchesFilter = rsvpFilter === "all" ? true : g.attendance === rsvpFilter;
      return matchesSearch && matchesFilter;
    });
  }, [guests, rsvpSearch, rsvpFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-background border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-foreground">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/20 bg-background/95">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              AN
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary leading-tight">
                Nishi & Abir — Wedding Admin Portal
              </h2>
              <p className="text-[11px] font-body text-primary/60">
                Benarosi Community Center · Live Customizer & Guestbook
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 text-xs font-body text-primary/70 hover:text-primary transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center flex-1 max-w-md mx-auto w-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-primary text-center">
              Admin Access Required
            </h3>
            <p className="font-body text-xs text-primary/70 text-center mt-1 mb-6">
              Enter your credentials to edit invitation details or manage RSVPs
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              {authError && (
                <div className="p-2.5 rounded-lg bg-red-100 text-red-800 text-xs text-center border border-red-200">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/80 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-primary/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/80 mb-1">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin or 1234"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-primary/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold tracking-wider uppercase transition-opacity hover:opacity-90 cursor-pointer shadow-sm mt-2"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Interface */
          <AdminFormContext.Provider value={{ getVal, setVal }}>
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-primary/15 bg-primary/5 overflow-x-auto shrink-0 scrollbar-none">
                {[
                  { id: "letter", label: "Invitation Letter", icon: FileText },
                  { id: "couple", label: "Bride & Groom", icon: Heart },
                  { id: "whenwhere", label: "Venue & Maps", icon: MapPin },
                  { id: "programme", label: "Programme", icon: Clock },
                  { id: "family", label: "Family & Wishes", icon: Users },
                  { id: "dressgift", label: "Dress & Prayers", icon: Shirt },
                  { id: "rsvp", label: `RSVPs (${guests.length})`, icon: Sparkles },
                  { id: "raw", label: "Raw JSON", icon: Code },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                          : "text-primary/70 hover:text-primary hover:bg-primary/10"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Tab Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* TAB 1: Invitation Letter */}
                {activeTab === "letter" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-primary">
                      Formal Invitation Letter (Bride's Parents)
                    </h3>
                    <BilingualField
                      title="Bismillah Title"
                      pathBn="invitationLetter.bismillahTitle.bn"
                      pathEn="invitationLetter.bismillahTitle.en"
                    />
                    <BilingualField
                      title="Salutation"
                      pathBn="invitationLetter.salutation.bn"
                      pathEn="invitationLetter.salutation.en"
                    />
                    <BilingualField
                      title="Greeting"
                      pathBn="invitationLetter.greeting.bn"
                      pathEn="invitationLetter.greeting.en"
                    />
                    <BilingualField
                      title="Formal Invitation Body"
                      isTextarea={true}
                      rows={5}
                      pathBn="invitationLetter.body.bn"
                      pathEn="invitationLetter.body.en"
                    />
                  </div>
                )}

                {/* TAB 2: Bride & Groom */}
                {activeTab === "couple" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-primary">
                      The Bride (কনে) — Top Priority
                    </h3>
                    <BilingualField
                      title="Bride's Name"
                      pathBn="couple.bride.name.bn"
                      pathEn="couple.bride.name.en"
                    />
                    <BilingualField
                      title="Bride's Parents"
                      pathBn="couple.bride.parents.bn"
                      pathEn="couple.bride.parents.en"
                    />
                    <BilingualField
                      title="Bride's Address"
                      pathBn="couple.bride.address.bn"
                      pathEn="couple.bride.address.en"
                    />

                    <h3 className="font-display text-lg font-bold text-primary pt-4 border-t border-primary/15">
                      The Groom (বর)
                    </h3>
                    <BilingualField
                      title="Groom's Name"
                      pathBn="couple.groom.name.bn"
                      pathEn="couple.groom.name.en"
                    />
                    <BilingualField
                      title="Groom's Parents"
                      pathBn="couple.groom.parents.bn"
                      pathEn="couple.groom.parents.en"
                    />
                    <BilingualField
                      title="Groom's Address"
                      pathBn="couple.groom.address.bn"
                      pathEn="couple.groom.address.en"
                    />
                  </div>
                )}

                {/* TAB 3: Venue & Maps */}
                {activeTab === "whenwhere" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-primary">
                      Wedding Date & Venue Settings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background/90 p-4 rounded-xl border border-primary/20">
                      <div>
                        <label className="text-xs font-semibold text-primary font-body block mb-1">
                          Date (YYYY-MM-DD)
                        </label>
                        <input
                          type="date"
                          value={getVal("couple.wedding_date")}
                          onChange={(e) => setVal("couple.wedding_date", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 text-xs text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-primary font-body block mb-1">
                          Ceremony Time
                        </label>
                        <input
                          type="text"
                          value={getVal("couple.wedding_time")}
                          onChange={(e) => setVal("couple.wedding_time", e.target.value)}
                          placeholder="1:30 PM"
                          className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 text-xs text-primary"
                        />
                      </div>
                    </div>

                    <BilingualField
                      title="Venue Name"
                      pathBn="couple.venue_name.bn"
                      pathEn="couple.venue_name.en"
                    />
                    <BilingualField
                      title="Venue City & Area"
                      pathBn="couple.venue_city.bn"
                      pathEn="couple.venue_city.en"
                    />

                    <div className="bg-background/90 p-4 rounded-xl border border-primary/20">
                      <label className="text-xs font-semibold text-primary font-body block mb-1">
                        Google Maps URL
                      </label>
                      <input
                        type="url"
                        value={getVal("couple.maps_url")}
                        onChange={(e) => setVal("couple.maps_url", e.target.value)}
                        placeholder="https://maps.app.goo.gl/CG6Z9D7U1L7xjsui6"
                        className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 text-xs text-primary"
                      />
                    </div>

                    <BilingualField
                      title="Venue Story Description"
                      isTextarea={true}
                      rows={3}
                      pathBn="venue.description.bn"
                      pathEn="venue.description.en"
                    />
                  </div>
                )}

                {/* TAB 4: Programme */}
                {activeTab === "programme" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold text-primary">
                        Ceremony Programme Timeline
                      </h3>
                      <button
                        onClick={() => {
                          const currentItems = formData?.programme?.items || [];
                          const newItem = {
                            time: "1:30",
                            period: "PM",
                            label: { en: "Ceremony Event", bn: "অনুষ্ঠান পর্ব" },
                          };
                          setVal("programme.items", [...currentItems, newItem]);
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-lg cursor-pointer hover:opacity-90"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Step
                      </button>
                    </div>

                    <BilingualField
                      title="Section Title"
                      pathBn="programme.heading.bn"
                      pathEn="programme.heading.en"
                    />

                    <div className="space-y-3">
                      {(formData?.programme?.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-background/90 p-3 rounded-xl border border-primary/20 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-primary">
                              Step #{idx + 1}
                            </span>
                            <button
                              onClick={() => {
                                const currentItems = [...formData.programme.items];
                                currentItems.splice(idx, 1);
                                setVal("programme.items", currentItems);
                              }}
                              className="text-red-600 hover:text-red-800 text-xs cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] uppercase text-primary/70 block">
                                Time
                              </label>
                              <input
                                type="text"
                                value={item.time}
                                onChange={(e) => {
                                  const items = [...formData.programme.items];
                                  items[idx].time = e.target.value;
                                  setVal("programme.items", items);
                                }}
                                className="w-full px-2 py-1 text-xs border border-primary/20 rounded bg-background"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-primary/70 block">
                                Period
                              </label>
                              <select
                                value={item.period}
                                onChange={(e) => {
                                  const items = [...formData.programme.items];
                                  items[idx].period = e.target.value;
                                  setVal("programme.items", items);
                                }}
                                className="w-full px-2 py-1 text-xs border border-primary/20 rounded bg-background"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-primary/70 block">
                                Label (EN)
                              </label>
                              <input
                                type="text"
                                value={item.label?.en || ""}
                                onChange={(e) => {
                                  const items = [...formData.programme.items];
                                  items[idx].label = { ...(items[idx].label || {}), en: e.target.value };
                                  setVal("programme.items", items);
                                }}
                                className="w-full px-2 py-1 text-xs border border-primary/20 rounded bg-background"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-primary/70 block">
                                Label (BN)
                              </label>
                              <input
                                type="text"
                                value={item.label?.bn || ""}
                                onChange={(e) => {
                                  const items = [...formData.programme.items];
                                  items[idx].label = { ...(items[idx].label || {}), bn: e.target.value };
                                  setVal("programme.items", items);
                                }}
                                className="w-full px-2 py-1 text-xs border border-primary/20 rounded bg-background"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: Family & Blessings */}
                {activeTab === "family" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-primary">
                      Family, Blessings & Well-Wishers
                    </h3>
                    <BilingualField
                      title="Best Wishes (শুভেচ্ছান্তে) List"
                      isTextarea={true}
                      rows={3}
                      pathBn="blessings.wishes.names.bn"
                      pathEn="blessings.wishes.names.en"
                    />
                    <BilingualField
                      title="Reception (অভ্যর্থনায়) List"
                      isTextarea={true}
                      rows={3}
                      pathBn="blessings.reception.names.bn"
                      pathEn="blessings.reception.names.en"
                    />
                    <BilingualField
                      title="Youngsters (হৈ চৈ) List"
                      isTextarea={true}
                      rows={3}
                      pathBn="blessings.youngsters.names.bn"
                      pathEn="blessings.youngsters.names.en"
                    />
                    <div className="bg-background/90 p-4 rounded-xl border border-primary/20">
                      <label className="text-xs font-semibold text-primary font-body block mb-1">
                        Emergency Contact Number(s)
                      </label>
                      <input
                        type="text"
                        value={(formData?.blessings?.contacts || []).join(", ")}
                        onChange={(e) => {
                          const arr = e.target.value.split(",").map((s) => s.trim());
                          setVal("blessings.contacts", arr);
                        }}
                        placeholder="01829605959"
                        className="w-full px-3 py-2 rounded-lg bg-background border border-primary/25 text-xs text-primary"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 6: Dress & Gifts */}
                {activeTab === "dressgift" && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-primary">
                      Dress Code Guidance
                    </h3>
                    <BilingualField
                      title="Dress Code Heading"
                      pathBn="celebration.dressCodeTitle.bn"
                      pathEn="celebration.dressCodeTitle.en"
                    />
                    <BilingualField
                      title="Dress Code Description"
                      pathBn="celebration.dressCodeDesc.bn"
                      pathEn="celebration.dressCodeDesc.en"
                    />

                    <h3 className="font-display text-lg font-bold text-primary pt-4 border-t border-primary/15">
                      Prayers & Blessings (Gifts Section)
                    </h3>
                    <BilingualField
                      title="Heading"
                      pathBn="gifts.heading.bn"
                      pathEn="gifts.heading.en"
                    />
                    <BilingualField
                      title="Prayer Line 1"
                      pathBn="gifts.line1.bn"
                      pathEn="gifts.line1.en"
                    />
                    <BilingualField
                      title="Prayer Line 2"
                      pathBn="gifts.line2.bn"
                      pathEn="gifts.line2.en"
                    />
                    <BilingualField
                      title="Prayer Line 3"
                      pathBn="gifts.line3.bn"
                      pathEn="gifts.line3.en"
                    />
                  </div>
                )}

                {/* TAB 7: RSVPs */}
                {activeTab === "rsvp" && (
                  <div className="space-y-4">
                    {/* Stat Badges */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="card-elegant text-center p-3">
                        <span className="text-[10px] uppercase text-primary/70 block">Replies</span>
                        <strong className="text-2xl font-display text-primary">{guests.length}</strong>
                      </div>
                      <div className="card-elegant text-center p-3 border-emerald-700/30">
                        <span className="text-[10px] uppercase text-emerald-800 block">Attending</span>
                        <strong className="text-2xl font-display text-emerald-900">
                          {guests.filter((g) => g.attendance === "yes").length}
                        </strong>
                      </div>
                      <div className="card-elegant text-center p-3 border-amber-800/30">
                        <span className="text-[10px] uppercase text-amber-900 block">Declined</span>
                        <strong className="text-2xl font-display text-amber-950">
                          {guests.filter((g) => g.attendance === "no").length}
                        </strong>
                      </div>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                        <input
                          type="text"
                          placeholder="Search guest or message..."
                          value={rsvpSearch}
                          onChange={(e) => setRsvpSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-full border border-primary/25 bg-background text-xs text-primary focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        {["all", "yes", "no"].map((f) => (
                          <button
                            key={f}
                            onClick={() => setRsvpFilter(f)}
                            className={`px-3 py-1 rounded-full text-xs font-body uppercase transition-colors cursor-pointer ${
                              rsvpFilter === f
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "border border-primary/20 text-primary/70"
                            }`}
                          >
                            {f === "all" ? "All" : f === "yes" ? "Attending" : "Declined"}
                          </button>
                        ))}
                        <button
                          onClick={handleExportCSV}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 text-xs text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> CSV
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="border border-primary/20 rounded-xl overflow-hidden bg-background">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-primary/5 border-b border-primary/15 text-[10px] uppercase tracking-wider text-primary/70">
                          <tr>
                            <th className="py-2.5 px-3">Guest Name</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">Message / Notes</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/10">
                          {filteredGuests.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-6 text-center text-primary/40">
                                No guest responses recorded yet.
                              </td>
                            </tr>
                          ) : (
                            filteredGuests.map((g) => (
                              <tr key={g.id} className="hover:bg-primary/[0.03]">
                                <td className="py-2.5 px-3 font-medium text-primary">
                                  {g.full_name}
                                </td>
                                <td className="py-2.5 px-3">
                                  {g.attendance === "yes" ? (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                                      Attending
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-semibold">
                                      Declined
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-primary/70">
                                  {g.dietary_requirements || "None"}
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={() => handleDeleteRsvp(g.id)}
                                    className="p-1 text-primary/40 hover:text-red-700 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 8: Raw JSON */}
                {activeTab === "raw" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold text-primary">
                        Direct JSON Configuration
                      </h3>
                      <button
                        onClick={handleRawJsonSave}
                        className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md cursor-pointer hover:opacity-90"
                      >
                        Apply JSON
                      </button>
                    </div>
                    <textarea
                      rows={16}
                      value={rawJsonText}
                      onChange={(e) => setRawJsonText(e.target.value)}
                      className="w-full p-3 font-mono text-xs bg-primary/5 border border-primary/25 rounded-xl text-primary focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Sticky Footer */}
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-primary/20 bg-background/95 shrink-0">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-300 text-red-700 hover:bg-red-50 text-xs font-body cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Default
                </button>

                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold animate-pulse">
                      <CheckCircle className="w-4 h-4" /> Saved!
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold tracking-wider uppercase shadow-md hover:opacity-90 cursor-pointer transition-all"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </AdminFormContext.Provider>
        )}
      </div>
    </div>
  );
}
