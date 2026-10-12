import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SaveTheDate({ saveTheDate }) {
  const { t, lang } = useLanguage();
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Target wedding date: October 25, 2026, 1:30 PM (BST / UTC+6)
  const targetDateStr = saveTheDate?.targetDate || '2026-10-25T13:30:00+06:00';

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateStr) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Canvas Scratch Card Implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Draw gold foil metallic scratch layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#BF953F');
    gradient.addColorStop(0.25, '#FCF6BA');
    gradient.addColorStop(0.5, '#B38728');
    gradient.addColorStop(0.75, '#FBF5B7');
    gradient.addColorStop(1, '#AA771C');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil stamp text
    ctx.fillStyle = '#4a3319';
    ctx.font = 'bold 15px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH TO REVEAL ✨', width / 2, height / 2 - 8);

    ctx.font = '12px Hind Siliguri, sans-serif';
    ctx.fillText('তারিখ দেখতে স্ক্র্যাচ করুন', width / 2, height / 2 + 16);

    let isDrawing = false;
    let scratchedPixels = 0;

    const checkScratchedPercentage = () => {
      try {
        const imgData = ctx.getImageData(0, 0, width, height);
        let clearPixels = 0;
        for (let i = 3; i < imgData.data.length; i += 16) {
          if (imgData.data[i] === 0) clearPixels++;
        }
        const percentage = (clearPixels / (imgData.data.length / 16)) * 100;
        if (percentage > 40 && !isRevealed) {
          setIsRevealed(true);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#FCF6BA', '#BF953F', '#f7dfe8'],
          });
        }
      } catch (e) {
        // Ignore canvas read errors
      }
    };

    const scratch = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels++;
      if (scratchedPixels % 12 === 0) {
        checkScratchedPercentage();
      }
    };

    const handleMouseDown = (e) => {
      isDrawing = true;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const handleTouchStart = (e) => {
      isDrawing = true;
      if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!isDrawing || !e.touches[0]) return;
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRevealed]);

  const revealInstantly = () => {
    setIsRevealed(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const toBengaliNumber = (num) => {
    if (lang !== 'bn') return String(num).padStart(2, '0');
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num)
      .padStart(2, '0')
      .split('')
      .map((d) => bnNums[d] || d)
      .join('');
  };

  return (
    <section
      id="save-the-date"
      className="relative py-20 px-4 text-center bg-gradient-to-b from-[#2a1625] via-[#381a31] to-[#2a1625] text-white overflow-hidden"
    >
      {/* Decorative Golden Ornaments */}
      <div className="max-w-4xl mx-auto relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a96e]/40 bg-white/10 backdrop-blur-md mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#fbf5b7]" />
          <span className="text-xs uppercase tracking-widest text-[#fbf5b7] font-montserrat">
            {t(saveTheDate?.title) || (lang === 'bn' ? 'তারিখটি স্মরণ রাখুন' : 'Save The Date')}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#fbf5b7] mb-2">
          {lang === 'bn' ? 'আমাদের শুভ বৌ-ভাতের দিন' : 'Our Reception Day'}
        </h2>
        <p className="text-xs sm:text-sm text-[#e8c6ce] mb-8 font-bengali-sans">
          {t(saveTheDate?.scratchInstructions) || (lang === 'bn' ? 'তারিখটি দেখতে স্ক্র্যাচ করুন' : 'Scratch below to reveal')}
        </p>

        {/* Scratch Card Box */}
        <div className="relative w-72 sm:w-80 h-44 sm:h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-[#c9a96e]/60 bg-[#fff5f8] text-[#2a1625]">
          {/* Revealed Date Content Layer (Underneath Canvas) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 select-none">
            <span className="text-[11px] font-bold tracking-widest text-[#a37984] uppercase font-montserrat">
              {t(saveTheDate?.card?.tag)}
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold font-serif-title text-[#2a1625] tracking-tight my-0.5">
              {lang === 'bn' ? saveTheDate?.card?.day : saveTheDate?.card?.dayEn}
            </div>
            <div className="text-lg sm:text-xl font-bold font-serif uppercase tracking-widest text-[#b38728]">
              {t(saveTheDate?.card?.month)}
            </div>
            <div className="text-xs text-[#7a5c61] font-semibold mt-1">
              {lang === 'bn'
                ? `${saveTheDate?.card?.year} • ${t(saveTheDate?.card?.dayOfWeek)}`
                : `${saveTheDate?.card?.yearEn} • ${t(saveTheDate?.card?.dayOfWeek)}`}
            </div>
            <div className="text-[11px] text-[#a37984] font-bengali-sans">
              {t(saveTheDate?.card?.banglaCal)}
            </div>
          </div>

          {/* Canvas Scratch Foil Layer (On Top) */}
          <canvas
            ref={canvasRef}
            width={320}
            height={192}
            className={`absolute inset-0 w-full h-full scratch-canvas transition-opacity duration-700 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </div>

        {/* Reveal button helper */}
        {!isRevealed && (
          <button
            onClick={revealInstantly}
            className="mt-3 text-xs text-[#e5cd9c] hover:text-[#fbf5b7] underline flex items-center justify-center gap-1 mx-auto transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সরাসরি তারিখ দেখুন' : 'Show date directly'}</span>
          </button>
        )}

        {/* Countdown Timer */}
        <div className="mt-14 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#c9a96e]" />
            <h3 className="text-sm uppercase tracking-widest text-[#e8c6ce] font-montserrat font-semibold">
              {t(saveTheDate?.countdownTitle) || (lang === 'bn' ? 'শুভ মুহুর্তের গণনা' : 'Countdown')}
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {/* Days */}
            <div className="glass-panel-dark rounded-2xl p-3 sm:p-4 text-center border border-[#c9a96e]/30 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-title text-[#fbf5b7]">
                {toBengaliNumber(timeLeft.days)}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#e8c6ce] font-montserrat">
                {lang === 'bn' ? 'দিন' : 'DAYS'}
              </span>
            </div>

            {/* Hours */}
            <div className="glass-panel-dark rounded-2xl p-3 sm:p-4 text-center border border-[#c9a96e]/30 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-title text-[#fbf5b7]">
                {toBengaliNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#e8c6ce] font-montserrat">
                {lang === 'bn' ? 'ঘণ্টা' : 'HOURS'}
              </span>
            </div>

            {/* Minutes */}
            <div className="glass-panel-dark rounded-2xl p-3 sm:p-4 text-center border border-[#c9a96e]/30 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-title text-[#fbf5b7]">
                {toBengaliNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#e8c6ce] font-montserrat">
                {lang === 'bn' ? 'মিনিট' : 'MINUTES'}
              </span>
            </div>

            {/* Seconds */}
            <div className="glass-panel-dark rounded-2xl p-3 sm:p-4 text-center border border-[#c9a96e]/30 shadow-lg">
              <span className="block text-2xl sm:text-4xl font-bold font-serif-title text-[#fbf5b7]">
                {toBengaliNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#e8c6ce] font-montserrat">
                {lang === 'bn' ? 'সেকেন্ড' : 'SECONDS'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
