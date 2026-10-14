import { useState, useEffect } from "react";
import { DataProvider } from "./context/DataContext";
import { LanguageProvider } from "./context/LanguageContext";
import NavbarControls from "./components/NavbarControls";
import CurtainEntrance from "./components/CurtainEntrance";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import InvitationLetterSection from "./components/InvitationLetterSection";
import CoupleDetailsSection from "./components/CoupleDetailsSection";
import WhenWhereSection from "./components/WhenWhereSection";
import VenueSection from "./components/VenueSection";
import CelebrationSection from "./components/CelebrationSection";
import ProgrammeSection from "./components/ProgrammeSection";
import FooterSection from "./components/FooterSection";
import Divider from "./components/Divider";
import AudioPlayer from "./components/AudioPlayer";
import AdminDashboard from "./components/admin/AdminDashboard";
import { useAudio } from "./hooks/useAudio";

function InvitationApp() {
  const [isLocked, setIsLocked] = useState(true);
  const [curtainActive, setCurtainActive] = useState(true);
  const [showHeroText, setShowHeroText] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { isMuted, isPlaying, toggleMute, startMusic } = useAudio();

  // Listen for #admin in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Lock scrolling during wax-seal curtain opening
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  return (
    <>
      {/* Top Floating Luxury Navbar (Language Switcher ENG/বাংলা, Music Toggle, Admin Launcher) */}
      <NavbarControls
        onOpenAdmin={() => setIsAdminOpen(true)}
        isMuted={isMuted}
        isPlaying={isPlaying}
        onToggleMusic={toggleMute}
      />

      {/* Wax-Seal Envelope Curtain Entrance */}
      {curtainActive && (
        <CurtainEntrance
          onEnter={() => {
            setIsLocked(false);
            setShowHeroText(true);
          }}
          onDone={() => {
            setCurtainActive(false);
            setShowHeroText(true);
          }}
          onStartMusic={startMusic}
          onShowHeroText={() => setShowHeroText(true)}
        />
      )}

      {/* Main Container - 100% Fluid on Mobile, Centered Luxury Invitation on Desktop */}
      <div className="min-h-screen bg-background text-foreground flex justify-center">
        <div className="w-full max-w-[620px] bg-background relative md:shadow-[0_0_60px_rgba(71,84,58,0.12)] md:border-x md:border-foreground/10">
          <main className="bg-background text-foreground overflow-x-hidden min-h-screen relative">
            {/* 1. Hero Section with AN Crest & Couple Names */}
            <HeroSection
              showText={showHeroText}
              onVideoEnded={() => setIsLocked(false)}
            />

            {/* 2. Live Countdown targeting Friday, 23 October 2026 1:30 PM */}
            <CountdownSection />

            <Divider />

            {/* 3. Formal Invitation Letter from Bride's Parents with Bismillah */}
            <InvitationLetterSection />

            <Divider />

            {/* 4. Couple Details (Bride Nishi & Groom Abir with Parents & Addresses) */}
            <CoupleDetailsSection />

            <Divider />

            {/* 5. When & Where Frame (Benarosi Community Center, 23 Oct 1:30 PM) */}
            <WhenWhereSection />

            <Divider />

            {/* 6. Our Venue Section */}
            <VenueSection />

            <Divider />

            {/* 7. The Celebrations Card */}
            <CelebrationSection />

            <Divider />

            {/* 8. Programme on Linen Frame (Timeline from 1:30 PM to 5:00 PM) */}
            <ProgrammeSection />

            {/* 13. Footer Frame */}
            <FooterSection />
          </main>
        </div>
      </div>

      {/* Floating Audio Controls Bottom Right */}
      {isPlaying && (
        <AudioPlayer isMuted={isMuted} onToggle={toggleMute} />
      )}

      {/* Comprehensive Admin Portal Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === "#admin") {
            history.replaceState(null, "", " ");
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <InvitationApp />
      </LanguageProvider>
    </DataProvider>
  );
}
