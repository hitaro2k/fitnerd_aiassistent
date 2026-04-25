import React from "react";
import { motion } from "framer-motion";

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

export default function FitnerdLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen px-6 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(98,229,143,0.14),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(255,255,255,0.08),transparent_36%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Fitnerd</div>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90">
            Request Invite
          </button>
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-white/90">
                Request Invite
              </button>
              <button className="rounded-full border border-white/15 px-8 py-4 font-medium text-white/80 transition hover:bg-white/[0.06]">
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
              It understands before it pushes.
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
        <button className="mt-9 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-white/90">
          Request Invite
        </button>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 px-6 py-8 text-sm text-white/35 md:flex-row">
        <span>Fitnerd</span>
        <span>Invite only · AI-powered personal training</span>
      </footer>
    </main>
  );
}
