// ============================================================
// NutriCoach — Component Library on Design Canvas
// ============================================================
/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard, I, CoachMark, BrandMark, ProgressRing, StepRow, GoalBlock */

const { useState: useStateCL } = React;

// Apply default palette tokens directly (no Tweaks panel here).
const applyDefaults = () => {
  const root = document.documentElement;
  Object.entries({
    "--bg": "#f1ead9", "--bg-soft": "#ebe3cf", "--surface": "#fbf7ee", "--surface-2": "#f6efde",
    "--hairline": "#e5dcc4", "--hairline-strong": "#d8cdb1",
    "--ink": "#1a2435", "--ink-2": "#2f3b50", "--ink-3": "#5b6577", "--ink-4": "#8a8f9c",
    "--sage": "#7e9479", "--sage-soft": "#d8e1d1", "--sage-ink": "#4a5e46",
    "--amber": "#c97a4a", "--amber-hover": "#b86a3b", "--amber-soft": "#efd6c2", "--amber-ink": "#7a3f1b",
  }).forEach(([k, v]) => root.style.setProperty(k, v));
};
applyDefaults();

// Wrapper to set inner background per artboard
const Frame = ({ children, padding = 28, bg = "var(--bg)", style = {} }) => (
  <div style={{ background: bg, padding, height: "100%", overflow: "auto", ...style }}>{children}</div>
);

// ========== FOUNDATIONS ==========
const Foundations_Palette = () => (
  <Frame>
    <div className="lib-label">Palette · Warm Sand</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
      {[
        { name: "Ink (navy)", role: "Structure, text", hex: "#1a2435", bg: "#1a2435", fg: "#efe7d4" },
        { name: "Bg (sand)", role: "App background", hex: "#f1ead9", bg: "#f1ead9", fg: "#1a2435" },
        { name: "Sage", role: "Progress only", hex: "#7e9479", bg: "#7e9479", fg: "#fff" },
        { name: "Amber", role: "Primary CTA", hex: "#c97a4a", bg: "#c97a4a", fg: "#fff" },
      ].map((s, i) => (
        <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--hairline)" }}>
          <div style={{ background: s.bg, color: s.fg, padding: "32px 16px", fontFamily: "var(--mono)", fontSize: 11 }}>
            {s.hex}
          </div>
          <div style={{ padding: "12px 14px", background: "var(--surface)" }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.role}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="lib-label">Neutrals</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
      {[
        { name: "surface", hex: "#fbf7ee" },
        { name: "surface-2", hex: "#f6efde" },
        { name: "hairline", hex: "#e5dcc4" },
        { name: "ink-3", hex: "#5b6577" },
        { name: "amber-soft", hex: "#efd6c2" },
        { name: "sage-soft", hex: "#d8e1d1" },
      ].map((s, i) => (
        <div key={i}>
          <div style={{ height: 56, background: s.hex, borderRadius: 8, border: "1px solid var(--hairline)" }}></div>
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginTop: 6 }}>{s.name}</div>
          <div style={{ fontSize: 10.5, fontFamily: "var(--mono)", color: "var(--ink-4)" }}>{s.hex}</div>
        </div>
      ))}
    </div>
  </Frame>
);

const Foundations_Type = () => (
  <Frame>
    <div className="lib-label">Type system</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>H1 / Newsreader · 42</div>
        <h1 style={{ fontSize: 42 }}>Sustainable change, gently.</h1>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>H2 / Newsreader · 28</div>
        <h2>Your next steps from session 7</h2>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>H3 / Newsreader · 20</div>
        <h3>What we're keeping warm</h3>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>Body / Geist · 14.5</div>
        <p style={{ fontSize: 14.5, maxWidth: 560 }}>The protein bars worked twice this week — once on the way to a 10am meeting, once before a workshop. The pattern is preparation, not willpower.</p>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>Serif quote / Newsreader · 16 italic</div>
        <p className="serif-italic" style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: 560 }}>"That's worth noticing. What made it work?"</p>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", marginBottom: 4 }}>Eyebrow / JetBrains Mono · 10.5</div>
        <div className="eyebrow">From session 7 · most recent</div>
      </div>
    </div>
  </Frame>
);

const Foundations_Spacing = () => (
  <Frame>
    <div className="lib-label">Radii, shadows, density</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
      {[
        { name: "sm · 8", r: 8 },
        { name: "md · 12", r: 12 },
        { name: "lg · 18", r: 18 },
        { name: "xl · 24", r: 24 },
      ].map((r, i) => (
        <div key={i}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--hairline)", height: 64, borderRadius: r.r }}></div>
          <div style={{ fontSize: 11.5, fontFamily: "var(--mono)", marginTop: 6, color: "var(--ink-3)" }}>{r.name}</div>
        </div>
      ))}
    </div>

    <div className="lib-label">Shadows</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: "var(--surface)", height: 80, borderRadius: 14, boxShadow: `var(--shadow-${i})` }}></div>
      ))}
    </div>

    <div className="lib-label">Spacing scale (px)</div>
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
      {[4, 8, 12, 16, 20, 24, 32, 48].map(s => (
        <div key={s} style={{ textAlign: "center" }}>
          <div style={{ width: s, height: 48, background: "var(--ink)", borderRadius: 2 }}></div>
          <div style={{ fontSize: 10.5, fontFamily: "var(--mono)", marginTop: 6, color: "var(--ink-3)" }}>{s}</div>
        </div>
      ))}
    </div>
  </Frame>
);

const Foundations_Brand = () => (
  <Frame>
    <div className="lib-label">Brand mark & coach identity (abstract — no photos)</div>
    <div style={{ display: "flex", gap: 32, alignItems: "center", marginBottom: 32, padding: "20px 0" }}>
      <div style={{ color: "var(--amber)" }}><BrandMark size={64}/></div>
      <div style={{ color: "var(--amber)" }}><BrandMark size={32}/></div>
      <div style={{ color: "var(--ink)" }}><BrandMark size={24}/></div>
    </div>
    <div className="lib-label">Coach mark (abstract — no avatar)</div>
    <div style={{ display: "flex", gap: 32, alignItems: "center", padding: "16px 0 32px" }}>
      <CoachMark size="lg" />
      <CoachMark size="md" />
      <CoachMark size="xs" />
    </div>
    <div style={{ fontSize: 13, color: "var(--ink-3)", maxWidth: 480, lineHeight: 1.55, fontFamily: "var(--serif)" }}>
      Concentric arcs: structure, presence, focus. Always abstract — the coach is a process, not a face. Amber rings, beige interior, never on the user's photo.
    </div>
  </Frame>
);

// ========== BUTTONS ==========
const Buttons = () => (
  <Frame>
    <div className="lib-label">Primary · Secondary · Ghost · Subtle</div>
    <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
      <button className="btn btn-primary">Begin session</button>
      <button className="btn btn-secondary">Open transcript</button>
      <button className="btn btn-ghost">Save for later</button>
      <button className="btn btn-subtle">Skip</button>
    </div>

    <div className="lib-label">Sizes (sm · md · lg)</div>
    <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
      <button className="btn btn-primary btn-sm">Send</button>
      <button className="btn btn-primary">Send</button>
      <button className="btn btn-primary btn-lg">Send <I.arrowRight size={14}/></button>
    </div>

    <div className="lib-label">With icons</div>
    <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
      <button className="btn btn-primary"><I.plus size={14}/> New session</button>
      <button className="btn btn-ghost"><I.download size={14}/> Download PDF</button>
      <button className="btn btn-subtle btn-sm"><I.refresh size={13}/> Reset</button>
    </div>

    <div className="lib-label">Pills · chips · tags</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <span className="tag">Behavior change</span>
      <span className="tag tag-sage tag-dot">On track</span>
      <span className="tag tag-amber"><span className="dot" style={{ background: "var(--amber)" }}></span>Next up</span>
      <span className="tag tag-ink">Session 7</span>
      <button className="chip">A small win</button>
      <button className="chip">Let's revisit lunches</button>
    </div>
  </Frame>
);

// ========== CARDS ==========
const Cards = () => (
  <Frame>
    <div className="lib-label">Card · info / data / action</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Info</div>
        <h4 style={{ marginBottom: 8 }}>What we'll cover</h4>
        <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>A brief intake, the shape of your days, three goals to keep warm.</p>
      </div>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Data</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1 }}>7</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 6 }}>sessions completed</div>
      </div>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Action</div>
        <h4 style={{ marginBottom: 8 }}>Begin check-in</h4>
        <button className="btn btn-primary btn-sm">Start <I.arrowRight size={12}/></button>
      </div>
    </div>

    <div className="lib-label">Card · dark variant (featured)</div>
    <div className="card-dark" style={{ padding: 22 }}>
      <span className="tag tag-amber" style={{ marginBottom: 12 }}>Featured</span>
      <h4 style={{ color: "#f7efdb", marginTop: 12, marginBottom: 6 }}>A gentler approach to evening eating</h4>
      <p style={{ fontSize: 13, color: "rgba(247,239,219,0.7)", lineHeight: 1.5 }}>Why willpower fails at 9pm — and what to try instead.</p>
    </div>
  </Frame>
);

// ========== INPUTS ==========
const Inputs = () => (
  <Frame>
    <div className="lib-label">Inputs · text · textarea · checkbox</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18, maxWidth: 380 }}>
      <div>
        <label className="field-label">First name</label>
        <input className="input" defaultValue="Mira" />
      </div>
      <div>
        <label className="field-label">Email</label>
        <input className="input" placeholder="you@example.com" />
      </div>
      <div>
        <label className="field-label">What does a typical day look like?</label>
        <textarea className="input" style={{ height: 100, padding: 14, lineHeight: 1.5 }} placeholder="Coffee on the way out, sometimes skip lunch…"></textarea>
      </div>
    </div>

    <div className="lib-label">Segmented · search</div>
    <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
      <div className="segmented">
        <button className="active">All</button>
        <button>Sessions</button>
        <button>Check-ins</button>
      </div>
      <div className="chat-input" style={{ width: 320, padding: "8px 10px 8px 16px" }}>
        <I.search size={14} style={{ color: "var(--ink-3)" }}/>
        <input placeholder="Search sessions…" style={{ height: 28 }}/>
      </div>
    </div>
  </Frame>
);

// ========== SESSION SUMMARY ==========
const SessionSummary = () => {
  const d = window.NC_DATA;
  const [steps, setSteps] = useStateCL(d.lastSession.actionSteps);
  const toggle = (id) => setSteps(s => s.map(x => x.id === id ? { ...x, done: !x.done } : x));
  return (
    <Frame>
      <div className="lib-label">Session summary block</div>
      <div className="card card-pad" style={{ marginBottom: 14 }}>
        <div className="row between" style={{ marginBottom: 14 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Most recent · session 7</div>
            <h3>{d.lastSession.title}</h3>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>Yesterday · 18 min</div>
          </div>
          <span className="tag tag-sage">Check-in</span>
        </div>
        <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 16 }}>
          {d.lastSession.summary}
        </p>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Action steps</div>
        {steps.slice(0, 3).map(s => <StepRow key={s.id} step={s} onToggle={() => toggle(s.id)} />)}
      </div>
    </Frame>
  );
};

// ========== GOAL BLOCK ==========
const GoalsLib = () => (
  <Frame>
    <div className="lib-label">Goal block (with sage progress)</div>
    <GoalBlock goal={window.NC_DATA.goals[0]} />
  </Frame>
);

// ========== CHAT ==========
const ChatLib = () => (
  <Frame padding={0}>
    <div style={{ padding: 22 }}>
      <div className="lib-label">Chat — bubble / minimal / paper</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: "1px solid var(--hairline)" }}>
      {["bubble", "minimal", "paper"].map(style => (
        <div key={style} className={`chat-stream chat-style-${style}`} style={{ padding: 18, borderRight: style !== "paper" ? "1px solid var(--hairline)" : 0, height: 380, gap: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>{style}</div>
          <div className="msg msg-coach">
            <CoachMark size="xs" />
            <div className="bubble" style={{ fontSize: 13 }}>What made it work this time?</div>
          </div>
          <div className="msg msg-user">
            <div className="bubble" style={{ fontSize: 13 }}>The bars were already packed. I didn't have to decide.</div>
          </div>
          <div className="msg msg-coach">
            <CoachMark size="xs" />
            <div className="bubble" style={{ fontSize: 13 }}>That's the principle: remove decisions from the moment of friction.</div>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

// ========== PROGRESS ==========
const ProgressLib = () => (
  <Frame>
    <div className="lib-label">Progress widgets · sage only</div>
    <div style={{ display: "flex", gap: 28, alignItems: "center", marginBottom: 22 }}>
      <ProgressRing value={0.85} size={64} stroke={5}/>
      <ProgressRing value={0.62} size={48} stroke={4}/>
      <ProgressRing value={0.45} size={36} stroke={3.5}/>
    </div>
    <div className="lib-label">Bar</div>
    <div className="progress-bar" style={{ marginBottom: 18 }}><div style={{ width: "62%" }}></div></div>
    <div className="lib-label">Streak · weekly</div>
    <div className="streak" style={{ marginBottom: 18 }}>
      {window.NC_DATA.weekStreak.map((on, i) => (
        <span key={i} className={`day ${on ? "on" : ""} ${i === 6 ? "today" : ""}`}></span>
      ))}
    </div>
    <div className="lib-label">Milestone</div>
    <div className="encouragement">
      <div className="encouragement-mark"><I.leaf size={16}/></div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>12 days of consistency</div>
        <div style={{ fontSize: 12, color: "var(--ink-3)" }}>That's what builds the habit.</div>
      </div>
    </div>
  </Frame>
);

// ========== SIDEBAR NAV ==========
const NavLib = () => (
  <Frame padding={0} bg="var(--bg)">
    <div style={{ padding: 18 }}>
      <div className="brand">
        <div className="brand-mark" style={{ color: "var(--amber)" }}><BrandMark /></div>
        <span className="brand-name">NutriCoach</span>
      </div>
      <div className="nav-section-label">Coaching</div>
      <div className="nav-section">
        <button className="nav-item active"><span className="nav-icon"><I.home /></span><span>Dashboard</span></button>
        <button className="nav-item"><span className="nav-icon"><I.chat /></span><span>Coaching</span><span className="nav-count">7</span></button>
        <button className="nav-item"><span className="nav-icon"><I.library /></span><span>Resources</span></button>
      </div>
      <div className="nav-section-label">This week</div>
      <div className="card" style={{ padding: "14px 14px 16px" }}>
        <div className="row between" style={{ marginBottom: 10 }}>
          <span className="eyebrow">Check-ins</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>5 of 7</span>
        </div>
        <div className="streak">
          {window.NC_DATA.weekStreak.map((on, i) => (
            <span key={i} className={`day ${on ? "on" : ""} ${i === 6 ? "today" : ""}`}></span>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

// ========== RESOURCE CARD ==========
const ResourceLib = () => {
  const r = window.NC_DATA.resources[0];
  return (
    <Frame>
      <div className="lib-label">Resource card</div>
      <div className="resource-card" style={{ maxWidth: 280 }}>
        <div className="resource-thumb">
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "var(--surface)", border: "1px solid var(--hairline)",
            display: "grid", placeItems: "center", color: "var(--amber)",
          }}><I.fileText size={16}/></div>
          <div style={{ position: "absolute", top: 12, left: 12 }}><span className="tag">{r.kind}</span></div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>{r.tag}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.3 }}>{r.title}</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6 }}>{r.desc}</p>
        </div>
        <div className="row between" style={{ paddingTop: 8, borderTop: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)", fontFamily: "var(--mono)" }}>{r.pages} pp</span>
          <button className="btn btn-subtle btn-sm"><I.download size={12}/> Get</button>
        </div>
      </div>
    </Frame>
  );
};

// ========== SESSION HISTORY ROW ==========
const HistoryLib = () => (
  <Frame>
    <div className="lib-label">Session history list</div>
    <div className="card" style={{ padding: 8 }}>
      {window.NC_DATA.sessions.slice(0, 4).map((s, i) => (
        <div key={s.id} style={{
          padding: "12px 14px",
          borderRadius: 10,
          background: i === 0 ? "var(--surface-2)" : "transparent",
          borderBottom: i < 3 ? "1px solid var(--hairline)" : 0,
          marginBottom: i === 0 ? 4 : 0,
        }}>
          <div className="row between" style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)" }}>{s.date}</span>
            <span className={`tag ${s.type === "check-in" ? "tag-sage" : s.type === "intake" ? "tag-amber" : "tag-ink"}`} style={{ fontSize: 10.5, padding: "2px 8px" }}>
              {s.type === "check-in" ? "Check-in" : s.type === "intake" ? "Intake" : "Session"}
            </span>
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 14, letterSpacing: "-0.005em", marginBottom: 2 }}>{s.title}</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4 }}>{s.preview}</div>
        </div>
      ))}
    </div>
  </Frame>
);

// ========== ENCOURAGEMENT ==========
const EncouragementLib = () => (
  <Frame>
    <div className="lib-label">Encouragement banner · behavior-change cue</div>
    <div className="encouragement" style={{ marginBottom: 12 }}>
      <div className="encouragement-mark"><I.leaf size={18}/></div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>You've been consistent for 12 days.</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Not perfect — present. That's what builds the habit.</div>
      </div>
    </div>
    <div className="encouragement" style={{ background: "var(--ink)", color: "#efe7d4", border: 0 }}>
      <div className="encouragement-mark" style={{ background: "rgba(247,239,219,0.12)", color: "#efe7d4" }}>
        <I.sparkle size={18}/>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#f7efdb" }}>A small win this week</div>
        <div style={{ fontSize: 12.5, color: "rgba(247,239,219,0.7)" }}>The protein bar trick worked twice. Worth naming.</div>
      </div>
    </div>
  </Frame>
);

// ============================================================
// CANVAS
// ============================================================
const App = () => (
  <DesignCanvas>
    <DCSection id="foundations" title="Foundations" subtitle="Color, type, spacing, brand">
      <DCArtboard id="palette" label="Palette" width={600} height={400}><Foundations_Palette /></DCArtboard>
      <DCArtboard id="type" label="Type system" width={600} height={500}><Foundations_Type /></DCArtboard>
      <DCArtboard id="spacing" label="Radii · shadows · spacing" width={520} height={400}><Foundations_Spacing /></DCArtboard>
      <DCArtboard id="brand" label="Brand & coach identity" width={520} height={400}><Foundations_Brand /></DCArtboard>
    </DCSection>

    <DCSection id="atoms" title="Atoms" subtitle="Buttons, inputs, tags">
      <DCArtboard id="buttons" label="Buttons & pills" width={520} height={400}><Buttons /></DCArtboard>
      <DCArtboard id="inputs" label="Inputs & segmented" width={520} height={400}><Inputs /></DCArtboard>
      <DCArtboard id="cards" label="Cards" width={760} height={360}><Cards /></DCArtboard>
    </DCSection>

    <DCSection id="domain" title="Domain components" subtitle="The coaching-specific pieces">
      <DCArtboard id="sidenav" label="Sidebar navigation" width={300} height={420}><NavLib /></DCArtboard>
      <DCArtboard id="goal" label="Goal block" width={420} height={300}><GoalsLib /></DCArtboard>
      <DCArtboard id="progress" label="Progress widgets" width={420} height={420}><ProgressLib /></DCArtboard>
      <DCArtboard id="encouragement" label="Encouragement banner" width={420} height={300}><EncouragementLib /></DCArtboard>
      <DCArtboard id="session-summary" label="Session summary" width={520} height={500}><SessionSummary /></DCArtboard>
      <DCArtboard id="history" label="Session history list" width={420} height={480}><HistoryLib /></DCArtboard>
      <DCArtboard id="chat-styles" label="Chat — 3 styles" width={920} height={460}><ChatLib /></DCArtboard>
      <DCArtboard id="resource" label="Resource card" width={340} height={420}><ResourceLib /></DCArtboard>
    </DCSection>
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
