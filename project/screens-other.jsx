// ============================================================
// NutriCoach — Landing, Sign-up, Resources, Initial Session
// ============================================================
/* global React, I, BrandMark, CoachMark */
const { useState: useStateO, useEffect: useEffectO } = React;

// ============================================================
// LANDING + AUTH
// ============================================================
const Landing = ({ onSignUp, onSignIn }) => (
  <div className="landing" data-screen-label="01 Landing">
    <div className="landing-nav">
      <div className="row" style={{ gap: 10, alignItems: "center" }}>
        <span style={{ color: "var(--amber)" }}><BrandMark size={26}/></span>
        <span className="brand-name">NutriCoach</span>
      </div>
      <div className="row" style={{ gap: 10 }}>
        <a className="nav-item" style={{ width: "auto", padding: "0 12px" }}>How it works</a>
        <a className="nav-item" style={{ width: "auto", padding: "0 12px" }}>For coaches</a>
        <a className="nav-item" style={{ width: "auto", padding: "0 12px" }}>Pricing</a>
        <button className="btn btn-ghost btn-sm" onClick={onSignIn}>Sign in</button>
        <button className="btn btn-primary btn-sm" onClick={onSignUp}>Start coaching</button>
      </div>
    </div>

    <div className="landing-hero">
      <div>
        <span className="tag" style={{ marginBottom: 22 }}>
          <span className="dot" style={{ background: "var(--sage)" }}></span>
          Personalized nutrition coaching
        </span>

        <h1 className="landing-headline">
          A quieter way<br/>
          to change <em>how you eat.</em>
        </h1>

        <p className="landing-sub">
          NutriCoach is a conversation, not a tracker. Your AI coach listens, asks better questions, and helps you build sustainable habits — one small choice at a time.
        </p>

        <div className="landing-cta-row">
          <button className="btn btn-primary btn-lg" onClick={onSignUp}>
            Begin your first session <I.arrowRight size={16}/>
          </button>
          <button className="btn btn-ghost btn-lg">Watch a 90-second tour</button>
        </div>

        <div className="row" style={{ gap: 24, marginTop: 36, fontSize: 13, color: "var(--ink-3)" }}>
          <div className="row" style={{ gap: 8 }}><I.leaf size={14}/> No tracking. No macros.</div>
          <div className="row" style={{ gap: 8 }}><I.check size={14}/> Private &amp; secure</div>
          <div className="row" style={{ gap: 8 }}><I.clock size={14}/> 5 min · cancel anytime</div>
        </div>
      </div>

      {/* Side card — abstract coach moment */}
      <div className="landing-side">
        <div>
          <div className="row" style={{ gap: 14, marginBottom: 22 }}>
            <CoachMark size="lg"/>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(247,239,219,0.55)" }}>Your coach · just now</div>
              <div style={{ fontSize: 13.5, color: "#efe7d4", marginTop: 4 }}>Ready when you are</div>
            </div>
          </div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.4, color: "#f7efdb", letterSpacing: "-0.01em" }}>
            "Tell me about the last meal that felt easy — not because it was healthy, but because you actually enjoyed it."
          </p>
        </div>

        <div>
          <div style={{ height: 1, background: "rgba(247,239,219,0.12)", margin: "24px 0 18px" }}></div>
          <div className="row between" style={{ fontSize: 12, color: "rgba(247,239,219,0.6)" }}>
            <span>Session 1 of many · Initial conversation</span>
            <span>30 min</span>
          </div>
          <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: "var(--r-md)", background: "rgba(247,239,219,0.06)", border: "1px solid rgba(247,239,219,0.08)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(247,239,219,0.5)", marginBottom: 6, textTransform: "uppercase" }}>What we'll cover</div>
            <div style={{ fontSize: 13, color: "#efe7d4", lineHeight: 1.55 }}>
              Your history with food · what you've already tried · what "eating well" means for your life · three goals to keep warm.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="landing-feature-row">
      <FeatureItem icon={<I.chat size={18}/>} title="A real conversation" body="Not a quiz. Your coach asks, listens, reflects — and helps you see what you already know." />
      <FeatureItem icon={<I.target size={18}/>} title="Three small goals" body="Specific to your life — the work happens between sessions, in tiny choices." />
      <FeatureItem icon={<I.refresh size={18}/>} title="Backup plans" body="For the day you're depleted. Pre-decided, gentle, low-effort defaults." />
      <FeatureItem icon={<I.leaf size={18}/>} title="Behavior-change first" body="Grounded in psychology. Built for sustainable change, not before-and-after photos." />
    </div>
  </div>
);

const FeatureItem = ({ icon, title, body }) => (
  <div className="feature-item">
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: "var(--surface)", border: "1px solid var(--hairline)",
      display: "grid", placeItems: "center",
      color: "var(--amber)",
      marginBottom: 16,
    }}>{icon}</div>
    <h4>{title}</h4>
    <p>{body}</p>
  </div>
);

// ---- Sign-up modal ----------------------------------------
const SignUpModal = ({ mode = "signup", onClose, onSuccess }) => {
  const [step, setStep] = useStateO(1);
  const [name, setName] = useStateO("");
  const [email, setEmail] = useStateO("");

  const submit = (e) => {
    e?.preventDefault();
    if (step === 1) { setStep(2); return; }
    onSuccess();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ padding: "36px 40px 30px" }}>
          <div className="row between" style={{ marginBottom: 24 }}>
            <span style={{ color: "var(--amber)" }}><BrandMark /></span>
            <button className="btn btn-subtle btn-sm" onClick={onClose} style={{ width: 32, padding: 0 }}>×</button>
          </div>

          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {mode === "signup" ? "Begin coaching" : "Welcome back"} · step {step} of 2
          </div>
          <h2 style={{ marginBottom: 8 }}>
            {step === 1
              ? (mode === "signup" ? "What should we call you?" : "Sign in to NutriCoach")
              : "And where can we reach you?"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 26, lineHeight: 1.55 }}>
            {step === 1
              ? "We use your first name in conversation. You can change it later."
              : "We'll send a magic link — no passwords to remember."}
          </p>

          <form onSubmit={submit}>
            {step === 1 ? (
              <div>
                <label className="field-label">First name</label>
                <input className="input" placeholder="Mira" value={name} onChange={e => setName(e.target.value)} autoFocus />
              </div>
            ) : (
              <div>
                <label className="field-label">Email address</label>
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
              </div>
            )}

            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 22 }} type="submit">
              {step === 1 ? "Continue" : (mode === "signup" ? "Begin coaching" : "Send magic link")}
              <I.arrowRight size={15}/>
            </button>
          </form>

          {step === 1 && (
            <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--hairline)", fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
              {mode === "signup" ? "Already coaching with us?" : "New here?"}{" "}
              <a style={{ color: "var(--ink)", textDecoration: "underline", cursor: "pointer" }}>
                {mode === "signup" ? "Sign in" : "Begin coaching"}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// RESOURCES
// ============================================================
const Resources = () => {
  const d = window.NC_DATA;
  const [tag, setTag] = useStateO("All");
  const tags = ["All", "Behavior change", "Meals", "Mornings", "Sleep", "Travel", "Mindset", "Resilience"];
  const filtered = tag === "All" ? d.resources : d.resources.filter(r => r.tag === tag);

  return (
    <div className="page" data-screen-label="06 Resources">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Library</div>
          <h1>Resources</h1>
          <div className="sub">Short reads, worksheets, and audio to keep nearby. Designed to be useful in five minutes.</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-ghost"><I.search size={14}/> Search</button>
          <button className="btn btn-subtle">My saved (3)</button>
        </div>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
        {tags.map(t => (
          <button
            key={t}
            className="chip"
            style={t === tag ? { background: "var(--ink)", color: "var(--surface)", borderColor: "var(--ink)" } : {}}
            onClick={() => setTag(t)}
          >{t}</button>
        ))}
      </div>

      {/* Featured */}
      {tag === "All" && (
        <div className="card-dark" style={{ padding: "32px 36px", marginBottom: 22, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 220, height: 220, border: "1px solid rgba(247,239,219,0.08)", borderRadius: "50%" }}>
            <div style={{ position: "absolute", inset: 30, border: "1px solid rgba(247,239,219,0.1)", borderRadius: "50%" }}></div>
          </div>
          <div style={{ position: "relative", maxWidth: 540 }}>
            <span className="tag tag-amber" style={{ marginBottom: 16 }}>Featured this week</span>
            <h2 style={{ fontSize: 28, color: "#f7efdb", marginTop: 14, marginBottom: 10 }}>A gentler approach to evening eating</h2>
            <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "rgba(247,239,219,0.78)", lineHeight: 1.55, marginBottom: 22 }}>
              Why willpower fails at 9pm — and what to try instead. A short read on the behavior-change principles behind your evening defaults.
            </p>
            <div className="row" style={{ gap: 10 }}>
              <button className="btn btn-primary"><I.download size={14}/> Download PDF</button>
              <button className="btn btn-ghost" style={{ color: "#efe7d4", borderColor: "rgba(247,239,219,0.2)" }}>Read in app</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-3" style={{ gap: 18 }}>
        {filtered.map(r => <ResourceCard key={r.id} r={r}/>)}
      </div>

      <div className="card" style={{ marginTop: 28, padding: 22, textAlign: "center", borderStyle: "dashed", background: "transparent" }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Coming soon</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--ink-2)" }}>
          Audio meditations for the post-meal pause, a printable weekly reset, and more.
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ r }) => {
  const kindIcon = r.kind === "Audio" ? <I.mic size={16}/> : r.kind === "Worksheet" ? <I.notes size={16}/> : <I.fileText size={16}/>;
  return (
    <div className="resource-card">
      <div className="resource-thumb">
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(115deg, transparent 0 16px, rgba(31,42,61,0.04) 16px 17px)",
        }}></div>
        <div style={{
          position: "relative",
          width: 56, height: 56, borderRadius: 14,
          background: "var(--surface)", border: "1px solid var(--hairline)",
          display: "grid", placeItems: "center",
          color: "var(--amber)",
        }}>
          {kindIcon}
        </div>
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="tag">{r.kind}</span>
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 14, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
          {r.time}
        </div>
      </div>
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{r.tag}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.005em", marginBottom: 6 }}>
          {r.title}
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>{r.desc}</p>
      </div>
      <div className="row between" style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid var(--hairline)" }}>
        <span style={{ fontSize: 12, color: "var(--ink-4)", fontFamily: "var(--mono)" }}>{r.pages ? `${r.pages} pp` : "Audio"}</span>
        <button className="btn btn-subtle btn-sm"><I.download size={12}/> Get</button>
      </div>
    </div>
  );
};

// ============================================================
// INITIAL COACHING SESSION FLOW
// ============================================================
const InitialSession = ({ onBack, onComplete }) => {
  const totalSteps = 5;
  const [step, setStep] = useStateO(1);

  const advance = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete();
  };

  return (
    <div data-screen-label="05 Initial Session" style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Header strip */}
      <div style={{ padding: "20px 40px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", gap: 18 }}>
        <button className="btn btn-subtle btn-sm" onClick={onBack}>← Exit (saves progress)</button>
        <div style={{ flex: 1 }}>
          <div className="eyebrow">Initial coaching session</div>
          <div className="row" style={{ gap: 10, marginTop: 6, alignItems: "center" }}>
            <div className="progress-bar" style={{ flex: 1, maxWidth: 320 }}>
              <div style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-3)" }}>Step {step} of {totalSteps}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm">Save &amp; come back</button>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 380px", gap: 0 }}>
        {/* Main panel */}
        <div style={{ padding: "56px 60px", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          {step === 1 && <IntakeStep1 />}
          {step === 2 && <IntakeStep2 />}
          {step === 3 && <IntakeStep3 />}
          {step === 4 && <IntakeStep4 />}
          {step === 5 && <IntakeStep5 />}

          <div className="row between" style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid var(--hairline)" }}>
            <button className="btn btn-ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} style={{ opacity: step === 1 ? 0.4 : 1 }}>
              ← Back
            </button>
            <div className="row" style={{ gap: 10 }}>
              <button className="btn btn-subtle">Skip for now</button>
              <button className="btn btn-primary" onClick={advance}>
                {step < totalSteps ? "Continue" : "Set my goals"} <I.arrowRight size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* Side panel — coach context */}
        <div style={{ borderLeft: "1px solid var(--hairline)", padding: "32px", background: "var(--surface-2)", display: "flex", flexDirection: "column", gap: 22 }}>
          <div className="row" style={{ gap: 12, alignItems: "center" }}>
            <CoachMark size="lg"/>
            <div>
              <div className="eyebrow">Your coach</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 17, marginTop: 2 }}>Walking through this together</div>
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px", background: "var(--surface)" }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Why I'm asking</div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
              {[
                "Before any plan, I want to understand the shape of your days. There's no wrong answer — I'm just trying to see what you see.",
                "Knowing what's already worked tells us more than what hasn't. We build on real things.",
                "Most plans break here. Naming the friction is the first step to designing around it.",
                "Your 'why' isn't a slogan — it's the sentence you'd whisper to yourself at 9pm. Take your time.",
                "Three goals is plenty. We can always add more, but momentum starts small.",
              ][step - 1]}
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>What we'll do in this session</div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                "Where you are right now",
                "What's already worked",
                "Where it's been hard",
                "Your why, in your words",
                "Three goals to keep warm",
              ].map((label, i) => (
                <li key={i} className="row" style={{
                  gap: 10, fontSize: 13.5,
                  color: i + 1 === step ? "var(--ink)" : i + 1 < step ? "var(--ink-3)" : "var(--ink-4)",
                  padding: "8px 0", borderBottom: i < 4 ? "1px solid var(--hairline)" : 0,
                  fontWeight: i + 1 === step ? 500 : 400,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: i + 1 < step ? "var(--sage)" : i + 1 === step ? "var(--ink)" : "var(--surface)",
                    color: i + 1 <= step ? "#fff" : "var(--ink-3)",
                    border: i + 1 > step ? "1px solid var(--hairline-strong)" : 0,
                    fontFamily: "var(--mono)", fontSize: 10,
                    display: "grid", placeItems: "center",
                  }}>
                    {i + 1 < step ? <I.check size={10} stroke={3}/> : i + 1}
                  </span>
                  {label}
                </li>
              ))}
            </ol>
          </div>

          <div style={{ marginTop: "auto", fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>
            <I.leaf size={13} style={{ marginRight: 6, color: "var(--sage)" }}/>
            Your answers stay private. Only you and your coach see them.
          </div>
        </div>
      </div>
    </div>
  );
};

const Question = ({ eyebrow, title, sub, children }) => (
  <div>
    <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
    <h2 style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 14, letterSpacing: "-0.02em" }}>{title}</h2>
    {sub && <p style={{ fontSize: 15, color: "var(--ink-3)", marginBottom: 28, lineHeight: 1.55, maxWidth: 540 }}>{sub}</p>}
    {children}
  </div>
);

const IntakeStep1 = () => (
  <Question
    eyebrow="Step 1 · Where you are"
    title="What does a typical eating day look like for you right now?"
    sub="Not what you wish it looked like — what it actually is, on a regular Tuesday. Don't edit yourself."
  >
    <textarea
      className="input"
      style={{ height: 180, padding: 16, resize: "vertical", lineHeight: 1.55 }}
      placeholder="Coffee on the way out, sometimes skip lunch, snack heavily around 4, dinner late…"
    ></textarea>
    <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: "wrap" }}>
      <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Some prompts:</span>
      <button className="chip">My mornings</button>
      <button className="chip">Lunch</button>
      <button className="chip">The 3-5pm window</button>
      <button className="chip">Evenings</button>
      <button className="chip">Weekends differ</button>
    </div>
  </Question>
);

const IntakeStep2 = () => (
  <Question
    eyebrow="Step 2 · What's working"
    title="What's something around eating that's gone well lately?"
    sub="Even something tiny. A meal that felt easy, a habit that's stuck, a small win you noticed."
  >
    <textarea
      className="input"
      style={{ height: 140, padding: 16, resize: "vertical", lineHeight: 1.55 }}
      placeholder="I've been drinking water before coffee most mornings…"
    ></textarea>
    <div className="card card-pad" style={{ marginTop: 22, background: "var(--surface-2)" }}>
      <div className="row" style={{ gap: 12, alignItems: "flex-start" }}>
        <I.sparkle size={18} style={{ color: "var(--amber)", marginTop: 2 }}/>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Why this matters</div>
          <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>
            We tend to overlook what's already working. Naming it gives us a foundation to build on — instead of starting from scratch.
          </p>
        </div>
      </div>
    </div>
  </Question>
);

const IntakeStep3 = () => (
  <Question
    eyebrow="Step 3 · Where it's hard"
    title="Where does the day usually get harder?"
    sub="Pick the moments that come up most. We're naming friction, not assigning blame."
  >
    <div className="grid grid-2" style={{ gap: 10 }}>
      {[
        { label: "Mornings — I'm rushed", icon: <I.clock size={14}/> },
        { label: "Lunch — I skip or graze", icon: <I.cup size={14}/> },
        { label: "Afternoon energy crash", icon: <I.flame size={14}/> },
        { label: "Evening grazing", icon: <I.moon size={14}/> },
        { label: "Travel weeks", icon: <I.target size={14}/> },
        { label: "Stress eating", icon: <I.flame size={14}/> },
        { label: "Weekends spiral", icon: <I.calendar size={14}/> },
        { label: "Cooking feels like a project", icon: <I.book size={14}/> },
      ].map((opt, i) => (
        <label key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 16px",
          background: "var(--surface)",
          border: "1px solid var(--hairline)",
          borderRadius: "var(--r-md)",
          cursor: "pointer",
          transition: "all .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--hairline-strong)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--hairline)"}
        >
          <input type="checkbox" style={{ accentColor: "var(--amber)" }}/>
          <span style={{ color: "var(--ink-3)" }}>{opt.icon}</span>
          <span style={{ fontSize: 14 }}>{opt.label}</span>
        </label>
      ))}
    </div>
  </Question>
);

const IntakeStep4 = () => (
  <Question
    eyebrow="Step 4 · Your why"
    title="If this works, what does it free you to do?"
    sub="Not 'lose weight' — what's behind that? What would be different about how you live, who you are with the people in your life?"
  >
    <textarea
      className="input"
      style={{ height: 160, padding: 16, resize: "vertical", lineHeight: 1.6, fontFamily: "var(--serif)", fontSize: 16 }}
      placeholder="I want to have more energy in the evenings to actually be present with my kids — not collapsed on the couch…"
    ></textarea>
  </Question>
);

const IntakeStep5 = () => (
  <Question
    eyebrow="Step 5 · Three goals"
    title="Based on what we've talked about, here are three goals to keep warm."
    sub="You can edit any of these. We'll revisit them in every session — they're meant to evolve."
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {window.NC_DATA.goals.map((g, i) => (
        <div key={g.id} className="card card-pad" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--amber-soft)", color: "var(--amber-ink)",
            fontFamily: "var(--serif)", fontSize: 16,
            display: "grid", placeItems: "center",
            flexShrink: 0,
          }}>{i + 1}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>{g.cadence}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, letterSpacing: "-0.005em", marginBottom: 6 }}>{g.title}</div>
            <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.55 }}>{g.detail}</p>
          </div>
          <button className="btn btn-subtle btn-sm">Edit</button>
        </div>
      ))}
    </div>
    <div className="encouragement" style={{ marginTop: 24 }}>
      <div className="encouragement-mark"><I.leaf size={18}/></div>
      <div>
        <div style={{ fontWeight: 500, fontSize: 14 }}>That's plenty for now.</div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
          Three small commitments, not a plan. We'll check in soon to see how they feel.
        </div>
      </div>
    </div>
  </Question>
);

// ---- Sign out modal ---------------------------------------
const SignOutModal = ({ onCancel, onConfirm }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal" onClick={e => e.stopPropagation()} style={{ width: 420 }}>
      <div style={{ padding: "32px 36px" }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Signing out</div>
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>See you when you're ready.</h2>
        <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, marginBottom: 24 }}>
          Your conversation is saved. Your coach will be here, exactly where you left off.
        </p>
        <div className="row" style={{ gap: 10, justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={onCancel}>Stay</button>
          <button className="btn btn-secondary" onClick={onConfirm}>Sign out</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { Landing, SignUpModal, Resources, InitialSession, SignOutModal });
