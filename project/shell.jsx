// ============================================================
// NutriCoach — Shell: BrandMark, Sidebar, Topbar, helpers
// ============================================================
/* global React, I */
const { useState } = React;

// ---- Brand mark (abstract concentric arcs) -----------------
const BrandMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity=".25"/>
    <path d="M16 4a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55"/>
    <path d="M16 9a7 7 0 0 1 0 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2" fill="currentColor"/>
  </svg>
);

// ---- Sidebar ----------------------------------------------
const Sidebar = ({ current, onNav, sessionsCount, onSignOut }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <I.home /> },
    { id: "coaching",  label: "Coaching",  icon: <I.chat />, count: sessionsCount },
    { id: "resources", label: "Resources", icon: <I.library /> },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" style={{ color: "var(--amber)" }}>
          <BrandMark />
        </div>
        <span className="brand-name">NutriCoach</span>
      </div>

      <div className="nav-section-label">Coaching</div>
      <div className="nav-section">
        {items.map(item => (
          <button
            key={item.id}
            className={`nav-item ${current === item.id ? "active" : ""}`}
            onClick={() => onNav(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.count != null && <span className="nav-count">{item.count}</span>}
          </button>
        ))}
      </div>

      <div className="nav-section-label">This week</div>
      <div className="card" style={{ padding: "14px 14px 16px", marginBottom: 8 }}>
        <div className="row between" style={{ marginBottom: 10 }}>
          <span className="eyebrow">Check-ins</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>5 of 7</span>
        </div>
        <div className="streak">
          {["M","T","W","T","F","S","S"].map((d, i) => {
            const on = window.NC_DATA.weekStreak[i];
            const today = window.NC_DATA.todayIndex === i;
            return <span key={i} className={`day ${on ? "on" : ""} ${today ? "today" : ""}`} title={d}></span>;
          })}
        </div>
        <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.45 }}>
          You showed up 5 days this week. That's the work.
        </p>
      </div>

      <div style={{ flex: 1 }}></div>

      <button className="nav-item" onClick={onSignOut} style={{ color: "var(--ink-3)" }}>
        <span className="nav-icon"><I.logout /></span>
        <span>Sign out</span>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderTop: "1px solid var(--hairline)", marginTop: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "var(--ink)", color: "#efe7d4",
          display: "grid", placeItems: "center",
          fontFamily: "var(--serif)", fontSize: 14, letterSpacing: "-0.01em",
        }}>M</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{window.NC_DATA.user.fullName}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Day {window.NC_DATA.user.joinedDays}</div>
        </div>
      </div>
    </aside>
  );
};

// ---- Topbar ----------------------------------------------
const Topbar = ({ crumb, right }) => (
  <div className="topbar">
    <div className="topbar-left">
      <div className="crumb">{crumb}</div>
    </div>
    <div className="topbar-right">
      {right}
      <button className="btn btn-subtle btn-sm" title="Search">
        <I.search size={14} />
      </button>
      <button className="btn btn-subtle btn-sm" title="Notifications">
        <I.bell size={14} />
      </button>
    </div>
  </div>
);

// ---- CoachMark (visual abstract coach identity) -----------
const CoachMark = ({ size = "md" }) => {
  const cls = size === "lg" ? "coach-mark lg" : size === "xs" ? "coach-mark xs" : "coach-mark";
  return <div className={cls} aria-label="Coach"></div>;
};

// ---- Progress ring (sage) ---------------------------------
const ProgressRing = ({ value = 0.5, size = 64, stroke = 5 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} className="ring-track"/>
      <circle
        cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
        className="ring-fill"
        strokeDasharray={`${c * value} ${c}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  );
};

// ---- Step row (checkable action item) ---------------------
const StepRow = ({ step, onToggle }) => (
  <div className="step-row">
    <div className={`step-check ${step.done ? "done" : ""}`} onClick={onToggle}>
      {step.done && <I.check size={12} stroke={2.5} />}
    </div>
    <div className="step-text">
      <div className={`step-title ${step.done ? "done" : ""}`}>{step.text}</div>
    </div>
  </div>
);

// ---- Goal block ------------------------------------------
const GoalBlock = ({ goal }) => (
  <div className="card card-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div className="row between" style={{ alignItems: "flex-start" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{goal.cadence}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, lineHeight: 1.3, color: "var(--ink)", letterSpacing: "-0.01em" }}>
          {goal.title}
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 8, lineHeight: 1.5 }}>{goal.detail}</p>
      </div>
      <ProgressRing value={goal.progress} size={56} stroke={4}/>
    </div>
    <div className="progress-bar"><div style={{ width: `${goal.progress * 100}%` }}></div></div>
    <div className="row between" style={{ fontSize: 12, color: "var(--ink-3)" }}>
      <span><span className="dot" style={{ background: "var(--sage)", marginRight: 6 }}></span>{Math.round(goal.progress * 100)}% on track</span>
      <span style={{ fontFamily: "var(--mono)" }}>last 4 weeks</span>
    </div>
  </div>
);

Object.assign(window, { BrandMark, Sidebar, Topbar, CoachMark, ProgressRing, StepRow, GoalBlock });
