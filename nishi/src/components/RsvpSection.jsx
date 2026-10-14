import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function RsvpSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [diet, setDiet] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const heading = t(data?.rsvp?.heading) || "RSVP";
  const deadline = t(data?.rsvp?.deadline) || "Kindly reply before the 1st of April, 2027.";
  const successMessage =
    t(data?.rsvp?.successMessage) || "Thank you — we can’t wait to celebrate with you.";
  const fullNameLabel = t(data?.rsvp?.fullNameLabel) || "Full name";
  const attendanceQuestion = t(data?.rsvp?.attendanceQuestion) || "Will you attend?";
  const yesLabel = t(data?.rsvp?.yesOption) || (lang === "bn" ? "হ্যাঁ" : "yes");
  const noLabel = t(data?.rsvp?.noOption) || (lang === "bn" ? "না" : "no");
  const dietaryLabel = t(data?.rsvp?.dietaryLabel) || "Dietary needs";
  const sendLabel = t(data?.rsvp?.sendButton) || "Send";
  const sendingLabel = t(data?.rsvp?.sendingButton) || "Sending…";

  const showToast = (title, variant = "default") => {
    setToastMessage({ title, variant });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast(lang === "bn" ? "অনুগ্রহ করে আপনার নাম লিখুন" : "Please enter your full name", "destructive");
      return;
    }
    setIsPending(true);
    try {
      // Save locally to storage
      const existing = JSON.parse(localStorage.getItem("eleganza_guests") || "[]");
      const newGuest = {
        id: "guest_" + Date.now(),
        full_name: name.trim(),
        attendance,
        guest_count: 1,
        dietary_requirements: diet.trim() || undefined,
        responded_at: new Date().toISOString()
      };
      existing.unshift(newGuest);
      localStorage.setItem("eleganza_guests", JSON.stringify(existing));

      if (attendance === "yes") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b5430", "#d5cec7", "#e7dfcf", "#8a9a7d"]
        });
      }

      setSubmitted(true);
      showToast(lang === "bn" ? "ধন্যবাদ! আপনার উত্তর গ্রহণ করা হয়েছে।" : "Thank you! Your reply has been sent.");
    } catch {
      showToast(lang === "bn" ? "কিছু একটা সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" : "Something went wrong. Please try again.", "destructive");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="rsvp" className="relative bg-background py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full [container-type:inline-size]"
      >
        <img
          src="/assets/rsvp-frame.png"
          alt=""
          className="w-full h-auto"
          draggable={false}
        />
        <div className="absolute inset-x-[21%] top-[21%] bottom-[16%] flex flex-col items-center justify-between text-center text-primary px-1 sm:px-3">
          <div>
            <h2 className="font-display font-bold leading-none text-primary" style={{ fontSize: heading.length > 8 ? "4.8cqw" : "7.5cqw" }}>
              {heading}
            </h2>
            <p className="font-body italic text-primary/80 text-balance" style={{ fontSize: "2.8cqw", marginTop: "1.5cqw", paddingInline: "2cqw" }}>
              {deadline}
            </p>
          </div>

          {submitted ? (
            <div className="flex-1 flex items-center justify-center px-4">
              <p className="font-body italic text-primary font-medium" style={{ fontSize: "3.6cqw" }}>
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full text-left flex flex-col justify-between flex-1 py-1" style={{ marginTop: "3cqw" }}>
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div>
                <label className="font-body block italic text-primary/90" style={{ fontSize: "3cqw" }}>
                  {fullNameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-0 border-b border-primary/50 bg-background/25 font-body text-primary outline-none focus:border-primary"
                  style={{ fontSize: "3.2cqw", padding: "0.8cqw 0", marginTop: "0.5cqw" }}
                />
              </div>

              <div style={{ marginTop: "2cqw" }}>
                <span className="font-body italic block text-primary/90" style={{ fontSize: "3cqw", marginBottom: "1cqw" }}>
                  {attendanceQuestion}
                </span>
                <div className="flex flex-col items-start" style={{ gap: "1.5cqw" }}>
                  {[
                    { val: "yes", label: yesLabel },
                    { val: "no", label: noLabel }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAttendance(opt.val)}
                      className="flex items-center font-body text-primary cursor-pointer hover:opacity-90"
                      style={{ gap: "1.5cqw", fontSize: "3cqw" }}
                    >
                      <span
                        className="inline-flex items-center justify-center rounded-full border border-primary/70 bg-background/60"
                        style={{ width: "3.6cqw", height: "3.6cqw" }}
                      >
                        {attendance === opt.val && (
                          <span className="bg-primary rounded-full" style={{ width: "2cqw", height: "2cqw" }} />
                        )}
                      </span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "2cqw" }}>
                <label className="font-body block italic text-primary/90" style={{ fontSize: "3cqw" }}>
                  {dietaryLabel}
                </label>
                <input
                  type="text"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full border-0 border-b border-primary/50 bg-background/25 font-body text-primary outline-none focus:border-primary"
                  style={{ fontSize: "3.2cqw", padding: "0.8cqw 0", marginTop: "0.5cqw" }}
                />
              </div>

              <div className="flex justify-center" style={{ marginTop: "3.5cqw" }}>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border border-primary/40 bg-background/90 font-body text-primary font-semibold shadow-xs transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
                  style={{ fontSize: "3.2cqw", padding: "1.8cqw 7cqw" }}
                >
                  {isPending ? sendingLabel : sendLabel}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-sm font-body shadow-xl border backdrop-blur-md transition-all ${
            toastMessage.variant === "destructive"
              ? "bg-red-900/90 text-white border-red-700"
              : "bg-primary text-primary-foreground border-primary/40"
          }`}
        >
          {toastMessage.title}
        </div>
      )}
    </section>
  );
}
