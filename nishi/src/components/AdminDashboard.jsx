import { useState, useEffect } from "react";
import { Search, Download, Trash2, ArrowLeft, LogOut, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard({ onLogout, onBackHome }) {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "yes", "no"

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    const data = JSON.parse(localStorage.getItem("eleganza_guests") || "[]");
    if (data.length === 0) {
      // Seed initial demo guest
      const initial = [
        {
          id: "g_1",
          full_name: "Camilla Rossi",
          attendance: "yes",
          guest_count: 1,
          dietary_requirements: "Vegetarian",
          responded_at: "2026-08-05T14:32:00Z"
        },
        {
          id: "g_2",
          full_name: "Marco Bellini",
          attendance: "yes",
          guest_count: 1,
          dietary_requirements: "No seafood",
          responded_at: "2026-08-06T10:15:00Z"
        },
        {
          id: "g_3",
          full_name: "Elena Bianchi",
          attendance: "no",
          guest_count: 1,
          responded_at: "2026-08-07T18:40:00Z"
        }
      ];
      localStorage.setItem("eleganza_guests", JSON.stringify(initial));
      setGuests(initial);
    } else {
      setGuests(data);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this RSVP?")) {
      const updated = guests.filter((g) => g.id !== id);
      setGuests(updated);
      localStorage.setItem("eleganza_guests", JSON.stringify(updated));
    }
  };

  const handleExportCSV = () => {
    const headers = ["Full Name", "Attendance", "Dietary Needs", "Date Responded"];
    const rows = guests.map((g) => [
      `"${g.full_name || ""}"`,
      `"${g.attendance || ""}"`,
      `"${g.dietary_requirements || "None"}"`,
      `"${g.responded_at || ""}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wedding_rsvps.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (g.dietary_requirements && g.dietary_requirements.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === "all" ? true : g.attendance === filter;
    return matchesSearch && matchesFilter;
  });

  const attendingCount = guests.filter((g) => g.attendance === "yes").length;
  const declinedCount = guests.filter((g) => g.attendance === "no").length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-foreground/15">
          <div>
            <button
              onClick={onBackHome}
              className="flex items-center gap-2 text-xs font-body uppercase tracking-wider text-foreground/60 hover:text-foreground mb-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Invitation
            </button>
            <h1 className="font-display text-4xl text-primary">Guest RSVP Dashboard</h1>
            <p className="font-body text-xs text-foreground/70 tracking-wide mt-1">
              Villa Cipressi · 12 September 2027
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background hover:bg-foreground/5 text-xs font-body tracking-wider uppercase text-primary cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-body tracking-wider uppercase hover:opacity-90 cursor-pointer transition-opacity"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          <div className="card-elegant text-center">
            <p className="font-body text-xs uppercase tracking-widest text-foreground/60">Total Replies</p>
            <p className="font-display text-5xl text-primary mt-2">{guests.length}</p>
          </div>
          <div className="card-elegant text-center border-emerald-800/20">
            <p className="font-body text-xs uppercase tracking-widest text-emerald-800">Attending</p>
            <p className="font-display text-5xl text-emerald-900 mt-2">{attendingCount}</p>
          </div>
          <div className="card-elegant text-center border-amber-900/20">
            <p className="font-body text-xs uppercase tracking-widest text-amber-900">Declined</p>
            <p className="font-display text-5xl text-amber-950 mt-2">{declinedCount}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by guest name or dietary need..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-foreground/20 rounded-full text-xs font-body text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            {["all", "yes", "no"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === f
                    ? "bg-primary text-primary-foreground font-medium"
                    : "border border-foreground/20 text-foreground/70 hover:bg-foreground/5"
                }`}
              >
                {f === "all" ? "All" : f === "yes" ? "Attending" : "Declined"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-foreground/15 rounded-xl overflow-hidden bg-background/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-foreground/5 uppercase tracking-wider text-foreground/70 border-b border-foreground/10">
                <tr>
                  <th className="py-3.5 px-6">Guest Name</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Dietary Notes</th>
                  <th className="py-3.5 px-6">Responded At</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-foreground/50">
                      No guests found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((g) => (
                    <tr key={g.id} className="hover:bg-foreground/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium text-foreground text-sm">
                        {g.full_name}
                      </td>
                      <td className="py-4 px-6">
                        {g.attendance === "yes" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-medium">
                            <CheckCircle className="w-3 h-3" /> Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-200 text-stone-700 text-[11px] font-medium">
                            <XCircle className="w-3 h-3" /> Declined
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-foreground/70">
                        {g.dietary_requirements || "None specified"}
                      </td>
                      <td className="py-4 px-6 text-foreground/60">
                        {g.responded_at
                          ? new Date(g.responded_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })
                          : "—"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(g.id)}
                          className="p-1.5 text-foreground/40 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete RSVP"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
