// ============================================================
// NutriCoach — Coaching screen: sessions list + chat
// ============================================================
/* global React, I, CoachMark */
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

const Coaching = ({ chatStyle, onStartNewSession }) => {
  const d = window.NC_DATA;
  const [activeId, setActiveId] = useStateC(d.sessions[0].id);
  const [conversation, setConversation] = useStateC(d.conversation);
  const [draft, setDraft] = useStateC("");
  const [filter, setFilter] = useStateC("all");
  const streamRef = useRefC(null);

  useEffectC(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [conversation.length]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft("");
    setConversation(c => [...c, { role: "user", text }]);
    setTimeout(() => {
      setConversation(c => [...c, {
        role: "coach",
        text: "That's a useful thing to notice. What do you think made that the easier choice in the moment — was it preparation, or was something else softer about the day?"
      }]);
    }, 800);
  };

  const filtered = filter === "all" ? d.sessions : d.sessions.filter(s => s.type === filter);
  const active = d.sessions.find(s => s.id === activeId) || d.sessions[0];

  return (
    <div data-screen-label="04 Coaching" style={{ display: "grid", gridTemplateColumns: "320px 1fr 340px", height: "calc(100vh - 64px)", minHeight: 0 }}>
      {/* ============ Sessions list ============ */}
      <div style={{ borderRight: "1px solid var(--hairline)", display: "flex", flexDirection: "column", minHeight: 0, background: "var(--bg)" }}>
        <div style={{ padding: "22px 22px 14px" }}>
          <div className="row between" style={{ marginBottom: 14 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 22 }}>Sessions</h3>
            <button className="btn btn-subtle btn-sm" title="Filter"><I.filter size={13}/></button>
          </div>
          <div className="segmented" style={{ width: "100%", justifyContent: "space-between" }}>
            {[
              { id: "all", label: "All" },
              { id: "session", label: "Sessions" },
              { id: "check-in", label: "Check-ins" },
            ].map(t => (
              <button key={t.id} className={filter === t.id ? "active" : ""} onClick={() => setFilter(t.id)} style={{ flex: 1 }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "0 14px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={onStartNewSession}>
            <I.plus size={14}/> New session
          </button>
          <button className="btn btn-ghost" style={{ width: "100%" }}>
            <I.clock size={14}/> Quick check-in
          </button>
        </div>

        <div style={{ padding: "10px 14px", flex: 1, overflowY: "auto", minHeight: 0 }}>
          {filtered.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`session-row ${activeId === s.id ? "active" : ""}`}
              style={{
                width: "100%", textAlign: "left",
                padding: "12px 14px",
                borderRadius: "var(--r-md)",
                marginBottom: 4,
                background: activeId === s.id ? "var(--surface)" : "transparent",
                border: activeId === s.id ? "1px solid var(--hairline)" : "1px solid transparent",
                display: "flex", flexDirection: "column", gap: 5,
                transition: "background .12s",
              }}
              onMouseEnter={e => { if (activeId !== s.id) e.currentTarget.style.background = "var(--surface-2)"; }}
              onMouseLeave={e => { if (activeId !== s.id) e.currentTarget.style.background = "transparent"; }}
            >
              <div className="row between" style={{ alignItems: "center" }}>
                <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", letterSpacing: "0.04em" }}>{s.date}</span>
                <SessionTypeTag type={s.type} />
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 15.5, lineHeight: 1.3, letterSpacing: "-0.005em", color: "var(--ink)" }}>
                {s.title}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.45, marginTop: 2 }}>
                {s.preview}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ============ Chat ============ */}
      <div className={`chat-wrap chat-style-${chatStyle || "bubble"}`} style={{ minHeight: 0, borderRight: "1px solid var(--hairline)" }}>
        <div style={{ padding: "18px 28px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", gap: 14, background: "var(--bg)" }}>
          <CoachMark />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.2 }}>{active.title}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
              {active.date} · {active.duration} min · <span style={{ color: "var(--sage-ink)" }}>● live</span>
            </div>
          </div>
          <button className="btn btn-subtle btn-sm"><I.notes size={13}/> Session notes</button>
          <button className="btn btn-subtle btn-sm"><I.more size={14}/></button>
        </div>

        <div className="chat-stream" ref={streamRef}>
          <SessionMarker text="Started this conversation 4 minutes ago" />

          {conversation.map((m, i) => (
            <div key={i} className={`msg msg-${m.role}`}>
              {m.role === "coach" && <CoachMark size="xs" />}
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          <div className="msg msg-coach">
            <CoachMark size="xs" />
            <div className="bubble" style={{ display: "inline-flex", gap: 4, padding: "16px 18px" }}>
              <TypingDot delay="0s" />
              <TypingDot delay="0.15s" />
              <TypingDot delay="0.3s" />
            </div>
          </div>
        </div>

        <div className="chat-input-bar">
          <div className="chat-suggestions">
            {[
              "I felt depleted on Tuesday",
              "I want to talk about evenings",
              "I had a small win",
              "I'm not sure what to talk about",
            ].map((s, i) => (
              <button key={i} className="chip" onClick={() => setDraft(s)}>{s}</button>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="What's on your mind? Take your time."
            />
            <button className="btn btn-subtle btn-sm" title="Attach"><I.paperclip size={14}/></button>
            <button className="btn btn-subtle btn-sm" title="Voice note"><I.mic size={14}/></button>
            <button className="btn btn-primary btn-sm" onClick={send}>
              <I.send size={13}/>
            </button>
          </div>
          <div className="row between" style={{ fontSize: 11.5, color: "var(--ink-4)" }}>
            <span>Press <span className="kbd">Enter</span> to send · <span className="kbd">Shift+Enter</span> for a new line</span>
            <span>Private · only you and your coach</span>
          </div>
        </div>
      </div>

      {/* ============ Context panel ============ */}
      <div style={{ overflowY: "auto", padding: "22px 24px", background: "var(--bg)", display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Context for this session</div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 19 }}>What we're keeping warm</h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {d.goals.map(g => (
            <div key={g.id} className="card" style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 13.5, fontFamily: "var(--serif)", letterSpacing: "-0.005em", lineHeight: 1.35, marginBottom: 6 }}>{g.title}</div>
              <div className="row between" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
                <span>{g.cadence}</span>
                <span style={{ fontFamily: "var(--mono)" }}>{Math.round(g.progress * 100)}%</span>
              </div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div style={{ width: `${g.progress * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Open action steps</div>
          <div className="card" style={{ padding: "12px 16px" }}>
            {d.lastSession.actionSteps.filter(s => !s.done).map(s => (
              <div key={s.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--hairline)", fontSize: 13, color: "var(--ink-2)", display: "flex", gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)", marginTop: 7, flexShrink: 0 }}></div>
                <span style={{ lineHeight: 1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Backup plans</div>
          <div className="card" style={{ padding: "14px 16px", background: "var(--surface-2)" }}>
            {d.lastSession.backupPlans.map((p, i) => (
              <div key={i} style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, fontFamily: "var(--serif)", marginBottom: i < d.lastSession.backupPlans.length - 1 ? 10 : 0 }}>
                {p}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--hairline)" }}>
          <div className="row between" style={{ fontSize: 12, color: "var(--ink-3)" }}>
            <span>Sessions completed</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>{d.lastSession.sessionNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Session type tag --------------------------------------
const SessionTypeTag = ({ type }) => {
  const map = {
    "intake":   { label: "Intake",    cls: "tag-amber" },
    "session":  { label: "Session",   cls: "tag-ink" },
    "check-in": { label: "Check-in",  cls: "tag-sage" },
  };
  const t = map[type] || { label: type, cls: "" };
  return <span className={`tag ${t.cls}`} style={{ fontSize: 10.5, padding: "2px 8px" }}>{t.label}</span>;
};

// ---- Session marker (date divider in chat) ----------------
const SessionMarker = ({ text }) => (
  <div className="row" style={{ alignSelf: "center", gap: 12, color: "var(--ink-4)", fontSize: 11.5, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "8px 0" }}>
    <span style={{ width: 40, height: 1, background: "var(--hairline)" }}></span>
    <span>{text}</span>
    <span style={{ width: 40, height: 1, background: "var(--hairline)" }}></span>
  </div>
);

// ---- Typing dot animation ---------------------------------
const TypingDot = ({ delay }) => (
  <span style={{
    width: 6, height: 6, borderRadius: "50%", background: "var(--ink-4)",
    animation: "typing 1s infinite ease-in-out",
    animationDelay: delay,
    display: "inline-block",
  }}></span>
);

// inject keyframes
if (!document.getElementById("typing-anim")) {
  const s = document.createElement("style");
  s.id = "typing-anim";
  s.textContent = `
    @keyframes typing { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-3px); opacity: 1; } }
  `;
  document.head.appendChild(s);
}

Object.assign(window, { Coaching });
