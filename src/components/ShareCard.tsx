import React, { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { courseModules } from '@/data/courseData';
import {
  FiDownload,
  FiShare2,
  FiX,
  FiCheckCircle,
  FiLoader,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
} from 'react-icons/fi';

// ─────────────────────────────────────────────────────────────────────────────
// SVG Circular Progress Ring
// ─────────────────────────────────────────────────────────────────────────────
interface CircleProgressProps {
  /** 0 – 100 */
  percent: number;
  size?: number;   // SVG width/height in px
  stroke?: number; // ring thickness
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percent,
  size = 140,
  stroke = 10,
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={stroke}
      />
      {/* Animated foreground arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#shareCardGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}
      />
      <defs>
        <linearGradient id="shareCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ShareCard Props
// ─────────────────────────────────────────────────────────────────────────────
export interface ShareCardData {
  userName: string;
  overallProgress: number;   // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  averageScore: number;
  streak: number;
  dailyActivity: { date: string; count: number }[];
}

interface ShareCardProps {
  data: ShareCardData;
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Seven-day mini sparkline (pure SVG)
// ─────────────────────────────────────────────────────────────────────────────
const WeekSparkline: React.FC<{ activity: { count: number }[] }> = ({
  activity,
}) => {
  if (activity.length === 0) return null;
  const max = Math.max(...activity.map(d => d.count), 1);
  const h = 24;
  const barW = 8;
  const gap = 4;
  const w = activity.length * (barW + gap);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mx-auto">
      {activity.map((d, i) => {
        const barH = Math.max(2, (d.count / max) * h);
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - barH}
            width={barW}
            height={barH}
            rx={2}
            fill="rgba(255,255,255,0.6)"
          />
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ShareCard (visible rendered card + download/share logic)
// ─────────────────────────────────────────────────────────────────────────────
const ShareCard: React.FC<ShareCardProps> = ({ data, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    userName,
    overallProgress,
    lessonsCompleted,
    totalLessons,
    completedModules,
    totalModules,
    averageScore,
    streak,
    dailyActivity,
  } = data;

  // ── Generate PNG from card ──────────────────────────────────────────────
  const generateImage = useCallback(async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    setIsGenerating(true);
    try {
      // Force the element to a fixed width so the output image is consistent
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 640,
        cacheBust: true,
        style: { transform: 'scale(1)' },
      });

      // Convert data URL → Blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      setPreviewUrl(dataUrl);
      return blob;
    } catch (err) {
      console.error('Image generation failed:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // ── Download as PNG ─────────────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    const blob = await generateImage();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LearnCSS-Progress-${userName.replace(/\s+/g, '-')}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [generateImage, userName]);

  // ── Share to LinkedIn ───────────────────────────────────────────────────
  const handleShareLinkedIn = useCallback(async () => {
    // Download the image first (LinkedIn doesn't support programmatic image
    // uploads, so we guide the user to attach it manually).
    const blob = await generateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LearnCSS-Progress-${userName.replace(/\s+/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }

    const postText = encodeURIComponent(
      `🎉 I just reached ${overallProgress}% progress on my #LearnCSS journey!\n\n` +
      `✅ ${lessonsCompleted}/${totalLessons} lessons completed\n` +
      `📚 ${completedModules}/${totalModules} modules finished\n` +
      `⭐ Average score: ${averageScore}%\n` +
      `🔥 ${streak}-day learning streak\n\n` +
      `Master CSS interactively at LearnCSS!\n\n` +
      `#CSS #WebDevelopment #FrontEnd #LearnCSS #Coding #ProfessionalDevelopment`
    );

    // Small delay so the download starts before the popup opens
    setTimeout(() => {
      window.open(
        `https://www.linkedin.com/feed/?shareActive=true&text=${postText}`,
        '_blank',
        'noopener,noreferrer'
      );
    }, 400);
  }, [generateImage, userName, overallProgress, lessonsCompleted, totalLessons, completedModules, totalModules, averageScore, streak]);

  // ── Mini heatmap (last 7 days) ──────────────────────────────────────────
  const last7 = dailyActivity.slice(-7);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 overlay-enter"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full
                     bg-white/20 text-white hover:bg-white/30 transition-colors
                     flex items-center justify-center"
        >
          <FiX />
        </button>

        {/* ═══════════════════════════════════════════════════════════════════
            THE CARD — this is what gets converted to PNG.
            Fixed width of 640px ensures a clean, consistent image.
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl mb-6"
          style={{ width: 640 }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #312e81 100%)',
            }}
          />
          {/* Decorative circles */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-white/60 text-xs font-medium tracking-wider uppercase">
                    LearnCSS
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {userName}&apos;s Learning Journey
                </h2>
                <p className="text-white/50 text-sm mt-0.5">
                  Mastering CSS — one lesson at a time
                </p>
              </div>
              <CircleProgress percent={overallProgress} />
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <StatChip
                icon={<FiBookOpen className="text-cyan-400" />}
                label="Lessons"
                value={`${lessonsCompleted}/${totalLessons}`}
              />
              <StatChip
                icon={<FiCheckCircle className="text-green-400" />}
                label="Modules"
                value={`${completedModules}/${totalModules}`}
              />
              <StatChip
                icon={<FiAward className="text-amber-400" />}
                label="Avg Score"
                value={`${averageScore}%`}
              />
              <StatChip
                icon={<FiTrendingUp className="text-purple-400" />}
                label="Streak"
                value={`${streak} days`}
              />
            </div>

            {/* Module progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/50 mb-2">
                <span>Course Completion</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${overallProgress}%`,
                    background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #ec4899)',
                  }}
                />
              </div>
              {/* Module chips */}
              <div className="flex gap-2 mt-3">
                {courseModules.map(mod => {
                  const idx = courseModules.indexOf(mod);
                  const done = idx + 1 <= completedModules;
                  return (
                    <div
                      key={mod._id}
                      className={`flex-1 h-1.5 rounded-full ${
                        done ? 'bg-cyan-400/80' : 'bg-white/10'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Mini activity sparkline */}
            <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div>
                <p className="text-white/40 text-xs">Last 7 Days Activity</p>
                <p className="text-white/80 text-sm font-medium">
                  {last7.reduce((s, d) => s + d.count, 0)} lessons completed
                </p>
              </div>
              <WeekSparkline activity={last7} />
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-white/30 text-xs">
                learn-css-platform.com
              </p>
              <p className="text-white/30 text-xs">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ACTION BUTTONS
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900
                       rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg
                       disabled:opacity-50"
          >
            {isGenerating ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiDownload />
            )}
            Download PNG
          </button>

          <button
            type="button"
            onClick={handleShareLinkedIn}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] text-white
                       rounded-lg font-semibold hover:bg-[#004182] transition-all shadow-lg
                       disabled:opacity-50"
          >
            {isGenerating ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiShare2 />
            )}
            Share on LinkedIn
          </button>

          {previewUrl && (
            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard && window.ClipboardItem) {
                  fetch(previewUrl)
                    .then(r => r.blob())
                    .then(blob => {
                      navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob }),
                      ]);
                    });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white
                         rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
            >
              📋 Copy Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Tiny stat chip used inside the card
// ─────────────────────────────────────────────────────────────────────────────
const StatChip: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg px-3 py-3">
    <div className="text-lg">{icon}</div>
    <p className="text-white font-bold text-sm">{value}</p>
    <p className="text-white/40 text-[10px] uppercase tracking-wide">{label}</p>
  </div>
);

export default ShareCard;
