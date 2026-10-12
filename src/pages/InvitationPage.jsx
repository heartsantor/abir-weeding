import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function InvitationPage() {
  const { data, loading } = useData();
  const { lang, toggleLang, t } = useLanguage();

  const [isLocked, setIsLocked] = useState(true);
  const [openingHidden, setOpeningHidden] = useState(false);
  const [openingDisplayNone, setOpeningDisplayNone] = useState(false);

  const [musicActive, setMusicActive] = useState(false);
  const [musicIsOn, setMusicIsOn] = useState(false);
  const audioRef = useRef(null);

  const canvasRef = useRef(null);
  const [scratched, setScratched] = useState(false);
  const [petalActive, setPetalActive] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Countdown timer
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  });

  // Handle body locked class
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('locked');
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('locked');
    }
    return () => {
      document.body.classList.remove('locked');
    };
  }, [isLocked]);

  // Handle scratch-to-reveal canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || scratched) return;

    let drawing = false;
    let erasedCount = 0;
    let revealed = false;
    let initialized = false;
    let userStartedScratching = false;
    let lastPoint = null;

    const paintFoil = () => {
      if (revealed || scratched || userStartedScratching) return;
      const cvs = canvasRef.current;
      if (!cvs) return;

      const rect = cvs.getBoundingClientRect();
      const parent = cvs.parentElement;
      const w = rect.width > 0 ? rect.width : (parent?.clientWidth || cvs.offsetWidth || 320);
      const h = rect.height > 0 ? rect.height : (parent?.clientHeight || cvs.offsetHeight || 216);

      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);

      const ctx = cvs.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Shimmering Rose Gold foil metallic gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#c792a2');
      g.addColorStop(0.2, '#fceaf0');
      g.addColorStop(0.45, '#deb0be');
      g.addColorStop(0.7, '#fef0f5');
      g.addColorStop(1, '#be8699');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Double delicate decorative foil border
      ctx.strokeStyle = '#a8677c';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(6, 6, w - 12, h - 12);
      ctx.strokeStyle = '#deb0be';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(9, 9, w - 18, h - 18);

      // Foil text
      ctx.fillStyle = '#6b3547';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 12px Montserrat, sans-serif';
      ctx.fillText('✧ SCRATCH TO REVEAL ✧', w / 2, h / 2 - 12);

      ctx.font = 'bold 12px "Noto Serif Bengali", sans-serif';
      ctx.fillStyle = '#7a394e';
      ctx.fillText('ঘষে বিয়ের তারিখ দেখুন', w / 2, h / 2 + 10);

      ctx.font = '14px serif';
      ctx.fillStyle = '#a8677c';
      ctx.fillText('✧  ♡  ✧', w / 2, h / 2 + 28);

      ctx.globalCompositeOperation = 'destination-out';
      initialized = true;
    };

    // Paint immediately and at intervals to ensure foil is always present
    paintFoil();
    const tId1 = setTimeout(paintFoil, 50);
    const tId2 = setTimeout(paintFoil, 200);
    const tId3 = setTimeout(paintFoil, 500);
    const tId4 = setTimeout(paintFoil, 1000);

    // IntersectionObserver to paint the instant section 4 enters the screen
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !userStartedScratching) {
          paintFoil();
        }
      });
    }, { threshold: [0, 0.1, 0.25] });
    io.observe(canvas);

    // ResizeObserver to adjust to layout size
    const ro = new ResizeObserver(() => {
      if (!userStartedScratching && !revealed && !scratched) {
        paintFoil();
      }
    });
    ro.observe(canvas);

    const performReveal = () => {
      if (revealed || scratched) return;
      revealed = true;
      setScratched(true);
      canvas.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      canvas.style.opacity = '0';
      canvas.style.transform = 'scale(1.03)';
      canvas.style.pointerEvents = 'none';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 520);
      triggerRosePetals();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#c78a9a', '#e8c5cf', '#ffd1dc', '#d4af37', '#ffffff'],
        });
      } catch (e) {}
    };

    const scratchAt = (x, y) => {
      if (revealed || scratched) return;
      userStartedScratching = true;
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      erasedCount++;
      if (erasedCount > 10) {
        performReveal();
      }
    };

    const scratchLine = (p1, p2) => {
      if (!p1 || !p2 || revealed || scratched) return;
      userStartedScratching = true;
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.lineWidth = 44;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      erasedCount += 2;
      if (erasedCount > 12) {
        performReveal();
      }
    };

    // Touch event listeners for mobile (with passive: false to prevent scrolling)
    const onTouchStart = (e) => {
      if (revealed || scratched) return;
      e.preventDefault();
      drawing = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      lastPoint = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      scratchAt(lastPoint.x, lastPoint.y);
    };

    const onTouchMove = (e) => {
      if (!drawing || revealed || scratched) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const currentPoint = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      scratchLine(lastPoint, currentPoint);
      lastPoint = currentPoint;
    };

    const onTouchEnd = () => {
      drawing = false;
      lastPoint = null;
    };

    // Mouse / Pointer event listeners
    const onMouseDown = (e) => {
      if (revealed || scratched) return;
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      lastPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      scratchAt(lastPoint.x, lastPoint.y);
    };

    const onMouseMove = (e) => {
      if (!drawing || revealed || scratched) return;
      const rect = canvas.getBoundingClientRect();
      const currentPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      scratchLine(lastPoint, currentPoint);
      lastPoint = currentPoint;
    };

    const onMouseUp = () => {
      drawing = false;
      lastPoint = null;
    };

    const onClick = (e) => {
      if (revealed || scratched) return;
      const rect = canvas.getBoundingClientRect();
      scratchAt(e.clientX - rect.left, e.clientY - rect.top);
      erasedCount += 4;
      if (erasedCount > 8) {
        performReveal();
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);

    return () => {
      clearTimeout(tId1);
      clearTimeout(tId2);
      clearTimeout(tId3);
      clearTimeout(tId4);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
    };
  }, [scratched, isLocked, openingDisplayNone]);

  // Rose petals generator matching original
  const triggerRosePetals = () => {
    const layer = document.getElementById('petalLayer');
    if (!layer || layer.dataset.started === '1') return;
    layer.dataset.started = '1';
    setPetalActive(true);

    const count = 44;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.className = 'rose-petal';
      const left = Math.random() * 104 - 2;
      const size = 8 + Math.random() * 11;
      const dur = 3.8 + Math.random() * 2.8;
      const delay = Math.random() * 0.18;
      const rot = -40 + Math.random() * 100;
      const drift = -55 + Math.random() * 110 + 'px';
      const drift2 = -70 + Math.random() * 140 + 'px';

      petal.style.setProperty('--left', left + '%');
      petal.style.setProperty('--size', size + 'px');
      petal.style.setProperty('--dur', dur + 's');
      petal.style.setProperty('--delay', delay + 's');
      petal.style.setProperty('--rot', rot + 'deg');
      petal.style.setProperty('--drift', drift);
      petal.style.setProperty('--drift2', drift2);
      layer.appendChild(petal);
    }

    setTimeout(() => {
      setPetalActive(false);
    }, 8500);
  };

  // Countdown timer
  useEffect(() => {
    const update = () => {
      const targetStr = data?.saveDate?.targetDate || '2026-10-25T13:30:00';
      const target = new Date(targetStr).getTime();
      const diff = Math.max(0, target - Date.now());

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const formatVal = (num) => {
        if (lang === 'bn') {
          const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
          return String(num).padStart(2, '0').split('').map(c => bnNums[c] || c).join('');
        }
        return String(num).padStart(2, '0');
      };

      setCountdown({
        days: formatVal(d),
        hours: formatVal(h),
        minutes: formatVal(m),
        seconds: formatVal(s),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [data, lang]);

  // Open Invitation handler
  const handleOpenInvitation = async () => {
    setIsLocked(false);
    setOpeningHidden(true);
    setMusicActive(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      try {
        await audioRef.current.play();
        setMusicIsOn(true);
      } catch (err) {
        setMusicIsOn(false);
      }
    }

    setTimeout(() => {
      setOpeningDisplayNone(true);
      const coupleEl = document.querySelector('.couple');
      if (coupleEl) {
        coupleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 850);
  };

  // Music Toggle
  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setMusicIsOn(true);
      } catch (e) {
        setMusicIsOn(false);
      }
    } else {
      audioRef.current.pause();
      setMusicIsOn(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7dfe8]">
        <div className="text-[#8c6670] font-serif text-lg tracking-wider">
          Loading Invitation...
        </div>
      </div>
    );
  }

  const rawPhotos = data.gallery?.photos || [];
  const photos = (Array.isArray(rawPhotos) ? rawPhotos : [])
    .map((p) => String(p).trim())
    .filter(Boolean);
  const quotes = data.gallery?.quotes || [];
  const showGallery = Boolean(data.gallery?.show) && photos.length > 0;

  const formatPhotoSrc = (src) => {
    if (!src) return '';
    if (
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:') ||
      src.startsWith('/')
    ) {
      return src;
    }
    return `/${src}`;
  };

  return (
    <>
      {/* Background Audio */}
      <audio
        ref={audioRef}
        id="bgMusic"
        src="/assets/bg-music.mpeg"
        loop
        preload="auto"
      />

      {/* Language Toggle Fixed Top-Left */}
      {!isAdminOpen && (
        <button
          onClick={toggleLang}
          className="lang-toggle"
          aria-label="Toggle language"
          title="ভাষা পরিবর্তন / Switch Language"
        >
          <span style={{ fontWeight: lang === 'bn' ? '700' : '400', color: lang === 'bn' ? '#8d5d6c' : '#765463' }}>
            বাং
          </span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ fontWeight: lang === 'en' ? '700' : '400', color: lang === 'en' ? '#8d5d6c' : '#765463' }}>
            EN
          </span>
        </button>
      )}

      {/* Floating Music Button */}
      {!isAdminOpen && (
        <button
          id="musicToggle"
          className={`music-toggle ${musicActive ? 'active' : ''}`}
          type="button"
          aria-pressed={musicIsOn}
          aria-label={musicIsOn ? 'Turn music off' : 'Turn music on'}
          onClick={toggleMusic}
        >
          ♫ <span>{musicIsOn ? 'ON' : 'OFF'}</span>
        </button>
      )}

      {/* Admin Floating Badge */}
      {!isAdminOpen && (
        <button
          onClick={() => setIsAdminOpen(true)}
          className="admin-badge-trigger"
          title="Admin Control Panel"
        >
          ⚙ Admin
        </button>
      )}

      {/* Main Single Column Container matching reference website */}
      <main className="invite">
        {/* 1. Opening */}
        <section
          className={`opening page ${openingHidden ? 'hidden' : ''}`}
          id="top"
          aria-label="Open invitation"
          style={{ display: openingDisplayNone ? 'none' : 'flex' }}
        >
          <div className="opening-monogram-wrap">
            <img
              className="monogram"
              src={data.opening?.monogram ? `/${data.opening.monogram}` : '/assets/monogram-an-transparent.png'}
              alt="AN Royal Monogram"
            />
            <p className="opening-subtitle" style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}>
              {t(data.opening?.subtitle)}
            </p>
            <button
              className="open-btn"
              id="openInvitation"
              onClick={handleOpenInvitation}
            >
              {t(data.opening?.openButton)}
            </button>
          </div>
        </section>

        {/* 2. Invitation Letter & Bismillah Section */}
        <section className="couple page" aria-label="The couple and their families">
          <div className="couple-copy">
            <p className="eyebrow" style={{ whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal' }}>
              {t(data.couple?.eyebrow)}
            </p>
            <div className="couple-person">
              <h1 style={{ wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'normal' }}>
                {t(data.couple?.groom?.name)}
              </h1>
              <p style={{ whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal', fontSize: 'clamp(9.5px, 2.4vw, 11.5px)', lineHeight: '1.35', margin: '2px auto 0', maxWidth: '300px' }}>
                <em>{t(data.couple?.groom?.parents)}</em>
              </p>
              {data.couple?.groom?.address && (
                <p className="couple-address" style={{ fontSize: 'clamp(8.5px, 2.1vw, 10px)', color: '#7a5a67', marginTop: '2px', whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal', lineHeight: '1.35', maxWidth: '290px', margin: '2px auto 0' }}>
                  {t(data.couple?.groom?.address)}
                </p>
              )}
            </div>
            <div className="couple-divider">&amp;</div>
            <div className="couple-person">
              <h1 style={{ wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'normal' }}>
                {t(data.couple?.bride?.name)}
              </h1>
              <p style={{ whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal', fontSize: 'clamp(9.5px, 2.4vw, 11.5px)', lineHeight: '1.35', margin: '2px auto 0', maxWidth: '300px' }}>
                <em>{t(data.couple?.bride?.parents)}</em>
              </p>
              {data.couple?.bride?.address && (
                <p className="couple-address" style={{ fontSize: 'clamp(8.5px, 2.1vw, 10px)', color: '#7a5a67', marginTop: '2px', whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal', lineHeight: '1.35', maxWidth: '290px', margin: '2px auto 0' }}>
                  {t(data.couple?.bride?.address)}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 3. Formal Card Invitation Letter (Islamic Calligraphy + Full Body Text) */}
        {data.invitationLetter && (
          <section className="event penn page" aria-label="Formal Wedding Invitation Letter">
            <div className="event-copy penn-copy">
              <div style={{ fontFamily: "'Noto Serif Bengali', 'Cormorant Garamond', serif", fontSize: 'clamp(16px, 3.8vw, 19.5px)', color: '#5e1f31', marginBottom: '3px', fontWeight: '800', textAlign: 'center', letterSpacing: '0.01em', textShadow: '0 1px 1px rgba(255,255,255,0.8)' }}>
                {t(data.invitationLetter.bismillahTitle)}
              </div>
              <div style={{ fontSize: 'clamp(9.5px, 2.2vw, 11px)', color: '#703b4d', marginBottom: '8px', fontFamily: "'Noto Serif Bengali', Montserrat, sans-serif", fontWeight: '600', letterSpacing: '0.04em', textAlign: 'center' }}>
                {t(data.invitationLetter.bismillahSub)}
              </div>
              <div className="w-24 h-[1.5px] mx-auto bg-gradient-to-r from-transparent via-[#c78a9a] to-transparent mb-3 opacity-80" />
              <div style={{ fontSize: 'clamp(12px, 2.6vw, 13.5px)', fontWeight: '700', color: '#4a2030', marginBottom: '3px', textAlign: 'center', fontFamily: "'Noto Serif Bengali', serif" }}>
                {t(data.invitationLetter.salutation)}
              </div>
              <div style={{ fontSize: 'clamp(12px, 2.6vw, 13.5px)', fontWeight: '700', color: '#4a2030', marginBottom: '10px', textAlign: 'center', fontFamily: "'Noto Serif Bengali', serif" }}>
                {t(data.invitationLetter.greeting)}
              </div>
              <p style={{ fontFamily: "'Noto Serif Bengali', serif", whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'normal', fontSize: 'clamp(10.5px, 2.4vw, 12px)', lineHeight: '1.7', textAlign: 'center', color: '#2b1920', margin: '0 auto', maxWidth: '320px', fontWeight: '500' }}>
                {t(data.invitationLetter.body)}
              </p>
            </div>
          </section>
        )}

        {/* 4. Remember the Date & Scratch Reveal */}
        <section className="save-date page" aria-label="Remember the date">
          <div
            className={`petal-layer ${petalActive ? 'active' : ''}`}
            id="petalLayer"
            aria-hidden="true"
          />
          <div className="save-overlay">
            <div className="scratch-wrap" id="scratchWrap">
              <div className="revealed-date">
                <span>{t(data.saveDate?.label)}</span>
                <strong>{t(data.saveDate?.day)}</strong>
                <b>{t(data.saveDate?.month)}</b>
                <small>{t(data.saveDate?.year)}</small>
                {data.saveDate?.bengaliEra && (
                  <span style={{ fontSize: '7.5px', marginTop: '3px', letterSpacing: '0.05em' }}>
                    {t(data.saveDate?.bengaliEra)}
                  </span>
                )}
              </div>
              <canvas
                ref={canvasRef}
                id="scratchCanvas"
                width={320}
                height={216}
                aria-label="Scratch to reveal the wedding date"
              />
            </div>
            <div className="countdown" id="countdown">
              <div>
                <strong id="days">{countdown.days}</strong>
                <span>{lang === 'bn' ? 'দিন' : 'DAYS'}</span>
              </div>
              <div>
                <strong id="hours">{countdown.hours}</strong>
                <span>{lang === 'bn' ? 'ঘণ্টা' : 'HOURS'}</span>
              </div>
              <div>
                <strong id="minutes">{countdown.minutes}</strong>
                <span>{lang === 'bn' ? 'মিনিট' : 'MINUTES'}</span>
              </div>
              <div>
                <strong id="seconds">{countdown.seconds}</strong>
                <span>{lang === 'bn' ? 'সেকেন্ড' : 'SECONDS'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Gaye Holud Event (গায়ে হলুদ - ২৪ অক্টোবর ২০২৬) */}
        {data.events?.holud && (
          <section className="event holud page" aria-label="Gaye Holud Ceremony">
            <div className="event-copy holud-copy">
              {data.events.holud.tag && (
                <span className="event-tag">{t(data.events.holud.tag)}</span>
              )}
              <h2>{t(data.events.holud.title)}</h2>
              <p className="event-date">{t(data.events.holud.date)}</p>
              <p className="event-time">{t(data.events.holud.time)}</p>
              <p className="event-place" style={{ whiteSpace: 'pre-line' }}>
                {t(data.events.holud.place)}
              </p>
              <a
                className="map-link"
                href={data.events.holud.mapUrl || 'https://maps.app.goo.gl/F8BpyknDbEjNUFy16'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(data.events.holud.mapText)}
              </a>
            </div>
          </section>
        )}

        {/* 6. Reception Event (বৌ-ভাত ও প্রীতিভোজ - ২৫ অক্টোবর ২০২৬) */}
        {data.events?.reception && (
          <section className="event reception page" aria-label="Wedding Reception">
            <div className="event-copy reception-copy">
              {data.events.reception.tag && (
                <span className="event-tag">{t(data.events.reception.tag)}</span>
              )}
              <h2>{t(data.events.reception.title)}</h2>
              <p className="event-date">{t(data.events.reception.date)}</p>
              <p className="event-time">{t(data.events.reception.time)}</p>
              <p className="event-place" style={{ whiteSpace: 'pre-line' }}>
                {t(data.events.reception.place)}
              </p>
              <a
                className="map-link"
                href={data.events.reception.mapUrl || 'https://maps.app.goo.gl/F8BpyknDbEjNUFy16'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(data.events.reception.mapText)}
              </a>
            </div>
          </section>
        )}

        {/* 7. Best Wishes & Relatives Section (শুভেচ্ছান্তে, অভ্যর্থনায়, হৈ চৈ) */}
        {data.blessings && (
          <section className="event blessings-section page" aria-label="Blessings and Family">
            <div className="event-copy blessings-copy">
              {/* শুভেচ্ছান্তে */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontFamily: "'Great Vibes', 'Noto Serif Bengali', serif", fontSize: 'clamp(21px, 4.8vw, 25px)', color: '#8c5e6d', margin: '0 0 4px', fontWeight: 'bold', letterSpacing: '0.02em' }}>
                  {String(t(data.blessings.wishes?.title) || '').replace(/-\s*[\u0983:]\s*/g, '-: ').replace(/\s*[\u0983:]\s*-/g, ' :-')}
                </h3>
                <p style={{ fontFamily: "'Noto Serif Bengali', serif", whiteSpace: 'pre-line', fontSize: 'clamp(11px, 2.3vw, 12px)', lineHeight: '1.6', color: '#5b474e', margin: 0, fontWeight: '500' }}>
                  {t(data.blessings.wishes?.names)}
                </p>
              </div>

              {/* অভ্যর্থনায় */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontFamily: "'Great Vibes', 'Noto Serif Bengali', serif", fontSize: 'clamp(21px, 4.8vw, 25px)', color: '#8c5e6d', margin: '0 0 4px', fontWeight: 'bold', letterSpacing: '0.02em' }}>
                  {String(t(data.blessings.reception?.title) || '').replace(/-\s*[\u0983:]\s*/g, '-: ').replace(/\s*[\u0983:]\s*-/g, ' :-')}
                </h3>
                <p style={{ fontFamily: "'Noto Serif Bengali', serif", whiteSpace: 'pre-line', fontSize: 'clamp(10px, 2.1vw, 11px)', lineHeight: '1.6', color: '#5b474e', margin: 0, fontWeight: '500' }}>
                  {t(data.blessings.reception?.names)}
                </p>
              </div>

              {/* হৈ চৈ */}
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontFamily: "'Great Vibes', 'Noto Serif Bengali', serif", fontSize: 'clamp(19px, 4.5vw, 22px)', color: '#8c5e6d', margin: '0 0 4px', fontWeight: 'bold', letterSpacing: '0.02em' }}>
                  {String(t(data.blessings.youngsters?.title) || '').replace(/-\s*[\u0983:]\s*/g, '-: ').replace(/\s*[\u0983:]\s*-/g, ' :-')}
                </h3>
                <p style={{ fontFamily: "'Noto Serif Bengali', serif", whiteSpace: 'pre-line', fontSize: 'clamp(9.5px, 2vw, 10.5px)', lineHeight: '1.5', color: '#7a5a67', margin: 0 }}>
                  {t(data.blessings.youngsters?.names)}
                </p>
              </div>

              {/* Contacts with small call buttons */}
              {(() => {
                const list = Array.isArray(data.blessings.contacts)
                  ? data.blessings.contacts
                  : typeof data.blessings.contacts === 'string'
                  ? data.blessings.contacts.split(/[\n,]+/)
                  : [];
                const validList = list.map((c) => String(c).trim()).filter(Boolean);
                if (validList.length === 0) return null;
                return (
                  <div className="call-buttons-wrap">
                    {validList.map((contact, idx) => {
                      const cleanNum = contact.replace(/[^0-9+]/g, '');
                      return (
                        <a
                          key={idx}
                          href={`tel:${cleanNum}`}
                          className="call-btn"
                          title={lang === 'bn' ? `কল করুন: ${contact}` : `Call: ${contact}`}
                        >
                          <svg
                            className="call-icon"
                            viewBox="0 0 24 24"
                            width="11"
                            height="11"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                          <span>{contact}</span>
                        </a>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* 7. Gallery */}
        {showGallery && (
          <section className="gallery page" aria-label="Photo Gallery">
            <div className="gallery-content">
              <h2>{t(data.gallery?.title)}</h2>
              <div className="gallery-viewer">
                <button
                  className="gallery-nav prev"
                  id="prevPhoto"
                  aria-label="Previous photo"
                  onClick={() =>
                    setPhotoIndex((photoIndex - 1 + photos.length) % photos.length)
                  }
                >
                  ‹
                </button>
                <div className="photo-print">
                  <img
                    id="galleryPhoto"
                    src={formatPhotoSrc(photos[photoIndex % photos.length])}
                    alt="Couple Moment"
                  />
                  <div className="photo-caption" id="galleryQuote">
                    {quotes[photoIndex % photos.length]
                      ? t(quotes[photoIndex % photos.length])
                      : ''}
                  </div>
                </div>
                <button
                  className="gallery-nav next"
                  id="nextPhoto"
                  aria-label="Next photo"
                  onClick={() => setPhotoIndex((photoIndex + 1) % photos.length)}
                >
                  ›
                </button>
              </div>
              <div className="gallery-dots" id="galleryDots" aria-hidden="true">
                {photos.map((_, idx) => (
                  <span
                    key={idx}
                    className={idx === (photoIndex % photos.length) ? 'active' : ''}
                    onClick={() => setPhotoIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. Guest Message */}
        <section className="guest page" aria-label="Guest Message">
          <div className="guest-copy">
            <h2>{t(data.guest?.title)}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>
              {t(data.guest?.message)}
            </p>
            <div className="guest-signoff">
              <span>– {t(data.guest?.signoff?.name1)}</span>
              <strong>&amp;</strong>
              <span>{t(data.guest?.signoff?.name2)}</span>
            </div>
          </div>
        </section>

        {/* 9. Thank You Footer */}
        <footer className="footer page" aria-label="Thank you">
          <div className="footer-copy">
            <h2>{t(data.footer?.title)}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>
              {t(data.footer?.message)}
            </p>
            <small>{t(data.footer?.credit)}</small>
            <a
              className="instagram-pill"
              href={data.footer?.referenceUrl || 'https://trialvo.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trialvo"
            >
              <span className="instagram-icon">✦</span>
              <span>{data.footer?.reference || 'trialvo.com'}</span>
            </a>
          </div>
        </footer>
      </main>

      {/* Admin Panel Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </>
  );
}
