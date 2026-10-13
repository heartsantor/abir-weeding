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
        <div className="absolute inset-x-[16%] top-[26%] bottom-[14%] flex flex-col items-center justify-start text-center text-primary">
          <h2 className="font-display leading-none" style={{ fontSize: "9cqw" }}>
            {heading}
          </h2>
          <p className="font-body italic" style={{ fontSize: "3.2cqw", marginTop: "3cqw" }}>
            {deadline}
          </p>

          {submitted ? (
            <p className="font-body italic" style={{ fontSize: "3.4cqw", marginTop: "8cqw" }}>
              {successMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full text-left" style={{ marginTop: "6cqw" }}>
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <label className="font-body block italic" style={{ fontSize: "3.4cqw" }}>
                {fullNameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-0 border-b border-primary/50 bg-transparent font-body text-primary outline-none focus:border-primary"
                style={{ fontSize: "3.2cqw", paddingBottom: "1cqw", marginTop: "1.5cqw" }}
              />

              <div className="flex items-center" style={{ gap: "3cqw", marginTop: "5cqw" }}>
                <span className="font-body italic" style={{ fontSize: "3.4cqw" }}>
                  {attendanceQuestion}
                </span>
                {[
                  { val: "yes", label: yesLabel },
                  { val: "no", label: noLabel }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setAttendance(opt.val)}
                    className="flex items-center font-body capitalize text-primary cursor-pointer"
                    style={{ gap: "1.2cqw", fontSize: "3.4cqw" }}
                  >
                    <span
                      className="inline-flex items-center justify-center border border-primary/60"
                      style={{ width: "3cqw", height: "3cqw" }}
                    >
                      {attendance === opt.val && (
                        <span className="bg-primary" style={{ width: "1.6cqw", height: "1.6cqw" }} />
                      )}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>

              <label className="font-body mt-0 block italic" style={{ fontSize: "3.4cqw", marginTop: "5cqw" }}>
                {dietaryLabel}
              </label>
              <input
                type="text"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full border-0 border-b border-primary/50 bg-transparent font-body text-primary outline-none focus:border-primary"
                style={{ fontSize: "3.2cqw", paddingBottom: "1cqw", marginTop: "1.5cqw" }}
              />

              <div className="flex justify-center" style={{ marginTop: "7cqw" }}>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border border-primary/30 bg-background/70 font-body text-primary shadow-sm transition-colors hover:bg-background disabled:opacity-60 cursor-pointer"
                  style={{ fontSize: "3.4cqw", padding: "1.6cqw 8cqw" }}
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
