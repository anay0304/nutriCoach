// ============================================================
// NutriCoach — Dashboard screens (returning + first-time)
// ============================================================
/* global React, I, CoachMark, GoalBlock, ProgressRing, StepRow */
const { useState: useStateD } = React;

// ---- Returning user dashboard -----------------------------
const DashboardReturning = ({ layout, onStartSession, onOpenCoaching, onOpenResources }) => {
  const d = window.NC_DATA;
  const [steps, setSteps] = useStateD(d.lastSession.actionSteps);
  const toggle = (id) => setSteps(s => s.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const completedSteps = steps.filter(s => s.done).length;

  // -------- Layout: hero (default) --------
  if (layout === "hero" || !layout) {
    return (
      <div className="page" data-screen-label="03 Dashboard Returning">
        <div className="page-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Good evening · Thursday</div>
            <h1>Welcome back, Mira.</h1>
            <div className="sub">A quiet check-in is enough today. We don't need a perfect week.</div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onStartSession}>
            Start a check-in <I.arrowRight size={16}/>
          </button>
        </div>

        {/* Hero strip */}
        <div className="dash-hero" style={{ marginBottom: 20 }}>
          <div className="ornament" aria-hidden="true"></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 36, position: "relative", zIndex: 1 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Where you are</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.015em", marginBottom: 14, maxWidth: 360 }}>
                You've had {d.lastSession.sessionNumber} sessions and three goals you're keeping warm.
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(247,239,219,0.7)", lineHeight: 1.55, maxWidth: 340 }}>
                Most of the change is happening in the small choices between sessions. Notice them.
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Sessions</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 56, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {d.lastSession.sessionNumber}
              </div>
              <div style={{ fontSize: 12.5, color: "rgba(247,239,219,0.7)", marginTop: 8 }}>
                completed since April 28
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>This week's check-ins</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 56 }}>
                {["M","T","W","T","F","S","S"].map((l, i) => {
                  const on = d.weekStreak[i];
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: "100%",
                        height: on ? "100%" : "30%",
                        background: on ? "var(--sage)" : "rgba(247,239,219,0.12)",
                        borderRadius: 4,
                      }}></div>
                      <span style={{ fontSize: 10.5, fontFamily: "var(--mono)", color: "rgba(247,239,219,0.55)" }}>{l}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column main */}
        <div className="grid grid-12" style={{ gap: 18 }}>
          {/* Left column: next steps + last session */}
          <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: 18 }}>
            <NextStepsCard
              session={d.lastSession}
              steps={steps}
              completedSteps={completedSteps}
              onToggle={toggle}
            />
            <LastSessionCard session={d.lastSession} onOpenCoaching={onOpenCoaching} />
          </div>

          {/* Right column: goals + encouragement */}
          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="card card-pad">
              <div className="row between" style={{ marginBottom: 14, gap: 10 }}>
                <h3 style={{ whiteSpace: "nowrap" }}>Your goals</h3>
                <button className="btn btn-subtle btn-sm">Review</button>
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 6 }}>
                Three things we're keeping warm together — set in your initial session.
              </p>
              <div className="hairline" style={{ margin: "16px -24px" }}></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {d.goals.map(g => (
                  <CompactGoal key={g.id} goal={g} />
                ))}
              </div>
            </div>

            <div className="encouragement">
              <div className="encouragement-mark">
                <I.leaf size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>You've been consistent for 12 days.</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>
                  Not perfect — but present. That's what builds the habit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------- Layout: focus (single column, calmer) --------
  if (layout === "focus") {
    return (
      <div className="page" data-screen-label="03 Dashboard Returning · Focus" style={{ maxWidth: 820 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Good evening · Thursday</div>
          <h1 style={{ fontSize: 38 }}>One thing at a time, Mira.</h1>
          <div className="sub" style={{ marginTop: 8 }}>
            The most important thing today is just to notice. We can talk later.
          </div>
        </div>

        <div className="card card-pad-lg" style={{ marginBottom: 18 }}>
          <div className="row between" style={{ marginBottom: 18 }}>
            <div className="eyebrow">Your next step</div>
            <span className="tag tag-sage tag-dot">From session {d.lastSession.sessionNumber}</span>
          </div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, marginBottom: 12 }}>
            Walk 10 minutes after lunch — even just down the block.
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 14.5, lineHeight: 1.55, marginBottom: 22 }}>
            You picked this in your last session because afternoons have been the hardest part of travel weeks. It's small on purpose.
          </p>
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-primary">I did it today <I.check size={14}/></button>
            <button className="btn btn-ghost">Not today — note why</button>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: 16, marginBottom: 18 }}>
          <div className="card card-pad">
            <div className="eyebrow" style={{ marginBottom: 12 }}>This week</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8 }}>
              5 / 7
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>days you checked in with yourself</div>
            <div className="streak" style={{ marginTop: 14 }}>
              {d.weekStreak.map((on, i) => (
                <span key={i} className={`day ${on ? "on" : ""} ${d.todayIndex === i ? "today" : ""}`}></span>
              ))}
            </div>
          </div>
          <div className="card card-pad">
            <div className="eyebrow" style={{ marginBottom: 12 }}>Goals you're keeping warm</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {d.goals.map(g => (
                <div key={g.id} className="row between">
                  <span style={{ fontSize: 13.5, fontFamily: "var(--serif)", letterSpacing: "-0.005em" }}>{g.title}</span>
                  <ProgressRing value={g.progress} size={28} stroke={3}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn btn-secondary btn-lg" onClick={onStartSession} style={{ width: "100%", height: 54 }}>
          Start a check-in with your coach <I.arrowRight size={16}/>
        </button>
      </div>
    );
  }

  // -------- Layout: split (sidebar-style summary + chat preview) --------
  return (
    <div className="page" data-screen-label="03 Dashboard Returning · Split">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Thursday · Day {d.user.joinedDays}</div>
          <h1>Hello, Mira.</h1>
          <div className="sub">Pick up where you left off, or start fresh.</div>
        </div>
      </div>

      <div className="grid grid-12" style={{ gap: 20 }}>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card card-pad" style={{ background: "var(--surface-2)" }}>
            <div className="row" style={{ gap: 16, alignItems: "center", marginBottom: 18 }}>
              <CoachMark size="lg" />
              <div>
                <div className="eyebrow">Your coach</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 21, letterSpacing: "-0.01em" }}>Ready when you are</div>
              </div>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-2)", fontFamily: "var(--serif)", marginBottom: 18 }}>
              "We talked about travel weeks last time. How did the rest of the week land — was lunch any easier?"
            </p>
            <div className="row" style={{ gap: 10 }}>
              <button className="btn btn-primary" onClick={onStartSession}>Continue <I.arrowRight size={14}/></button>
              <button className="btn btn-ghost" onClick={onOpenCoaching}>See history</button>
            </div>
          </div>

          <StatsRowCard d={d} />
        </div>

        <div style={{ gridColumn: "span 7", display: "flex", flexDirection: "column", gap: 18 }}>
          <NextStepsCard
            session={d.lastSession}
            steps={steps}
            completedSteps={completedSteps}
            onToggle={toggle}
          />
          <div className="card card-pad">
            <div className="row between" style={{ marginBottom: 14 }}>
              <h3>Goals</h3>
              <span className="eyebrow">From your initial session</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {d.goals.map(g => <CompactGoal key={g.id} goal={g} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Compact goal row (used in sidebars) ------------------
const CompactGoal = ({ goal }) => (
  <div className="row" style={{ gap: 12 }}>
    <ProgressRing value={goal.progress} size={36} stroke={3.5} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13.5, fontFamily: "var(--serif)", letterSpacing: "-0.005em", lineHeight: 1.3 }}>{goal.title}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 3 }}>{goal.cadence} · {Math.round(goal.progress * 100)}%</div>
    </div>
  </div>
);

// ---- "Your next steps" card -------------------------------
const NextStepsCard = ({ session, steps, completedSteps, onToggle }) => (
  <div className="card card-pad">
      <div className="row between" style={{ marginBottom: 18 }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>From session {session.sessionNumber}</div>
          <h3 style={{ whiteSpace: "nowrap" }}>Your next steps</h3>
        </div>
        <div className="row" style={{ gap: 12, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-3)" }}>
            {completedSteps} of {steps.length} done
          </span>
          <button className="btn btn-subtle btn-sm">Add step <I.plus size={12}/></button>
        </div>
      </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {steps.map(s => <StepRow key={s.id} step={s} onToggle={() => onToggle(s.id)} />)}
    </div>
  </div>
);

// ---- Last session summary card ----------------------------
const LastSessionCard = ({ session, onOpenCoaching }) => (
  <div className="card card-pad">
    <div className="row between" style={{ marginBottom: 16, alignItems: "flex-start", gap: 16 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Most recent session</div>
        <h3>{session.title}</h3>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>{session.when} · {session.durationMin} minutes</div>
      </div>
      <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }} onClick={onOpenCoaching}>Open transcript <I.arrowRight size={12}/></button>
    </div>
    <p style={{ fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 22 }}>
      {session.summary}
    </p>

    <div className="grid grid-2" style={{ gap: 16 }}>
      <div>
        <div className="row" style={{ gap: 8, marginBottom: 10 }}>
          <I.clock size={14} style={{ color: "var(--ink-3)" }}/>
          <span className="eyebrow">Struggles</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {session.struggles.map((s, i) => (
            <li key={i} style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, paddingLeft: 14, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 1, background: "var(--ink-4)" }}></span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="row" style={{ gap: 8, marginBottom: 10 }}>
          <I.refresh size={14} style={{ color: "var(--ink-3)" }}/>
          <span className="eyebrow">Backup plans</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {session.backupPlans.map((s, i) => (
            <li key={i} style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, paddingLeft: 14, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 1, background: "var(--sage)" }}></span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ---- Quick stats row card ---------------------------------
const StatsRowCard = ({ d }) => (
  <div className="card card-pad">
    <div className="eyebrow" style={{ marginBottom: 16 }}>Since you started</div>
    <div className="grid grid-3" style={{ gap: 14 }}>
      <Stat label="Sessions" value={d.lastSession.sessionNumber} />
      <Stat label="Action steps kept" value="23" />
      <Stat label="Days since intake" value={d.user.joinedDays} />
    </div>
  </div>
);
const Stat = ({ label, value }) => (
  <div>
    <div style={{ fontFamily: "var(--serif)", fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 6, letterSpacing: "0.02em" }}>{label}</div>
  </div>
);

// ---- First-time dashboard ---------------------------------
const DashboardFirstTime = ({ onStartIntake }) => {
  const d = window.NC_DATA;
  return (
    <div className="page" data-screen-label="02 Dashboard First-Time" style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Welcome to NutriCoach</div>
        <h1 style={{ fontSize: 40 }}>Let's start with a conversation.</h1>
        <div className="sub" style={{ marginTop: 10, fontSize: 17 }}>
          No quizzes, no logging. Just 30 minutes with your coach to understand where you are.
        </div>
      </div>

      <div className="card card-pad-lg" style={{ marginBottom: 18, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", right: -60, top: -60,
          width: 280, height: 280, borderRadius: "50%",
          border: "1px solid var(--hairline)",
          opacity: 0.5,
          pointerEvents: "none",
        }}>
          <div style={{ position: "absolute", inset: 40, borderRadius: "50%", border: "1px solid var(--hairline)" }}>
            <div style={{ position: "absolute", inset: 60, borderRadius: "50%", background: "var(--amber-soft)" }}></div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <span className="tag tag-amber" style={{ marginBottom: 18 }}>
            <span className="dot" style={{ background: "var(--amber)" }}></span>
            Your first step
          </span>
          <h2 style={{ fontSize: 32, marginBottom: 14, marginTop: 14 }}>
            Your initial coaching session
          </h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 26 }}>
            Together we'll talk about what's been hard, what you've already tried, and what "eating well" actually looks like for your life — not someone else's.
          </p>

          <div className="row" style={{ gap: 32, marginBottom: 30, fontSize: 13, color: "var(--ink-3)" }}>
            <div className="row" style={{ gap: 8 }}><I.clock size={14}/> ~30 minutes</div>
            <div className="row" style={{ gap: 8 }}><I.chat size={14}/> Text-based chat</div>
            <div className="row" style={{ gap: 8 }}><I.leaf size={14}/> Private to you</div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={onStartIntake}>
            Begin initial session <I.arrowRight size={16}/>
          </button>
        </div>
      </div>

      <div className="grid grid-3" style={{ gap: 16 }}>
        <StepIntroCard
          step="1"
          title="A real conversation"
          body="Your coach will ask questions, listen, and reflect — not lecture. You set the pace."
        />
        <StepIntroCard
          step="2"
          title="Three goals you choose"
          body="By the end, you'll have a small handful of things to keep warm. Specific to your life."
        />
        <StepIntroCard
          step="3"
          title="Check in when it helps"
          body="Quick check-ins, longer sessions when you want to dig in. Whatever feels supportive."
        />
      </div>

      <div className="encouragement" style={{ marginTop: 28 }}>
        <div className="encouragement-mark"><I.leaf size={18}/></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>This isn't a fitness tracker.</div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
            No streaks to defend, no macros to log. Just a conversation that helps you notice what you already know.
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIntroCard = ({ step, title, body }) => (
  <div className="card card-pad">
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: "var(--surface-2)", color: "var(--ink-3)",
      fontFamily: "var(--mono)", fontSize: 11.5,
      display: "grid", placeItems: "center",
      marginBottom: 14, border: "1px solid var(--hairline)",
    }}>{step}</div>
    <h4 style={{ marginBottom: 8 }}>{title}</h4>
    <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>{body}</p>
  </div>
);

Object.assign(window, { DashboardReturning, DashboardFirstTime });
