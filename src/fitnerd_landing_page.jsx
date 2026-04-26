import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_SRC = "/fitnerdUGC(-2interfaces).mp4";

const Pill = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/70">
    {children}
  </span>
);

const MiniMetric = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
    <div className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</div>
    <div className="mt-2 text-xl font-semibold">{value}</div>
  </div>
);

const CompactFeature = ({ title, text }) => (
  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-white/50">{text}</p>
  </div>
);

function InviteForm({
  email,
  onEmailChange,
  onSubmit,
  status,
  compact,
  autoFocus,
  className = "",
  inputId = "waitlist-email",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-stretch gap-2 ${compact ? "flex-1 min-w-0" : "w-full sm:w-auto sm:min-w-[min(100%,24rem)]"} ${className}`}
    >
      <input
        id={inputId}
        type="email"
        name="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        autoComplete="email"
        autoFocus={autoFocus}
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none ring-[#62e58f]/40 transition focus:border-[#62e58f]/50 focus:ring-2"
        disabled={status === "sending" || status === "success"}
      />
      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="shrink-0 rounded-full bg-[#62e58f] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#7df0a3] disabled:opacity-60"
      >
        {status === "sending" ? "…" : status === "success" ? "In!" : "Join"}
      </button>
    </form>
  );
}

function CustomVideoPlayer({ open, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
    };
  }, [open]);

  const fmt = (s) => {
    if (!Number.isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? v.currentTime / v.duration : 0);
  };

  const onScrub = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = parseFloat(e.target.value) * v.duration;
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2147481990,
    width: "100vw",
    height: "100dvh",
    minHeight: "100dvh",
    margin: 0,
    padding: 0,
    border: 0,
    display: "block",
    boxSizing: "border-box",
    cursor: "pointer",
    background: "rgba(0, 0, 0, 0.78)",
  };

  const panelStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: 0,
    transform: "translate(-50%, -50%)",
    width: "min(100vw - 2rem, 56rem)",
    maxWidth: "100vw",
    zIndex: 2147482000,
    boxSizing: "border-box",
    maxHeight: "min(100dvh - 2rem, 92dvh)",
    overflow: "auto",
  };

  const node = !open ? null : (
    <>
            <button
              type="button"
              className="backdrop-blur-sm"
              style={backdropStyle}
              aria-label="Close video"
              onClick={onClose}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Fitnerd film"
              className="w-full"
              style={panelStyle}
            >
            <div className="relative w-full rounded-[1.35rem] bg-gradient-to-br from-[#62e58f]/50 via-white/10 to-[#62e58f]/20 p-px">
              <div className="overflow-hidden rounded-[1.3rem] bg-[#0a0c0a] shadow-[0_0_60px_rgba(98,229,143,0.12)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#62e58f]">Watch film</div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div
                  className="relative aspect-video cursor-pointer bg-black"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    className="h-full w-full object-contain"
                    src={VIDEO_SRC}
                    playsInline
                    muted={muted}
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.5))]" />
                  <AnimatePresence>
                    {!playing && (
                      <motion.button
                        type="button"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="pointer-events-auto absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#62e58f] bg-[#62e58f]/20 text-[#62e58f] shadow-[0_0_40px_rgba(98,229,143,0.4)] backdrop-blur-sm transition hover:scale-105 hover:bg-[#62e58f]/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        aria-label="Play"
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col gap-3 border-t border-white/10 bg-black/60 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-[#62e58f]/50 hover:text-[#62e58f]"
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70"
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H3v6h3l5 4V5z" />
                          <line x1="19" y1="5" x2="5" y2="19" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H3v6h3l5 4V5z" />
                          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="min-w-0 flex-1">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.001}
                      value={progress}
                      onChange={onScrub}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#62e58f] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#62e58f] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(98,229,143,0.6)]"
                    />
                  </div>
                  <div className="shrink-0 text-right font-mono text-xs text-white/50">
                    {fmt(currentTime)} / {fmt(duration)}
                  </div>
                </div>
              </div>
            </div>
            </div>
    </>
  );
  if (typeof document === "undefined" || !node) return null;
  return createPortal(node, document.body);
}

export default function FitnerdLandingPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState("idle");
  const [videoOpen, setVideoOpen] = useState(false);
  const waitlistId = "waitlist-hero";
  const inviteSectionRef = useRef(null);

  const openInvite = () => {
    setInviteOpen(true);
    requestAnimationFrame(() => {
      inviteSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const submitWaitlist = async (e) => {
    e.preventDefault();
    setInviteStatus("sending");
    const endpoint = import.meta.env.VITE_WAITLIST_URL;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setInviteStatus("success");
    } catch {
      setInviteStatus("error");
    }
  };

  useEffect(() => {
    if (inviteStatus === "error") {
      const t = setTimeout(() => setInviteStatus("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [inviteStatus]);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen px-6 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(98,229,143,0.14),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(255,255,255,0.08),transparent_36%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        <nav className="relative z-20 mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xl font-semibold tracking-tight">Fitnerd</div>
          {inviteOpen ? (
            <InviteForm
              email={email}
              onEmailChange={setEmail}
              onSubmit={submitWaitlist}
              status={inviteStatus}
              compact
              inputId="waitlist-nav"
              className="sm:max-w-md"
            />
          ) : (
            <button
              type="button"
              onClick={openInvite}
              className="shrink-0 self-start rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90 sm:self-auto"
            >
              Request Invite
            </button>
          )}
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#62e58f]/80">Invite-only AI fitness coach</p>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
              Train in your own space.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/[0.62] md:text-xl">
              An AI trainer that reads your mood, checks your energy, and builds a plan you&apos;ll actually do. For introverts.
            </p>

            <div
              id={waitlistId}
              ref={inviteSectionRef}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              {inviteOpen ? (
                <>
                  <InviteForm
                    email={email}
                    onEmailChange={setEmail}
                    onSubmit={submitWaitlist}
                    status={inviteStatus}
                    inputId="waitlist-hero"
                    autoFocus
                  />
                  {inviteStatus === "error" && (
                    <p className="w-full text-sm text-red-300/90">Couldn&apos;t send — check your email or try again.</p>
                  )}
                  {inviteStatus === "success" && (
                    <p className="w-full text-sm text-[#62e58f]/90">You&apos;re on the list. We&apos;ll be in touch.</p>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setInviteOpen(true)}
                  className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-white/90"
                >
                  Request Invite
                </button>
              )}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="rounded-full border border-white/15 px-8 py-4 font-medium text-white/80 transition hover:bg-white/[0.06]"
              >
                Watch Film
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>No gym pressure</Pill>
              <Pill>No noisy coaching</Pill>
              <Pill>Mood-aware</Pill>
              <Pill>Energy-based</Pill>
              <Pill>Biometric-driven</Pill>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="relative rounded-[2rem] border border-white/10 bg-neutral-950/80 p-4 shadow-2xl md:p-6"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(98,229,143,0.16),transparent_34%)]" />

            <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1fr]">
              <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13),transparent_38%)]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-44 w-44 rounded-full border border-white/15 bg-white/[0.03] shadow-2xl">
                    <div className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.08]" />
                    <div className="absolute bottom-6 left-1/2 h-20 w-32 -translate-x-1/2 rounded-[50%] border border-white/10 bg-white/[0.06]" />

                    {["top-10 left-14", "top-10 right-14", "top-20 left-10", "top-20 right-10", "top-28 left-16", "top-28 right-16"].map((pos) => (
                      <motion.span
                        key={pos}
                        className={`absolute ${pos} h-2 w-2 rounded-full bg-[#62e58f] shadow-[0_0_18px_rgba(98,229,143,0.9)]`}
                        animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    ))}

                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-[#62e58f] shadow-[0_0_24px_rgba(98,229,143,0.9)]"
                      animate={{ top: [24, 150, 24] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                <div className="absolute left-5 top-5 text-xs uppercase tracking-[0.25em] text-[#62e58f]">Analyzing</div>
                <div className="absolute bottom-5 left-5 text-sm text-white/55">Mood · Energy · Biometrics</div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-[#070807] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-white/45">AI result</span>
                  <span className="text-xl font-semibold text-[#62e58f]">Fitnerd</span>
                </div>

                <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/40">Energy level</p>
                  <div className="flex items-end justify-between">
                    <div className="text-5xl font-semibold">72<span className="text-2xl">%</span></div>
                    <div className="text-[#62e58f]">Optimal</div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#62e58f]"
                      initial={{ width: "0%" }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1.1, delay: 1.1 }}
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <MiniMetric label="Mood" value="Calm" />
                  <MiniMetric label="Readiness" value="78" />
                </div>

                <div className="rounded-3xl bg-[#62e58f] p-5 text-black">
                  <div className="mb-1 text-xs uppercase text-black/55">Today&apos;s plan</div>
                  <div className="text-xl font-semibold">Quiet Strength</div>
                  <div className="mt-1 text-sm text-black/60">18 min · home workout</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">Face scan</p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Not a program. A response.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-white/55">
            Fitnerd turns mood, energy and biometric signals into one quiet plan that feels possible today.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <CompactFeature title="Mood-aware" text="Reads your current state before recommending anything." />
          <CompactFeature title="Energy-based" text="Adjusts intensity to how ready you actually are." />
          <CompactFeature title="Biometric-driven" text="Uses signals like heart rate, readiness and recovery." />
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-none tracking-tight md:text-7xl">
          Made for the days when you just start.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-white/55">
          No gym pressure. No noisy coaching. Just Fitnerd, right when you need it.
        </p>
        {inviteOpen ? (
          <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-center gap-2">
            <InviteForm
              email={email}
              onEmailChange={setEmail}
              onSubmit={submitWaitlist}
              status={inviteStatus}
              inputId="waitlist-footer"
            />
            {inviteStatus === "error" && <p className="text-sm text-red-300/90">Couldn&apos;t send — try again.</p>}
          </div>
        ) : (
          <button
            type="button"
            onClick={openInvite}
            className="mt-9 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-white/90"
          >
            Request Invite
          </button>
        )}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 px-6 py-8 text-sm text-white/35 md:flex-row">
        <span>Fitnerd</span>
        <span>Invite only · AI-powered personal training</span>
      </footer>
      <CustomVideoPlayer open={videoOpen} onClose={() => setVideoOpen(false)} />
    </main>
  );
}
