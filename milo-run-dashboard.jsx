import { useState, useEffect } from "react";

const PHASES = [
  {
    id: 0,
    name: "Fase 0",
    subtitle: "Fondasi",
    emoji: "🔵",
    color: "#3B82F6",
    bg: "#EFF6FF",
    weeks: "Minggu 1–3",
    dates: "22 Apr – 11 Mei",
    goal: "Biasain tubuh bergerak rutin sebelum mulai lari",
    target: ["Jalan cepat 40 menit tanpa engap", "Pola makan & tidur mulai diperbaiki", "Turun ~1–2 kg"],
    sessions: [
      { week: "Minggu 1", days: [
        { day: "Senin", activity: "Jalan cepat 30 menit", id: "w1d1" },
        { day: "Rabu", activity: "Jalan cepat 35 menit", id: "w1d2" },
        { day: "Jumat", activity: "Jalan cepat 40 menit", id: "w1d3" },
        { day: "Sabtu", activity: "Stretching / jalan santai", id: "w1d4" },
      ]},
      { week: "Minggu 2", days: [
        { day: "Senin", activity: "Jalan cepat 35 menit", id: "w2d1" },
        { day: "Rabu", activity: "Jalan cepat 40 menit", id: "w2d2" },
        { day: "Jumat", activity: "Jalan cepat 40 menit", id: "w2d3" },
        { day: "Sabtu", activity: "Stretching ringan", id: "w2d4" },
      ]},
      { week: "Minggu 3", days: [
        { day: "Senin", activity: "Jalan cepat 40 menit", id: "w3d1" },
        { day: "Rabu", activity: "Jalan cepat 45 menit", id: "w3d2" },
        { day: "Jumat", activity: "Jalan cepat 45 menit", id: "w3d3" },
        { day: "Sabtu", activity: "Jalan santai + stretching", id: "w3d4" },
      ]},
    ]
  },
  {
    id: 1,
    name: "Fase 1",
    subtitle: "C25K Awal",
    emoji: "🟡",
    color: "#F59E0B",
    bg: "#FFFBEB",
    weeks: "Minggu 4–7",
    dates: "12 Mei – 8 Jun",
    goal: "Kenalkan tubuh ke lari dengan run-walk interval",
    target: ["Lari 5 menit non-stop", "Engap mulai berkurang", "Turun ~2–3 kg total"],
    sessions: [
      { week: "Minggu 4", days: [
        { day: "Senin", activity: "🚶 Jalan 90dtk → 🏃 Lari 60dtk × 8", id: "w4d1" },
        { day: "Rabu", activity: "🚶 Jalan 90dtk → 🏃 Lari 60dtk × 8", id: "w4d2" },
        { day: "Jumat", activity: "🚶 Jalan 90dtk → 🏃 Lari 60dtk × 8", id: "w4d3" },
      ]},
      { week: "Minggu 5", days: [
        { day: "Senin", activity: "🚶 Jalan 90dtk → 🏃 Lari 90dtk × 8", id: "w5d1" },
        { day: "Rabu", activity: "🚶 Jalan 90dtk → 🏃 Lari 90dtk × 8", id: "w5d2" },
        { day: "Jumat", activity: "🚶 Jalan 90dtk → 🏃 Lari 90dtk × 8", id: "w5d3" },
      ]},
      { week: "Minggu 6", days: [
        { day: "Senin", activity: "🚶 Jalan 90dtk → 🏃 Lari 3 menit × 6", id: "w6d1" },
        { day: "Rabu", activity: "🚶 Jalan 90dtk → 🏃 Lari 3 menit × 6", id: "w6d2" },
        { day: "Jumat", activity: "🚶 Jalan 90dtk → 🏃 Lari 3 menit × 6", id: "w6d3" },
      ]},
      { week: "Minggu 7", days: [
        { day: "Senin", activity: "🚶 Jalan 90dtk → 🏃 Lari 5 menit × 4", id: "w7d1" },
        { day: "Rabu", activity: "🚶 Jalan 90dtk → 🏃 Lari 5 menit × 4", id: "w7d2" },
        { day: "Jumat", activity: "🚶 Jalan 90dtk → 🏃 Lari 5 menit × 4", id: "w7d3" },
      ]},
    ]
  },
  {
    id: 2,
    name: "Fase 2",
    subtitle: "Bangun Stamina",
    emoji: "🟠",
    color: "#F97316",
    bg: "#FFF7ED",
    weeks: "Minggu 8–11",
    dates: "9 Jun – 6 Jul",
    goal: "Bangun stamina lari yang sesungguhnya",
    target: ["Lari 20 menit non-stop 🎉", "Pace mulai konsisten", "Turun ~4–5 kg total"],
    sessions: [
      { week: "Minggu 8", days: [
        { day: "Senin", activity: "Lari 8 mnt → Jalan 5 mnt → Lari 8 mnt", id: "w8d1" },
        { day: "Rabu", activity: "Lari 8 mnt → Jalan 5 mnt → Lari 8 mnt", id: "w8d2" },
        { day: "Jumat", activity: "Lari 8 mnt → Jalan 5 mnt → Lari 8 mnt", id: "w8d3" },
      ]},
      { week: "Minggu 9", days: [
        { day: "Senin", activity: "Lari 10 mnt → Jalan 3 mnt → Lari 10 mnt", id: "w9d1" },
        { day: "Rabu", activity: "Lari 10 mnt → Jalan 3 mnt → Lari 10 mnt", id: "w9d2" },
        { day: "Jumat", activity: "Lari 10 mnt → Jalan 3 mnt → Lari 10 mnt", id: "w9d3" },
      ]},
      { week: "Minggu 10", days: [
        { day: "Senin", activity: "🔥 Lari 20 menit NON-STOP!", id: "w10d1" },
        { day: "Rabu", activity: "🔥 Lari 20 menit NON-STOP!", id: "w10d2" },
        { day: "Jumat", activity: "🔥 Lari 20 menit NON-STOP!", id: "w10d3" },
      ]},
      { week: "Minggu 11", days: [
        { day: "Senin", activity: "Lari 22–25 menit non-stop", id: "w11d1" },
        { day: "Rabu", activity: "Lari 22–25 menit non-stop", id: "w11d2" },
        { day: "Jumat", activity: "Lari 22–25 menit non-stop", id: "w11d3" },
      ]},
    ]
  },
  {
    id: 3,
    name: "Fase 3",
    subtitle: "Build Up 5K",
    emoji: "🔴",
    color: "#EF4444",
    bg: "#FEF2F2",
    weeks: "Minggu 12–16",
    dates: "7 Jul – 10 Agt",
    goal: "Capai & nyaman di jarak 5K",
    target: ["Finish 5K pertama kamu! 🏆", "Waktu 45–50 menit pun oke", "Turun ~6–7 kg total"],
    sessions: [
      { week: "Minggu 12", days: [
        { day: "Senin", activity: "Lari 25 menit", id: "w12d1" },
        { day: "Rabu", activity: "Lari 25 menit", id: "w12d2" },
        { day: "Jumat", activity: "Lari 25 menit", id: "w12d3" },
      ]},
      { week: "Minggu 13", days: [
        { day: "Senin", activity: "Lari 28 menit", id: "w13d1" },
        { day: "Rabu", activity: "Lari 28 menit", id: "w13d2" },
        { day: "Jumat", activity: "Lari 28 menit", id: "w13d3" },
      ]},
      { week: "Minggu 14", days: [
        { day: "Senin", activity: "⭐ LARI 5K PERTAMA! (boleh mix jalan)", id: "w14d1" },
        { day: "Rabu", activity: "Lari 30 menit", id: "w14d2" },
        { day: "Jumat", activity: "⭐ Lari 5K lagi!", id: "w14d3" },
      ]},
      { week: "Minggu 15", days: [
        { day: "Senin", activity: "Lari 5K, coba perbaiki waktu", id: "w15d1" },
        { day: "Rabu", activity: "Lari 30 menit", id: "w15d2" },
        { day: "Jumat", activity: "Lari 5K", id: "w15d3" },
      ]},
      { week: "Minggu 16", days: [
        { day: "Senin", activity: "Lari 5K konsisten", id: "w16d1" },
        { day: "Rabu", activity: "Lari 5K konsisten", id: "w16d2" },
        { day: "Jumat", activity: "Lari 5K — catat waktu terbaikmu!", id: "w16d3" },
      ]},
    ]
  },
  {
    id: 4,
    name: "Fase 4",
    subtitle: "Sharpening",
    emoji: "🟣",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    weeks: "Minggu 17–19",
    dates: "11 Agt – 31 Agt",
    goal: "Perkuat mental & fisik, simulasi race day",
    target: ["Simulasi race day lengkap", "Pakai sepatu & baju event", "Badan siap & mental siap"],
    sessions: [
      { week: "Minggu 17", days: [
        { day: "Senin", activity: "Lari 5K", id: "w17d1" },
        { day: "Rabu", activity: "Interval ringan: 400m cepat × 4", id: "w17d2" },
        { day: "Jumat", activity: "Lari 5K", id: "w17d3" },
      ]},
      { week: "Minggu 18", days: [
        { day: "Senin", activity: "Lari 3K ringan", id: "w18d1" },
        { day: "Rabu", activity: "🎽 SIMULASI RACE: Lari 5K pagi, full outfit!", id: "w18d2" },
        { day: "Jumat", activity: "Lari 3K ringan", id: "w18d3" },
      ]},
      { week: "Minggu 19 (Tapering)", days: [
        { day: "Senin", activity: "Lari ringan 3K", id: "w19d1" },
        { day: "Rabu", activity: "Jalan cepat + stretching", id: "w19d2" },
        { day: "Jumat", activity: "Lari santai 2K — ISTIRAHAT CUKUP", id: "w19d3" },
      ]},
    ]
  },
  {
    id: 5,
    name: "Race Week",
    subtitle: "🏁 Milo Run",
    emoji: "⚪",
    color: "#10B981",
    bg: "#ECFDF5",
    weeks: "Minggu 20–21",
    dates: "1–15 Sep",
    goal: "Jaga kondisi, jangan forsir",
    target: ["Tidur & makan teratur", "H-1 istirahat total + karbo cukup", "FINISH MILO RUN 5K! 🎉"],
    sessions: [
      { week: "Minggu 20", days: [
        { day: "Senin", activity: "Lari ringan 2–3K", id: "w20d1" },
        { day: "Rabu", activity: "Lari ringan 2–3K", id: "w20d2" },
        { day: "Jumat", activity: "Istirahat total / jalan santai", id: "w20d3" },
      ]},
      { week: "Race Week", days: [
        { day: "H-3", activity: "Lari ringan 2K", id: "raced1" },
        { day: "H-2", activity: "Istirahat, makan karbo", id: "raced2" },
        { day: "H-1", activity: "Istirahat TOTAL. Tidur cukup!", id: "raced3" },
        { day: "RACE DAY 🏆", activity: "Mulai pelan, jaga napas, ENJOY THE RUN!", id: "raced4" },
      ]},
    ]
  }
];

const WEIGHT_MILESTONES = [
  { label: "Start", weight: 100, date: "Apr", color: "#94A3B8" },
  { label: "Fase 1", weight: 98, date: "Mei", color: "#F59E0B" },
  { label: "Fase 2", weight: 96, date: "Jun", color: "#F97316" },
  { label: "Fase 3", weight: 94, date: "Jul-Agt", color: "#EF4444" },
  { label: "Race Day", weight: 92, date: "Sep", color: "#10B981" },
];

export default function MiloRunDashboard() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem("milorun_checklist");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [activePhase, setActivePhase] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("milorun_checklist", JSON.stringify(checked));
    } catch {}
  }, [checked]);

  const toggle = (id) => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
    if (!checked[id]) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  const totalSessions = PHASES.reduce((acc, p) => acc + p.sessions.reduce((a, s) => a + s.days.length, 0), 0);
  const completedSessions = Object.values(checked).filter(Boolean).length;
  const progressPct = Math.round((completedSessions / totalSessions) * 100);

  const phase = PHASES[activePhase];
  const phaseTotal = phase.sessions.reduce((a, s) => a + s.days.length, 0);
  const phaseCompleted = phase.sessions.reduce((a, s) => a + s.days.filter(d => checked[d.id]).length, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#F1F5F9",
      padding: "0",
    }}>
      {showConfetti && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: "none", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "4rem", animation: "pop 0.8s ease-out forwards"
        }}>
          ✅
          <style>{`@keyframes pop { 0%{transform:scale(0);opacity:1} 70%{transform:scale(1.5);opacity:1} 100%{transform:scale(2);opacity:0} }`}</style>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A5F 0%, #0F2744 100%)",
        borderBottom: "1px solid rgba(59,130,246,0.3)",
        padding: "2rem 1.5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Training Dashboard
              </div>
              <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold", color: "#F1F5F9", lineHeight: 1.2 }}>
                Milo Run 5K 🏃
              </h1>
              <div style={{ marginTop: "0.4rem", fontSize: "0.85rem", color: "#94A3B8" }}>
                Start: 22 April 2026 &nbsp;→&nbsp; Race Day: ~15 September 2026
              </div>
            </div>
            <div style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.4)",
              borderRadius: "12px",
              padding: "0.75rem 1.25rem",
              textAlign: "center",
              minWidth: 100,
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10B981", lineHeight: 1 }}>{progressPct}%</div>
              <div style={{ fontSize: "0.7rem", color: "#6EE7B7", marginTop: "0.2rem" }}>Overall</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div style={{ marginTop: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94A3B8", marginBottom: "0.4rem" }}>
              <span>{completedSessions} sesi selesai</span>
              <span>{totalSessions} total sesi</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{
                width: `${progressPct}%`, height: "100%", borderRadius: 99,
                background: "linear-gradient(90deg, #3B82F6, #10B981)",
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem" }}>

        {/* Weight milestone tracker */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#94A3B8", textTransform: "uppercase", marginBottom: "1rem" }}>
            Target Berat Badan
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "0.5rem" }}>
            {WEIGHT_MILESTONES.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  fontSize: "0.65rem", color: m.color, fontWeight: "bold",
                  marginBottom: "0.3rem",
                }}>{m.weight} kg</div>
                <div style={{
                  height: `${(105 - m.weight) * 6}px`,
                  background: `linear-gradient(180deg, ${m.color}88, ${m.color}33)`,
                  borderRadius: "6px 6px 0 0",
                  border: `1px solid ${m.color}55`,
                  minHeight: 12,
                  transition: "height 0.3s",
                }} />
                <div style={{ fontSize: "0.6rem", color: "#64748B", marginTop: "0.3rem" }}>{m.date}</div>
                <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase selector */}
        <div style={{
          display: "flex", gap: "0.5rem", overflowX: "auto",
          paddingBottom: "0.5rem", marginBottom: "1.25rem",
          scrollbarWidth: "none",
        }}>
          {PHASES.map((p, i) => {
            const pTotal = p.sessions.reduce((a, s) => a + s.days.length, 0);
            const pDone = p.sessions.reduce((a, s) => a + s.days.filter(d => checked[d.id]).length, 0);
            const isActive = activePhase === i;
            return (
              <button key={i} onClick={() => setActivePhase(i)} style={{
                flexShrink: 0,
                padding: "0.5rem 0.85rem",
                borderRadius: 99,
                border: isActive ? `2px solid ${p.color}` : "2px solid rgba(255,255,255,0.1)",
                background: isActive ? `${p.color}22` : "rgba(255,255,255,0.04)",
                color: isActive ? p.color : "#94A3B8",
                fontSize: "0.75rem",
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <span>{p.emoji}</span>
                <span style={{ fontWeight: isActive ? "bold" : "normal" }}>{p.name}</span>
                <span style={{
                  background: pDone === pTotal && pTotal > 0 ? "#10B98133" : "rgba(255,255,255,0.1)",
                  color: pDone === pTotal && pTotal > 0 ? "#10B981" : "#64748B",
                  borderRadius: 99, padding: "0 0.4rem", fontSize: "0.65rem",
                }}>
                  {pDone}/{pTotal}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase detail */}
        <div style={{
          background: `${phase.color}11`,
          border: `1px solid ${phase.color}44`,
          borderRadius: 16,
          padding: "1.25rem",
          marginBottom: "1.25rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{phase.emoji}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#F1F5F9" }}>
                    {phase.name} — {phase.subtitle}
                  </h2>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{phase.dates}</div>
                </div>
              </div>
              <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "#CBD5E1" }}>{phase.goal}</p>
            </div>
            <div style={{
              background: "rgba(0,0,0,0.2)", borderRadius: 12,
              padding: "0.6rem 1rem", textAlign: "center", minWidth: 70
            }}>
              <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: phase.color }}>{phaseCompleted}/{phaseTotal}</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>sesi</div>
            </div>
          </div>

          {/* Phase progress */}
          <div style={{ marginTop: "1rem" }}>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 6 }}>
              <div style={{
                width: `${phaseTotal > 0 ? (phaseCompleted / phaseTotal) * 100 : 0}%`,
                height: "100%", borderRadius: 99,
                background: phase.color,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {/* Targets */}
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {phase.target.map((t, i) => (
              <div key={i} style={{
                fontSize: "0.72rem", color: "#CBD5E1",
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${phase.color}33`,
                borderRadius: 99, padding: "0.25rem 0.75rem",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}>
                <span style={{ color: phase.color }}>→</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Sessions checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {phase.sessions.map((s, si) => (
            <div key={si} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              overflow: "hidden",
            }}>
              <div style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#94A3B8", letterSpacing: "0.05em" }}>
                  {s.week}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                  {s.days.filter(d => checked[d.id]).length}/{s.days.length} ✓
                </span>
              </div>
              <div style={{ padding: "0.5rem" }}>
                {s.days.map((d, di) => {
                  const done = !!checked[d.id];
                  return (
                    <div
                      key={di}
                      onClick={() => toggle(d.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.65rem 0.75rem",
                        borderRadius: 10,
                        cursor: "pointer",
                        transition: "background 0.15s",
                        background: done ? `${phase.color}15` : "transparent",
                        marginBottom: di < s.days.length - 1 ? "0.25rem" : 0,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = done ? `${phase.color}22` : "rgba(255,255,255,0.05)"}
                      onMouseLeave={e => e.currentTarget.style.background = done ? `${phase.color}15` : "transparent"}
                    >
                      {/* Checkbox */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        border: done ? `2px solid ${phase.color}` : "2px solid rgba(255,255,255,0.2)",
                        background: done ? phase.color : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                        fontSize: "0.75rem",
                      }}>
                        {done && <span style={{ color: "#fff" }}>✓</span>}
                      </div>
                      {/* Day label */}
                      <div style={{
                        minWidth: 52, fontSize: "0.7rem",
                        color: done ? phase.color : "#64748B",
                        fontWeight: done ? "bold" : "normal",
                        transition: "color 0.2s",
                        flexShrink: 0,
                      }}>
                        {d.day}
                      </div>
                      {/* Activity */}
                      <div style={{
                        fontSize: "0.82rem",
                        color: done ? "#64748B" : "#CBD5E1",
                        textDecoration: done ? "line-through" : "none",
                        transition: "all 0.2s",
                        lineHeight: 1.3,
                      }}>
                        {d.activity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Medical reminder */}
        <div style={{
          marginTop: "1.5rem",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 14,
          padding: "1rem 1.25rem",
          display: "flex", gap: "0.75rem", alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🩺</span>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "#FCA5A5", marginBottom: "0.25rem" }}>
              Reminder Medis
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: 1.5 }}>
              Kalau engap nggak membaik atau makin parah saat latihan, segera konsultasi dokter. Progress yang baik = engap makin berkurang dari minggu ke minggu.
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.72rem", color: "#334155", paddingBottom: "1rem" }}>
          Progress disimpan otomatis di browser ini ✦ Klik sesi untuk tandai selesai
        </div>
      </div>
    </div>
  );
}
